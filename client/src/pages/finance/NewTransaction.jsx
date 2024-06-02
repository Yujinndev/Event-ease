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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import FormError from '@/components/ui/FormError'
import GradientBg from '@/components/ui/GradientBg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowUpLeft } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const transactionSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(4),
  amount: z.coerce.number().int().gte(1),
  dateTransac: z.coerce.date(),
  type: z.enum(['INCOME', 'EXPENSE', 'SAVING']),
})

const NewTransaction = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: '',
      description: '',
      amount: '',
      dateTransac: '',
      type: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      await axios.post('/finance/create', {
        name: data.name,
        description: data.description,
        amount: data.amount,
        dateTransac: data.dateTransac,
        type: data.type,
      })
    } catch (error) {
      const message = error?.response?.data?.error
      form.setError('root', { message: message })
    }
  }

  const { mutateAsync: CreateNewTransaction } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finances'] })
      navigate('/finances/', { replace: true })
    },
  })

  return (
    <div className="relative overflow-hidden bg-grid-black/[0.035]">
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
                Let's create your new transaction!
              </CardTitle>
              <CardDescription>
                Enter your details below to create new transaction ..
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(CreateNewTransaction)}
                  className="grid gap-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jollibee" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Mix and Match" {...field} />
                        </FormControl>
                        <FormError errorField={form.formState.errors.desc} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <div className="flex items-center gap-1 rounded-md border px-4 py-1">
                          <span className="text-sm font-bold">PHP</span>
                          <FormControl>
                            <Input
                              placeholder="00.00"
                              className="focus-visible:ring-none border-0 ring-transparent focus-visible:outline-0"
                              {...field}
                            />
                          </FormControl>
                        </div>

                        <FormError errorField={form.formState.errors.desc} />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateTransac"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Transaction</FormLabel>
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
                    name="type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Type</FormLabel>
                        <Select
                          className="w-max"
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="What type of transaction?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="INCOME">Income</SelectItem>
                              <SelectItem value="EXPENSE">Expense</SelectItem>
                              <SelectItem value="SAVING">Saving</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormError errorField={form.formState.errors.status} />
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
                      ? 'Creating your transaction .. '
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

export default NewTransaction
