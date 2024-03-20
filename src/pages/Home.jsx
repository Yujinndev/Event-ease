import React from "react"
import eventLogo from "@/assets/event-image.png"
import heroLogo from "@/assets/hero-image.png"
import {
  FaEnvelopeCircleCheck,
  FaMoneyBills,
  FaTimeline,
  FaCalendarDays,
} from "react-icons/fa6"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FeatureCard from "@/components/FeatureCard"

const features = [
  {
    name: "Finance Tracker and Analysis",
    desc: "Suggest date ideas and venues that align with the specified budget.",
    icon: <FaMoneyBills />,
  },
  {
    name: "Guest Email Invitation",
    desc: "Invite guests in a modernized manner. Users can effortlessly manage RSVPs.",
    icon: <FaEnvelopeCircleCheck />,
  },
  {
    name: "Timeline and Task Management",
    desc: "Assist in planning the timeline for the date, from making reservations to organizing surprise elements.",
    icon: <FaTimeline />,
  },
  {
    name: "Calendar Integration",
    desc: "Users can schedule tasks, set reminders, and synchronize event details with their personal calendars.",
    icon: <FaCalendarDays />,
  },
]

function Home() {
  return (
    <div className="relative overflow-hidden lg:overflow-auto">
      <Header />

      <div className="absolute inset-x-0 top-32 lg:hidden">
        <div
          aria-hidden="true"
          className="grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-60 2xl:mx-auto 2xl:max-w-6xl"
        >
          <div className="h-60 bg-gradient-to-br from-primary to-purple-400 blur-3xl dark:from-blue-700"></div>
          <div className="h-72 rounded-full bg-gradient-to-r from-green-400 to-lime-300 blur-3xl dark:from-transparent dark:to-indigo-600"></div>
        </div>
      </div>
      <div
        className="mx-auto mt-4 max-w-7xl px-6 md:px-12 lg:px-6 xl:px-0"
        id="home"
      >
        <div className="relative ml-auto pt-40 xl:pt-36">
          <div className="gap-12 md:flex md:items-center">
            <div className="text-center sm:px-12 md:w-2/3 md:px-0 md:text-left lg:w-1/2">
              <h1 className="text-5xl font-black dark:text-white md:text-6xl xl:text-7xl">
                Making events simple and effortless.
              </h1>
              <div>
                <p className="mt-8 text-lg text-gray-700 dark:text-gray-100">
                  From birthdays to weddings, effortlessly plan and manage every
                  detail of your event with ease and precision.
                </p>
                <div className="mx-auto mt-12 flex w-72 gap-4  sm:gap-6 md:w-auto md:justify-start">
                  <Button className="flex-1 rounded-full bg-green-700 transition-all duration-200 ease-linear hover:scale-105">
                    Try it out
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full transition-all duration-200 ease-linear hover:scale-105"
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative md:mt-0 md:w-2/5 lg:w-3/5">
              <div className="md:-mr-72 lg:ml-2 lg:mr-0">
                <img
                  className="-ml-2 h-full scale-150 object-cover object-left dark:hidden lg:scale-125"
                  src={heroLogo}
                  alt="app screenshot"
                  width="1628"
                  height="1233"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative pt-32 md:pt-44" id="features">
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-6 xl:px-0">
          <div className="mx-auto md:w-3/5">
            <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Shaped to meet your needs
            </h2>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              For any occasion, budgeting and invitations; you name it. We all
              have it!
            </p>
          </div>
          <div className="mt-16 md:mt-20">
            <div className="relative grid rounded-3xl border border-gray-200 p-1 dark:border-gray-800 lg:grid-cols-2">
              <div className="absolute inset-0 hidden h-max dark:block lg:my-auto">
                <div
                  aria-hidden="true"
                  className="grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-70 2xl:mx-auto 2xl:max-w-6xl"
                >
                  <div className="h-60 bg-gradient-to-br from-primary to-purple-400 blur-3xl dark:from-blue-700"></div>
                  <div className="h-72 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 blur-3xl dark:from-transparent dark:to-indigo-600"></div>
                </div>
              </div>
              <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8 py-12 lg:py-8">
                <img
                  src={eventLogo}
                  className="-mt-16 lg:-mt-32"
                  loading="lazy"
                />
                <div className="mx-auto -mt-12 px-4 text-center lg:px-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Event Planning and Management
                  </h2>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Understand the preferences of both individuals involved in
                    the date, considering factors like favorite cuisines,
                    preferred activities, and ambiance.
                  </p>
                </div>
              </div>
              <div className="relative grid grid-rows-2 overflow-hidden rounded-[1.25rem] bg-gray-100 p-1 dark:bg-gray-800/50 sm:grid-cols-2">
                {features.map((item) => {
                  return <FeatureCard key={item.name} props={item} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
