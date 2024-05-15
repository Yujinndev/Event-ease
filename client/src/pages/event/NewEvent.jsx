import axios from '@/lib/axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import FormError from '@/components/ui/FormError'
import GradientBg from '@/components/ui/GradientBg'
import { useQueryClient } from '@tanstack/react-query'
import { ArrowUpLeft } from 'lucide-react'

export const eventSchema = z.object({
  title: z.string().min(3, {
    message: 'Title is Required',
  }),
  category: z.string().min(3, {
    message: 'Category is Required',
  }),
  desc: z.string().min(10, {
    message: 'Description should be at least 10 characters',
  }),
  date: z.coerce.date({ message: 'Event date is invalid' }),
  location: z.string().min(3, {
    message: 'Location is Required',
  }),
  status: z.string().min(3, {
    message: 'Status is Required',
  }),
})

function NewEvent() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

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

      queryClient.invalidateQueries(['events'])
      setTimeout(() => {
        navigate('/events/', { replace: true })
      }, 1000)
    } catch (error) {
      const message = error?.response?.data?.error
      form.setError('root', { message: message })
    }
  }

  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto mt-4 min-h-[90vh] max-w-screen-2xl md:px-14 xl:px-20">
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
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormError errorField={form.formState.errors.title} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Category" {...field} />
                        </FormControl>
                        <FormError
                          errorField={form.formState.errors.category}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                        <FormError errorField={form.formState.errors.desc} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Date"
                            type="datetime-local"
                            {...field}
                          />
                        </FormControl>
                        <FormError errorField={form.formState.errors.date} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormError
                          errorField={form.formState.errors.location}
                        />
                      </FormItem>
                    )}
                  />
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
