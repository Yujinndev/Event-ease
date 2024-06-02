import { useState } from 'react'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowUpLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import GradientBg from '@/components/ui/GradientBg'
import FormError from '@/components/ui/FormError'
import Geoapify from '@/components/ui/Geoapify'
import axios from '@/lib/axios'
import { cn } from '@/lib/utils'

export const eventSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(3),
  desc: z.string().min(10),
  date: z.coerce.date(),
  location: z.string().min(3),
  status: z.string().min(3),
})

const locationChoices = [
  {
    title: 'Recommend',
    value: 'recommend',
  },
  {
    title: 'No thanks',
    value: 'no',
  },
]

const NewEvent = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [locPref, setLocPref] = useState('no')

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      category: '',
      desc: '',
      date: '',
      location: '',
      status: 'UPCOMING',
    },
  })

  const onSubmit = async (data) => {
    try {
      const convertDate = new Date(data.date)

      await axios.post('/event/create', {
        title: data.title,
        category: data.category,
        desc: data.desc,
        date: convertDate,
        location: data.location,
      })
    } catch (error) {
      const message = error?.response?.data?.error
      form.setError('root', { message: message })
    }
  }

  const { mutateAsync: CreateNewEvent } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      navigate('/events/', { replace: true })
    },
  })

  const handlePlaceSelect = (address) => {
    form.setValue('location', address)
  }

  return (
    <div className="relative overflow-hidden bg-grid-black/[0.035]">
      <section className="mx-auto mt-12 min-h-[90vh] max-w-screen-2xl md:px-14 xl:px-20">
        <div className="relative flex min-h-screen items-center justify-center p-6 py-12">
          <GradientBg />
          <Card className="z-10 grid w-full gap-6 bg-background lg:w-[750px] lg:px-8 lg:py-4">
            <CardHeader className="relative -mb-4">
              <Button
                size="sm"
                variant="outline"
                className="absolute -inset-x-3 -inset-y-5 flex w-max gap-x-2 rounded-full py-4 lg:-inset-x-12 lg:-inset-y-8"
                onClick={() => navigate(-1)}
              >
                <ArrowUpLeft />
                <small className="hidden lg:block">Back</small>
              </Button>
              <CardTitle className="text-2xl">
                Let's create your new event!
              </CardTitle>
              <CardDescription>
                Enter your details below to create new event ..
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(CreateNewEvent)}
                  className="grid gap-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Date with bebe" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Personal" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A quality time with my partner in life"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date and Time</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Date"
                            type="datetime-local"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Place & Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              locPref == 'no'
                                ? 'Wolfgang Steakhouse'
                                : 'Select from the recommendations'
                            }
                            disabled={locPref !== 'no'}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Card className="flex gap-2 p-1">
                      {locationChoices.map((choice) => (
                        <a
                          key={choice.title}
                          onClick={() => setLocPref(choice.value)}
                          className="relative cursor-pointer p-4 py-2 text-sm"
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          <span
                            className={cn(
                              'relative z-50 block text-black dark:text-white',
                              {
                                'text-white': locPref === choice.value,
                              }
                            )}
                          >
                            {choice.title}
                          </span>
                          {locPref === choice.value && (
                            <motion.div
                              layoutId="clickedbutton"
                              transition={{
                                type: 'spring',
                                bounce: 0.25,
                                duration: 1.25,
                              }}
                              className="absolute inset-0 z-10 rounded-md bg-primary dark:bg-zinc-800"
                            />
                          )}
                        </a>
                      ))}
                    </Card>
                  </div>

                  {locPref !== 'no' && (
                    <Geoapify onSelectPlace={handlePlaceSelect} />
                  )}

                  <FormError errorField={form.formState.errors.root} />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full"
                  >
                    {form.formState.isSubmitting
                      ? 'Creating your event .. '
                      : 'Create'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default NewEvent
