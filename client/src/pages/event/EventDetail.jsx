import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import Header from '@/components/Header'
import LoadingPage from '@/components/LoadingPage'
import GradientBg from '@/components/ui/GradientBg'
import { useGetEventById } from '@/hooks/useFetchEvents'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Clock8, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from '@/lib/axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import FormError from '@/components/ui/FormError'
import { useQueryClient } from '@tanstack/react-query'
import UpdateFormDialog from '@/components/ui/UpdateFormDialog'

function EventDetail() {
  const { id } = useParams()
  const { data, isLoading, isSuccess } = useGetEventById(id)

  if (isLoading) <LoadingPage />

  if (isSuccess) {
    const convertDate = new Date(data.date)
    const formattedDate = format(convertDate, 'MMMM d, yyyy - HH:mm')

    return (
      <>
        <Header />
        <div className="relative overflow-hidden">
          <GradientBg />

          <section className="mx-auto mt-4 min-h-[90vh] max-w-screen-2xl px-8 md:px-14 xl:px-20">
            <div className="relative ml-auto pt-20">
              <div className="flex w-full flex-col-reverse justify-between md:flex-row md:items-center">
                <div className="flex flex-1 flex-col items-start gap-4 pb-8 pt-4 md:w-2/3 md:py-8 lg:w-1/2">
                  <Badge className="w-max">{data.category}</Badge>
                  <div>
                    <h1 className="text-4xl font-black dark:text-white md:text-4xl lg:text-5xl xl:text-6xl">
                      {data.title}
                    </h1>
                    <small className="font-light">Hosted by: You</small>
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

            <div className="relative ml-auto py-8">
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
                          {format(convertDate, 'MMM')}
                        </p>
                        <p className="mb-0 text-xl font-black">
                          {format(convertDate, 'dd')}
                        </p>
                      </div>
                    </CardContent>

                    <CardContent className="flex justify-center gap-2 pt-4 lg:justify-end">
                      <UpdateFormDialog data={data} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex flex-col gap-2 p-8">
                      <h1 className="text-xl font-black">Timeline:</h1>
                      <div className="ms-6 flex items-center gap-4 font-mono text-lg">
                        <Clock8 size={24} className="flex-shrink-0" />
                        {formattedDate}{' '}
                        <Badge
                          variant={
                            data.status === 'UPCOMING' ? '' : 'destructive'
                          }
                          className="w-max"
                        >
                          {data.status}
                        </Badge>
                      </div>
                      <div className="ms-6 flex items-center gap-4 font-mono text-lg">
                        <MapPin size={24} />
                        {data.location}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="flex flex-col gap-2 p-8">
                    <div>
                      <h1 className="text-xl font-black">Description:</h1>
                      <p className="ms-8 text-justify text-xl">{data.desc}</p>
                    </div>
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
