import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useGetEventById } from '@/hooks/useFetchEvents'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs } from '@/components/ui/tabs'
import LoadingPage from '@/components/LoadingPage'
import GradientBg from '@/components/ui/GradientBg'
import EventOverview from '@/components/events/EventOverview'
import EventGuests from '@/components/events/EventGuests'

function EventDetail() {
  const { id } = useParams()
  const { data, isLoading, isSuccess } = useGetEventById(id)

  const tabs = [
    {
      title: 'Overview',
      value: 'overview',
      content: <EventOverview data={data} />,
    },
    {
      title: 'Guests',
      value: 'guests',
      content: <EventGuests data={data} />,
    },
    {
      title: 'Finances',
      value: 'finances',
      content: <div>Finances</div>,
    },
    {
      title: 'More',
      value: 'more',
      content: <div>More</div>,
    },
  ]

  if (isLoading) <LoadingPage />

  if (isSuccess) {
    return (
      <div className="relative overflow-hidden bg-grid-black/[0.035]">
        <GradientBg />

        <section className="mx-auto mt-4 min-h-[90vh] max-w-screen-2xl px-8 md:px-14 xl:px-20">
          <div className="relative ml-auto pt-20">
            <div className="flex w-full flex-col-reverse justify-between md:flex-row md:items-center">
              <div className="flex flex-1 flex-col items-start gap-1 pb-8 pt-4 md:w-2/3 md:py-8 lg:w-1/2">
                <Badge className="w-max">{data.category}</Badge>
                <div>
                  <h1 className="text-4xl font-black dark:text-white md:text-4xl lg:text-5xl xl:text-6xl">
                    {data.title}
                  </h1>
                  {/* <small className="font-light">Hosted by: You</small> */}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-max rounded-full px-6 py-5"
                asChild
              >
                <Link to="/events">
                  Events Page <ArrowUpRight size={18} className="ms-2" />
                </Link>
              </Button>
            </div>

            <Tabs tabs={tabs} activeTabClassName={'bg-primary'} />
          </div>
        </section>
      </div>
    )
  }
}

export default EventDetail
