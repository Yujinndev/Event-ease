import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from './button'

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}) => {
  const [active, setActive] = useState(propTabs[0])
  const [tabs, setTabs] = useState(propTabs)

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  return (
    <div className="relative -mt-5">
      <div
        className={cn(
          'no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start gap-2 overflow-auto [perspective:1000px] sm:overflow-visible',
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <Button
            key={tab.title}
            variant="link"
            onClick={() => {
              moveSelectedTabToTop(idx)
            }}
            className={cn('relative rounded-full px-4', tabClassName)}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <span
              className={cn('relative block text-black dark:text-white', {
                'text-primary': active.value === tab.value,
              })}
            >
              {tab.title}
            </span>
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn(
                  'absolute inset-x-0 -bottom-[3px] z-50 h-[6px] rounded-full bg-primary dark:bg-zinc-800',
                  activeTabClassName
                )}
              />
            )}
          </Button>
        ))}
      </div>
      <div className="h-[1px] w-full rounded-full bg-gray-400" />

      <div className="relative my-6 w-full">{active.content}</div>
    </div>
  )
}
