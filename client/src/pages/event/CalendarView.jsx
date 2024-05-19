import Header from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useGetAllEvents } from '@/hooks/useFetchEvents'
import { cn } from '@/lib/utils'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  isWithinInterval,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const CalendarView = () => {
  const currentDate = new Date()
  const [currentMonth, setCurrentMonth] = useState(currentDate)

  const { data: events, isSuccess } = useGetAllEvents()

  useEffect(() => {
    setCurrentMonth(currentDate)
  }, [])

  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)

  // get all the days in the currentMonth
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  })

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1))
  }

  // get the events on each date
  const eventsByDate = useMemo(() => {
    return (
      isSuccess &&
      events.reduce((acc, event) => {
        const dateKey = format(event.date, 'yyyy-MM-dd')
        return {
          ...acc,
          [dateKey]: [...(acc[dateKey] || []), event],
        }
      }, {})
    )
  }, [events])

  // Get event count for the current month
  const eventCountForCurrentMonth = useMemo(() => {
    if (!isSuccess) return 0

    return events.filter((event) =>
      isWithinInterval(new Date(event.date), {
        start: firstDayOfMonth,
        end: lastDayOfMonth,
      })
    ).length
  }, [events, isSuccess, firstDayOfMonth, lastDayOfMonth])

  const startingDayIndex = getDay(firstDayOfMonth)

  return (
    <>
      <Header />
      <div className="relative overflow-auto bg-grid-black/[0.035]">
        <section className="mx-auto my-4 min-h-[90vh] max-w-screen-2xl px-8 md:px-14 xl:px-20">
          <div className="relative ml-auto pt-20">
            <div className="relative flex w-max pb-8 md:py-6">
              <h1 className="text-3xl font-black dark:text-white">
                Events for {format(currentMonth, 'MMMM yyyy')}
              </h1>
              <Badge className="absolute -right-8 bg-amber-400 text-black">
                {eventCountForCurrentMonth}
              </Badge>
            </div>
            <div className="flex items-center justify-center gap-2 lg:justify-end">
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
                <Link to="/events">
                  Card View <ArrowUpRight size={18} className="ms-2" />
                </Link>
              </Button>
            </div>

            <HeaderBlock items={WEEKDAYS} />
            <AllDays
              startingDayIndex={startingDayIndex}
              daysInMonth={daysInMonth}
              eventsByDate={eventsByDate}
            />
            <Pagination prev={() => prevMonth()} next={() => nextMonth()} />
          </div>
        </section>
      </div>
    </>
  )
}

const DateBlock = ({ className, ...rest }) => {
  return (
    <>
      <motion.div
        className={cn(
          'cols-spmrounded-md row-span-8 border border-primary/75 bg-white p-6',
          className
        )}
        {...rest}
      />
    </>
  )
}

const HeaderBlock = ({ items }) => {
  return (
    <div className="hidden grid-cols-7 gap-4 pt-8 lg:grid">
      {items.map((day) => {
        return (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        )
      })}
    </div>
  )
}

const AllDays = ({ startingDayIndex, daysInMonth, eventsByDate }) => {
  return (
    <div className="relative grid grid-cols-2 gap-4 pt-4 lg:grid-cols-7">
      {Array.from({ length: startingDayIndex }).map((_, index) => {
        return (
          <DateBlock
            key={`empty-${index}`}
            className="hidden border-0 bg-slate-50/50 p-2 text-center lg:block"
          />
        )
      })}
      {daysInMonth.map((day, index) => {
        const dateKey = format(day, 'yyyy-MM-dd')
        const todaysEvents = eventsByDate[dateKey] || []
        return (
          <DateBlock
            key={index}
            className={cn(
              'group relative flex flex-col gap-2 rounded-md border p-2 font-mono text-base',
              {
                'bg-primary/90': isToday(day),
                'text-white': isToday(day),
              }
            )}
          >
            <p className="text-gray-400 lg:hidden">{format(day, 'EEE')}</p>
            <p className="-mt-2 font-bold lg:mt-0 lg:font-normal">
              {format(day, 'd')}
            </p>
            {todaysEvents.map((event) => {
              return (
                <Link
                  to={`/events/detail/${event.id}`}
                  key={event.title}
                  className={cn(
                    'relative left-5 z-10 col-span-12 rounded-md bg-amber-400 py-2 text-center text-sm font-bold text-gray-900 group-hover:bg-amber-200 lg:line-clamp-none',
                    {
                      'bg-red-700 text-white': event.status === 'DONE',
                    }
                  )}
                >
                  {event.title}
                </Link>
              )
            })}
          </DateBlock>
        )
      })}
    </div>
  )
}

const Pagination = ({ next, prev }) => {
  return (
    <div className="fixed bottom-0 right-10 flex justify-center gap-2 py-4 lg:right-32 lg:justify-end xl:right-44">
      <Button
        variant="secondary"
        className="rounded-full py-2"
        size="sm"
        onClick={prev}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="secondary"
        className="rounded-full py-2"
        size="sm"
        onClick={next}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}

export default CalendarView
