import { useGetAllEvents } from '@/hooks/useFetchEvents'
import { Link } from 'react-router-dom'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { SkeletonCard } from '@/components/ui/SkeletonEventCard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Clock8, MapPin, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import Pagination from '@/components/ui/pagination'

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
      setEvents(
        data.filter(
          (el) => new Date(el.date) > currentDate || el.status === 'UPCOMING'
        )
      )
    } else if (selectedFilter === 'Recent') {
      setEvents(data.filter((el) => el.status === 'DONE'))
    } else if (selectedFilter === 'Cancelled') {
      setEvents(data.filter((el) => el.status === 'CANCELED'))
    } else {
      setEvents([])
    }
  }, [data, selectedFilter])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  // Calculate the total number of pages
  const totalPages = Math.ceil(events.length / itemsPerPage)

  // Calculate the items for the current page
  const startIdx = (currentPage - 1) * itemsPerPage
  const currentItems = events.slice(startIdx, startIdx + itemsPerPage)

  return (
    <div className="relative overflow-hidden bg-grid-black/[0.035]">
      <section className="mx-auto my-4 min-h-[98dvh] max-w-screen-2xl px-8 md:px-14 lg:mb-0 xl:px-20">
        <div className="relative ml-auto pt-20">
          <div className="pb-6 md:w-2/3 md:py-6 lg:w-1/2">
            <h1 className="text-3xl font-black dark:text-white">
              See your scheduled events
            </h1>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="flex flex-1 items-center justify-around gap-2 rounded-xl border bg-white p-4 py-2 md:flex-none lg:flex-wrap">
              {BUTTONS.map((btn, idx) => {
                return (
                  <Button
                    key={idx}
                    onClick={() => setSelectedFilter(btn)}
                    variant="ghost"
                    size="sm"
                    className="relative flex-1 p-4 py-2 text-sm"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <span
                      className={cn(
                        'relative z-50 block text-black dark:text-white',
                        {
                          'text-white': selectedFilter === btn,
                        }
                      )}
                    >
                      {btn}
                    </span>
                    {selectedFilter === btn && (
                      <motion.div
                        layoutId="clickedbutton"
                        transition={{
                          type: 'spring',
                          bounce: 0.25,
                          duration: 0.75,
                        }}
                        className="absolute inset-0 z-10 rounded-md bg-primary dark:bg-zinc-800"
                      />
                    )}
                  </Button>
                )
              })}
            </div>
            <div className="flex justify-center gap-2">
              <Button
                size="sm"
                className="w-max rounded-full px-3 py-5"
                asChild
              >
                <Link to="/events/new">
                  <Plus size={18} />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-max rounded-full px-6 py-5"
                asChild
              >
                <Link to="/events/v/calendar">
                  Calendar View <ArrowUpRight size={18} className="ms-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 py-8">
            <div className="flex items-center justify-between">
              <p className="text-[17px] font-bold dark:text-gray-300 md:text-xl">
                {selectedFilter} Events
              </p>
            </div>

            {isSuccess && events.length > 0 ? (
              <EventList
                events={currentItems}
                selectedFilter={selectedFilter}
              />
            ) : (
              <p className="grid place-content-center">
                No {selectedFilter} events
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
    </div>
  )
}

const EventList = ({ events, selectedFilter }) => {
  return (
    <div className="overflow flex flex-col gap-4">
      {events.map((el) => {
        const convertDate = new Date(el.date)

        return (
          <motion.div
            key={el.id}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.95 }}
            className="relative h-1 flex-1 bg-white transition-all ease-linear"
          >
            <Link to={`/events/detail/${el.id}`}>
              <Suspense fallback={<SkeletonCard />}>
                <Card
                  className={cn('relative flex', {
                    'bg-primary/10': selectedFilter === 'Recent',
                    'bg-red-700/10': selectedFilter === 'Cancelled',
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
                        {el.title}
                      </p>
                      <p className="mt-1 line-clamp-1 text-[14px]">{el.desc}</p>
                      <div className="flex flex-col flex-wrap gap-x-4 lg:flex-row">
                        <div className="mt-1 flex items-center gap-2 font-mono text-lg lg:mt-2">
                          <Clock8 size={18} />
                          <small>{format(convertDate, 'HH:mm')}</small>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-lg lg:mt-2">
                          <MapPin size={18} className="flex-shrink-0" />
                          <small className="line-clamp-1">{el.location}</small>
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
  )
}

export default Events
