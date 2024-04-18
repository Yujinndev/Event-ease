import Header from '@/components/Header'
import GradientBg from '@/components/ui/GradientBg'

function Finances() {
  return (
    <>
      <Header />
      <div className="relative overflow-hidden">
        <GradientBg />

        <section className="mx-auto mt-4 min-h-[90vh] max-w-screen-2xl px-8 md:px-14 xl:px-20">
          <div className="relative ml-auto pt-40 xl:pt-36">
            <div className="gap-12 md:flex md:items-center">
              <div className="p-12 text-center md:w-2/3 md:px-0 md:text-left lg:w-1/2">
                <h1 className="text-5xl font-black dark:text-white md:text-6xl lg:text-6xl xl:text-7xl">
                  Finances
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Finances
