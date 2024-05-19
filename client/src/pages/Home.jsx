import { useState } from 'react'
import eventLogo from '@/assets/event-image.png'
import heroLogo from '@/assets/hero-image.png'
import {
  FaEnvelopeCircleCheck,
  FaMoneyBills,
  FaTimeline,
  FaCalendarDays,
} from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import FeatureCard from '@/components/FeatureCard'
import FAQ from '@/components/ui/FAQ'
import Footer from '@/components/Footer'
import { Link } from 'react-router-dom'
import GradientBg from '@/components/ui/GradientBg'

const features = [
  {
    name: 'Finance Tracker and Analysis',
    desc: 'Suggest date ideas and venues that align with the specified budget.',
    icon: <FaMoneyBills />,
  },
  {
    name: 'Guest Email Invitation',
    desc: 'Invite guests in a modernized manner. Users can effortlessly manage RSVPs.',
    icon: <FaEnvelopeCircleCheck />,
  },
  {
    name: 'Timeline and Task Management',
    desc: 'Assist in planning the timeline for the date, from making reservations to organizing surprise elements.',
    icon: <FaTimeline />,
  },
  {
    name: 'Calendar Integration',
    desc: 'Users can schedule tasks, set reminders, and synchronize event details with their personal calendars.',
    icon: <FaCalendarDays />,
  },
]

const faqs = [
  {
    id: 1,
    question: 'What is EventEase?',
    answer:
      'EventEase simplifies event planning with customizable templates and collaboration tools, making tasks like guest management and budget tracking efficient.',
  },
  {
    id: 2,
    question: 'Is it free?',
    answer:
      'Yes, it will be free for the moment, because the server can accomodate users up to 100.',
  },
  {
    id: 3,
    question: 'How can EventEase benefit me?',
    answer:
      'EventEase saves time, increases efficiency, and improves event outcomes through intuitive features, empowering seamless event management and execution.',
  },
]

function Home() {
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleAccordion = (index) => {
    setActiveFaq((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <>
      <div className="relative overflow-hidden">
        <GradientBg />
        <section
          className="mx-auto mt-4 max-w-6xl px-6 md:px-12 lg:px-6 xl:px-0"
          id="home"
        >
          <div className="relative ml-auto pt-40 xl:pt-36">
            <div className="gap-12 md:flex md:items-center">
              <div className="text-center sm:px-12 md:w-2/3 md:px-0 md:text-left lg:w-1/2">
                <h1 className="text-5xl font-black dark:text-white md:text-6xl lg:text-6xl xl:text-7xl">
                  Making events{' '}
                  <b className="brand leading-relaxed text-primary">‘SIMPLE</b>{' '}
                  and <b className="brand text-primary">EFFORTLESS‘</b>
                </h1>
                <div>
                  <p className="mt-8 text-lg text-gray-700 dark:text-gray-100">
                    From birthdays to weddings, effortlessly plan and manage
                    every detail of your event with ease and precision.
                  </p>
                  <div className="mx-auto mt-12 flex w-72 gap-4  sm:gap-6 md:w-auto md:justify-start">
                    <Button
                      className="flex-1 rounded-full bg-green-700 transition-all duration-300 ease-linear"
                      asChild
                    >
                      <Link to="/signin">Get started</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full transition-all duration-300 ease-linear"
                      asChild
                    >
                      <Link to="/#features">Learn more</Link>
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
        </section>

        <section className="relative pt-32 md:pt-44" id="features">
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
                <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8 py-12 lg:py-8">
                  <img
                    src={eventLogo}
                    className="-mt-16 w-96 md:w-full lg:-mt-20"
                    loading="lazy"
                  />
                  <div className="mx-auto -mt-14 px-4 text-center lg:px-8">
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
                  {features.map((item, index) => {
                    return <FeatureCard key={index} props={item} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden pt-32 md:pt-44"
          id="aboutUs"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-6 xl:px-0">
            <div className="mx-auto md:w-3/5">
              <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                More about us
              </h2>
              <p className="mt-4 text-center text-[17px] text-gray-600 dark:text-gray-300 md:text-xl">
                Event Ease is developed by Synchro Fission, a startup duo
                passionate in building innovative solutions.
              </p>
            </div>
            <div className="mt-12 md:mt-16"></div>
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-6 xl:px-0">
              <div className="mt-12 flex flex-col gap-12 md:mt-24 lg:flex-row">
                <div className="text-center lg:w-5/12 lg:pl-12 lg:text-left">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white md:text-3xl lg:text-4xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-4 text-[18px] text-gray-600 dark:text-gray-300">
                    Learn more about Event Ease
                  </p>
                </div>
                <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 lg:w-7/12">
                  {faqs.map((item, index) => (
                    <FAQ
                      key={index}
                      question={item.question}
                      answer={item.answer}
                      isActive={index === activeFaq}
                      toggleAccordion={() => toggleAccordion(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Home
