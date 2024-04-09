import Header from '@/components/Header'
import GradientBg from '@/components/ui/GradientBg'
import useAuthStore from '@/services/state/useAuthStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import guestLogo from '@/assets/guest-image.png'
import useUserDetails from '@/hooks/useUserDetails'

function Dashboard() {
  const user = useAuthStore.getState().user
  console.log('🚀 ~ Dashboard ~ user:', user)
  const { data, isLoading } = useUserDetails(user)
  console.log('🚀 ~ Dashboard ~ data:', data)

  if (isLoading) return <div>Loading ... </div>

  return (
    <>
      <Header />
      <div className="relative overflow-hidden">
        <GradientBg />

        <section className="mx-auto mt-4 max-w-screen-2xl px-8 md:px-14 xl:px-20">
          <div className="relative ml-auto pt-20">
            <div className="gap-12">
              <div className="p-12 text-center md:w-2/3 md:px-0 md:text-left lg:w-1/2">
                <h1 className="text-5xl font-black dark:text-white md:text-6xl lg:text-6xl xl:text-7xl">
                  Hello, {data.user.firstname}!
                </h1>
              </div>
              <div className="flex flex-col gap-4">
                <p className="mt-4 text-[17px] font-bold dark:text-gray-300 md:text-xl">
                  Upcoming Events
                </p>
                <div className="flex flex-col gap-2 lg:flex-row">
                  <Card className="relative flex-1">
                    <img
                      src={guestLogo}
                      className="relative w-full"
                      loading="lazy"
                    />
                    <CardContent>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="relative flex-1">
                    <img
                      src={guestLogo}
                      className="relative w-full"
                      loading="lazy"
                    />
                    <CardContent>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="relative flex-1">
                    <img
                      src={guestLogo}
                      className="relative w-full"
                      loading="lazy"
                    />
                    <CardContent>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="relative flex-1">
                    <img
                      src={guestLogo}
                      className="relative w-full"
                      loading="lazy"
                    />
                    <CardContent>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardContent>
                  </Card>
                  <Card className="relative flex-1">
                    <img
                      src={guestLogo}
                      className="relative w-full"
                      loading="lazy"
                    />
                    <CardContent>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Dashboard
