import Header from '@/components/Header'
import GradientBg from '@/components/ui/GradientBg'
import { useGetAllEvents } from '@/hooks/useFetchEvents'
import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { months } from '@/utils/MonthData'
import { SkeletonCard } from '@/components/ui/SkeletonEventCard'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function Events() {
  const { data: userEvents, isSuccess } = useGetAllEvents()
  const currentDate = Date.now()

  const upcomingEvents = userEvents?.filter(
    (el) => new Date(el.date) > currentDate
  )
  const recentEvents = userEvents?.filter(
    (el) => new Date(el.date) < currentDate
  )

  return (
    <>
      <Header />
      <div className="relative overflow-hidden">
        <GradientBg />

        <section className="mx-auto mt-4 min-h-[90vh] max-w-screen-2xl px-8 md:px-14 xl:px-20">
          <div className="relative ml-auto pt-20">
            <div className="gap-12">
              <div className="pb-8 md:w-2/3 md:py-12 lg:w-1/2">
                <h1 className="text-4xl font-black dark:text-white">
                  See your scheduled events
                </h1>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-[17px] font-bold dark:text-gray-300 md:text-xl">
                    Upcoming Events
                  </p>
                </div>

                {isSuccess && upcomingEvents.length > 0 ? (
                  <div className="overflow flex flex-col gap-2 lg:flex-row">
                    {upcomingEvents.map((events) => {
                      let formattedDate = new Date(events.date)

                      return (
                        <motion.div
                          key={events.id}
                          whileHover={{ scale: 1.025 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-auto md:w-80"
                        >
                          <Link to={`/events-detail/${events.id}`}>
                            <Suspense fallback={<SkeletonCard />}>
                              <Card>
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSZHgjV8ckMtH2AEwV7Q63QFOFZoVDKDy24MVx_9NVPA&s"
                                  alt="Example Image"
                                />
                                <CardContent className="flex items-center gap-2 pt-4">
                                  <div className="flex flex-col items-center justify-center rounded-sm border px-4 py-2">
                                    <p className="-mb-1 text-sm">
                                      {months[formattedDate.getMonth()].slice(
                                        0,
                                        3
                                      )}
                                    </p>
                                    <p className="mb-0 text-xl font-black">
                                      {formattedDate.getDay()}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-[17px] font-bold dark:text-gray-300">
                                      {events.title}
                                    </p>
                                    <small>
                                      {events.desc.slice(0, 20)} ...
                                    </small>
                                  </div>
                                </CardContent>
                              </Card>
                            </Suspense>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="grid place-content-center">
                    No upcoming events
                  </p>
                )}
              </div>
              <div className="ml-auto flex flex-col gap-4 pt-20">
                <p className="text-[17px] font-bold dark:text-gray-300 md:text-xl">
                  Recent Events
                </p>

                <div className="overflow flex flex-col gap-2 rounded-xl lg:flex-row">
                  <Table>
                    <TableHeader className="bg-primary">
                      <TableRow>
                        <TableHead className="text-white">Event Name</TableHead>
                        <TableHead className="text-white">Location</TableHead>
                        <TableHead className="text-white">
                          Date of Event
                        </TableHead>
                        <TableHead className="text-white">Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    {isSuccess && recentEvents.length > 0 ? (
                      <TableBody>
                        {recentEvents.map((events) => {
                          const convertDate = new Date(events.date)
                          const formattedDate = format(
                            convertDate,
                            'MMMM d, yyyy - HH:mm:ss'
                          )
                          return (
                            <TableRow key={events.id}>
                              <TableCell className="font-medium">
                                {events.title}
                              </TableCell>
                              <TableCell>{events.location}</TableCell>
                              <TableCell>{formattedDate}</TableCell>
                              <TableCell>{events.status}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  size="sm"
                                  variant="link"
                                  className="w-20"
                                  asChild
                                >
                                  <Link to={`/events-detail/${events.id}`}>
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    ) : (
                      <TableCaption>
                        <p className="grid place-content-center text-base text-black">
                          No recent events
                        </p>
                      </TableCaption>
                    )}
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Events
