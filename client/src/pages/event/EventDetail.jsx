import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Header from '@/components/Header'
import LoadingPage from '@/components/LoadingPage'
import GradientBg from '@/components/ui/GradientBg'
import { Card, CardContent } from '@/components/ui/card'
import { useGetEventById } from '@/hooks/useFetchEvents'
import { months } from '@/utils/MonthData'
import { Button } from '@/components/ui/button'

function EventDetail() {
  const { id } = useParams()
  const { data, isLoading, isSuccess } = useGetEventById(id)

  if (isLoading) <LoadingPage />

  if (isSuccess) {
    const convertDate = new Date(data.date)
    const formattedDate = format(convertDate, 'MMMM d, yyyy - HH:mm:ss')

    return (
      <>
        <Header />
        <div className="relative overflow-hidden">
          <GradientBg />

          <section className="mx-auto mt-4 min-h-[90vh] max-w-screen-2xl px-8 md:px-14 xl:px-20">
            <div className="relative ml-auto pt-20">
              <div className="gap-12">
                <div className="pb-8 md:w-2/3 md:py-12 lg:w-1/2">
                  <h1 className="text-5xl font-black dark:text-white md:text-4xl lg:text-5xl xl:text-6xl">
                    {data.title}
                  </h1>
                </div>
              </div>

              <div className="flex gap-8 border-b-2">
                <div className="relative mb-2">
                  <small>Overview</small>
                  <div className="absolute inset-y-[2.1rem] h-1 w-full rounded-xl bg-primary" />
                </div>
                <div className="relative">
                  <small>Guests</small>
                </div>
                <div className="relative">
                  <small>Finances</small>
                </div>
                <div className="relative">
                  <small>Timeline</small>
                </div>
                <div className="relative">
                  <small>Inbox</small>
                </div>
                <div className="relative">
                  <small>More</small>
                </div>
              </div>
            </div>

            <div className="relative ml-auto pt-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <Card className="relative p-4">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSZHgjV8ckMtH2AEwV7Q63QFOFZoVDKDy24MVx_9NVPA&s"
                      alt="Example Image"
                      className="w-full rounded-lg"
                    />

                    <CardContent className="absolute -mt-20 flex items-center gap-2">
                      <div className="flex flex-col items-center justify-center rounded-sm border bg-white px-4 py-2">
                        <p className="-mb-1 text-sm">
                          {months[convertDate.getMonth()].slice(0, 3)}
                        </p>
                        <p className="mb-0 text-xl font-black">
                          {convertDate.getDay()}
                        </p>
                      </div>
                    </CardContent>

                    <CardContent className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" className="w-32 rounded-full">
                        Edit
                      </Button>
                      <Button className="w-32 rounded-full">
                        Change Cover
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex flex-col gap-2 p-8">
                      <h1 className="text-xl font-black">Timeline:</h1>
                      <p className="ms-8 text-xl">{formattedDate}</p>
                      <p className="ms-8 text-xl">{data.location}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="flex flex-col gap-2 p-8">
                    <h1 className="text-xl font-black">Description:</h1>
                    <p className="ms-8 text-justify text-xl">
                      {data.desc} Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Ut in pellentesque ligula, egestas
                      dapibus nisi. Quisque pretium enim quis erat vulputate, at
                      convallis odio luctus. Curabitur vitae dui non nunc
                      maximus fringilla. Pellentesque a justo lectus. Aenean
                      cursus ex augue, a tristique enim ultrices in. Quisque mi
                      metus, rutrum eget elit et, dignissim ultricies ante.
                      Suspendisse luctus eleifend placerat. Praesent eleifend
                      tellus quis felis porta mattis. Suspendisse potenti.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }
}

export default EventDetail
