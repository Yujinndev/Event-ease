import React from "react"
import logo from "@/assets/hero-image.png"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  {
    name: "FINANCE TRACKER & ANALYSIS",
    desc: "Suggest date ideas and venues that align with the specified budget, whether it's a casual coffee date or a more elaborate dinner.",
  },
  {
    name: "EVENT MANAGEMENT",
    desc: "Understand the preferences of both individuals involved in the date, considering factors like favorite cuisines, preferred activities, and ambiance.",
  },
  {
    name: "GUEST EMAIL INVITATION",
    desc: "Invite guests in a modernized manner. Users can effortlessly input guest email addresses, customize invitations, and efficiently manage RSVPs.",
  },
  {
    name: "TIMELINE & TASK MANAGEMENT",
    desc: "Assist in planning the timeline for the date, from making reservations to organizing surprise elements, ensuring a smooth and enjoyable experience.",
  },
  {
    name: "CALENDAR INTEGRATION",
    desc: "Users can schedule tasks, set reminders, and synchronize event details with their personal calendars, ensuring organized planning and timely execution.",
  },
]

function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-2 px-8 lg:flex-row">
        <div className="h-64 scale-125 md:mt-16 md:scale-95 md:opacity-70 lg:hidden">
          <img src={logo} alt="logo" />
        </div>
        <div className="relative flex w-full flex-col gap-4 md:mt-28 md:flex-auto md:text-left lg:w-3/5">
          <h1 className="title brand text-4xl md:text-5xl lg:text-6xl">
            Event Ease
          </h1>
          <p className="subtitle text-justify text-lg md:text-2xl lg:text-3xl">
            Our ultimate event planner web app for any occasion, offering
            finance budgeting, customizable event pages, a user-friendly
            calendar, and geolocation integration. From birthdays to weddings,
            effortlessly plan and manage every detail of your event with ease
            and precision.
          </p>
          <div className="flex flex-col gap-4 md:w-64 md:flex-row">
            <Button className="flex-auto">Try it out</Button>
            <Button variant="outline">Explore</Button>
          </div>
        </div>
        <div className="hidden h-96 w-full flex-col gap-4 md:w-1/2 md:flex-auto lg:flex">
          <img src={logo} alt="logo" />
        </div>
      </div>

      <div className="flex h-fit w-[100vw] flex-col items-center justify-center gap-2 px-8 py-4">
        <div className="absolute h-[215%] w-full bg-amber-800 md:h-4/5" />
        <div className="brand z-10 mb-3 text-2xl md:text-5xl">
          Our Features & Services
        </div>
        <div className="align-center z-10 flex flex-col flex-wrap justify-center gap-4 md:flex-row">
          {features.map((el) => {
            return (
              <Card
                key={el.name}
                className="w-96 rounded-sm bg-white drop-shadow-sm hover:drop-shadow-xl"
              >
                <CardHeader>
                  <img src={logo} alt="logo" />
                </CardHeader>
                <CardContent>
                  <CardTitle className=" text-lg md:text-xl">
                    {el.name}
                  </CardTitle>
                  <p className="subtitle text-justify text-lg lg:text-xl">
                    {el.desc}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
