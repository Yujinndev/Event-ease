import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Link, useNavigate } from 'react-router-dom'
import HeroImg from '@/assets/hero-image.png'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import useAuthStore from '@/services/state/useAuthStore'

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
      <div className="flex min-h-screen items-center justify-center p-6 py-12">
        <Card className="m-auto grid w-full gap-6 lg:w-[550px] lg:px-8 lg:py-4">
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
            <Button variant="outline" className="mt-2 w-full">
              Login with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="underline">
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
