import Header from '@/components/Header'

function Dashboard() {
  return (
    <>
      <Header />
      <div className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-64 lg:left-24 lg:top-72">
          <div
            aria-hidden="true"
            className="grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-60 2xl:mx-auto 2xl:max-w-7xl"
          >
            <div className="h-60 bg-gradient-to-br from-purple-400 to-indigo-300 blur-3xl dark:from-blue-700"></div>
            <div className="h-72 rounded-full bg-gradient-to-r from-green-400 to-lime-300 blur-3xl dark:from-transparent dark:to-indigo-600"></div>
          </div>
        </div>

        <section
          className="mx-auto mt-4 max-w-7xl px-6 md:px-12 lg:px-6 xl:px-0"
          id="home"
        >
          <div className="relative ml-auto pt-40 xl:pt-36">
            <div className="gap-12 md:flex md:items-center">
              <div className="p-12 text-center md:w-2/3 md:px-0 md:text-left lg:w-1/2">
                <h1 className="text-5xl font-black dark:text-white md:text-6xl lg:text-6xl xl:text-7xl">
                  Dashboard
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Dashboard
