export default function GradientBg() {
  return (
    <div className="absolute inset-x-0 top-64 lg:left-24 lg:top-72">
      <div
        aria-hidden="true"
        className="mt-20 grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-60 2xl:mx-auto 2xl:max-w-7xl"
      >
        <div className="z-30 h-60 bg-gradient-to-br from-purple-400 to-indigo-300 blur-3xl dark:from-blue-700"></div>
        <div className="h-72 rounded-full bg-gradient-to-r from-green-400 to-lime-300 blur-3xl dark:from-transparent dark:to-indigo-600"></div>
      </div>
    </div>
  )
}
