import Header from '@/components/Header'
import { useGetAllEvents } from '@/hooks/useFetchEvents'
import { Link } from 'react-router-dom'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { SkeletonCard } from '@/components/ui/SkeletonEventCard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Clock8, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const BUTTONS = ['Upcoming', 'Pending', 'Recent', 'Cancelled']

function Events() {
  const { data, isSuccess } = useGetAllEvents()
  const [events, setEvents] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('Upcoming')
  const currentDate = Date.now()

  useEffect(() => {
    if (!data) {
      setEvents([])
      return
    }

    if (selectedFilter === 'Upcoming') {
      setEvents(data.filter((el) => new Date(el.date) > currentDate))
    } else if (selectedFilter === 'Recent') {
      setEvents(
        data.filter(
          (el) => new Date(el.date) < currentDate && el.status === 'DONE'
        )
      )
    } else {
      setEvents([])
    }
  }, [data, selectedFilter])

  return (
    <>
      <Header />
      <div className="relative overflow-hidden">
        <section className="mx-auto mt-4 min-h-[90vh] max-w-screen-2xl px-8 md:px-14 xl:px-20">
          <div className="relative ml-auto pt-20">
            <div className="gap-12">
              <div className="pb-8 md:w-2/3 md:py-6 lg:w-1/2">
                <h1 className="text-4xl font-black dark:text-white">
                  See your scheduled events
                </h1>
              </div>

              <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <div className="flex flex-1 flex-wrap items-center justify-around gap-2 rounded-xl border p-4 py-2 md:flex-none">
                  {BUTTONS.map((btn, idx) => {
                    return (
                      <Button
                        onClick={() => setSelectedFilter(btn)}
                        variant={selectedFilter === btn ? '' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        key={idx}
                      >
                        {btn}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-max rounded-full px-6 py-5"
                  asChild
                >
                  <Link to="/events/new">
                    Create new event <ArrowUpRight size={18} className="ms-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col gap-4 py-8">
                <div className="flex items-center justify-between">
                  <p className="text-[17px] font-bold dark:text-gray-300 md:text-xl">
                    {selectedFilter} Events
                  </p>
                </div>

                {isSuccess && events.length > 0 ? (
                  <div className="overflow flex flex-col gap-2">
                    {events.map((events) => {
                      const convertDate = new Date(events.date)

                      return (
                        <motion.div
                          key={events.id}
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative h-1 flex-1 transition-all ease-linear"
                        >
                          <Link to={`/events/detail/${events.id}`}>
                            <Suspense fallback={<SkeletonCard />}>
                              <Card
                                className={cn('relative flex', {
                                  'bg-primary/10': selectedFilter === 'Recent',
                                  'bg-red-700/10':
                                    selectedFilter === 'Cancelled',
                                })}
                              >
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSZHgjV8ckMtH2AEwV7Q63QFOFZoVDKDy24MVx_9NVPA&s"
                                  alt="Example Image"
                                  className="hidden lg:block"
                                />
                                <CardContent className="relative flex flex-1 items-center gap-4 px-8 pt-4">
                                  <div className="flex flex-col items-center justify-center rounded-sm border px-4 py-2">
                                    <p className="-mb-1 text-base">
                                      {format(convertDate, 'MMM')}
                                    </p>
                                    <p className="mb-0 text-[24px] font-black">
                                      {format(convertDate, 'dd')}
                                    </p>
                                  </div>
                                  <div className="w-full">
                                    <p className="line-clamp-1 text-[17px] font-bold dark:text-gray-300">
                                      {events.title}
                                    </p>
                                    <p className="line-clamp-1 text-[14px]">
                                      {events.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-x-4">
                                      <div className="mt-2 flex items-center gap-2 font-mono text-lg">
                                        <Clock8 size={18} />
                                        <small>
                                          {format(convertDate, 'HH:mm')}
                                        </small>
                                      </div>
                                      <div className="mt-2 flex items-center gap-2 font-mono text-lg">
                                        <MapPin
                                          size={18}
                                          className="flex-shrink-0"
                                        />
                                        <small className="line-clamp-1">
                                          {events.location}
                                        </small>
                                      </div>
                                    </div>
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
                    No {selectedFilter} events
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Events
