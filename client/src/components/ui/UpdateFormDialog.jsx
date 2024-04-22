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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { eventSchema } from '@/pages/event/NewEvent'
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
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'

function UpdateFormDialog({ data }) {
  const eventId = data.id
  const convertDate = new Date(data.date)
  const formattedDate = convertDate.toISOString().slice(0, 16) // Extract the date and time part

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: data.title,
      category: data.category,
      desc: data.desc,
      date: formattedDate,
      status: data.status,
      location: data.location,
    },
  })

  const onSubmit = async (data) => {
    try {
      const convertDate = new Date(data.date)

      await axios.post('/event/update', {
        eventId: eventId,
        title: data.title,
        category: data.category,
        status: data.status,
        desc: data.desc,
        date: convertDate,
        location: data.location,
      })

      queryClient.invalidateQueries(['events'])
      setIsOpen(false)
    } catch (error) {
      const message = error?.response?.data?.error
      form.setError('root', { message: message })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-32 rounded-full">
          Edit
        </Button>
      </DialogTrigger>
      <Button className="w-32 rounded-full">Change Cover</Button>
      <DialogContent className="bg-background sm:max-w-[425px] lg:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title">Title</Label>
                    <FormControl>
                      <Input className="col-span-3" id="title" {...field} />
                    </FormControl>
                  </div>
                  <FormError errorField={form.formState.errors.title} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Category</Label>
                    <FormControl>
                      <Input className="col-span-3" {...field} />
                    </FormControl>
                  </div>
                  <FormError errorField={form.formState.errors.category} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea className="col-span-3 min-h-20" {...field} />
                    </FormControl>
                  </div>
                  <FormError errorField={form.formState.errors.desc} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Date & time</Label>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormError errorField={form.formState.errors.date} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Location</Label>
                    <FormControl>
                      <Input className="col-span-3" {...field} />
                    </FormControl>
                  </div>
                  <FormError errorField={form.formState.errors.location} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Status</Label>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="UPCOMING">Upcoming</SelectItem>
                          <SelectItem value="DONE">Done</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormError errorField={form.formState.errors.status} />
                </FormItem>
              )}
            />
            <FormError errorField={form.formState.errors.root} />
            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                {form.formState.isSubmitting
                  ? 'Saving your changes .. '
                  : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateFormDialog
