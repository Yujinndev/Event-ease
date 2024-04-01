import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from '@/lib/axios'
import HeroImg from '@/assets/hero-image.png'
import useAuthStore from '@/services/state/useAuthStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import FormError from '@/components/ui/FormError'
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
  FormMessage,
} from '@/components/ui/form'

const userSchema = z.object({
  email: z.string().email({
    message: 'Email is invalid',
  }),
  password: z.string().min(8, {
    message: 'Password must contain at least 8 character(s)',
  }),
})

export default function SignIn() {
  const navigate = useNavigate()
  const setAuthLogin = useAuthStore((state) => state.login)
  const auth = useAuthStore.getState().auth

  useEffect(() => {
    if (auth) navigate('/signin')
  }, [auth])

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      const userdetails = JSON.stringify(response.data)
      setAuthLogin(userdetails)

      localStorage.setItem('user', userdetails)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const message = error?.response?.data?.error
      form.setError('root', { message: message })
    }
  }

  return (
    <section className="w-full lg:grid lg:grid-cols-2">
      <div className="relative flex min-h-screen items-center justify-center p-6 py-12">
        <div className="absolute inset-x-0 top-64 md:hidden lg:left-24 lg:top-72">
          <div
            aria-hidden="true"
            className="mt-20 grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-60 2xl:mx-auto 2xl:max-w-7xl"
          >
            <div className="h-60 bg-gradient-to-br from-purple-400 to-indigo-300 blur-3xl dark:from-blue-700"></div>
            <div className="h-72 rounded-full bg-gradient-to-r from-green-400 to-lime-300 blur-3xl dark:from-transparent dark:to-indigo-600"></div>
          </div>
        </div>
        <Card className="z-10 m-auto grid w-full gap-6 bg-white lg:w-[550px] lg:px-8 lg:py-4">
          <CardHeader className="-mb-4">
            <CardTitle className="text-2xl">Let's sign in!</CardTitle>
            <CardDescription>
              Enter your details below to login to your account ..
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>

                      <FormError errorField={form.formState.errors.email} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormError errorField={form.formState.errors.password} />
                    </FormItem>
                  )}
                />
                <FormError errorField={form.formState.errors.root} />
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting ? 'Logging in .. ' : 'Login'}
                </Button>
              </form>
            </Form>
            <Button variant="outline" className="mt-2 w-full">
              Login with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={HeroImg}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </section>
  )
}
