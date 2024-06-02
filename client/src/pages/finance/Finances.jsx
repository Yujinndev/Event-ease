import { Activity, CreditCard, DollarSign, ShoppingCart } from 'lucide-react'
import FinanceStats from '@/components/finance/FinanceStats'
import Manifestations from '@/components/finance/Manifestations'
import Transactions from '@/components/finance/Transactions'
import { useMemo } from 'react'
import { useGetAllFinances } from '@/hooks/useFetchFinance'

function Finances() {
  const { data, isSuccess } = useGetAllFinances()

  // Calculate total amounts using useMemo
  const { totalIncome, totalExpense, totalSavings } = useMemo(() => {
    if (!isSuccess || !data) {
      return {
        totalIncome: 0,
        totalExpense: 0,
        totalSavings: 0,
      }
    }

    return data.reduce(
      (totals, finance) => {
        const amount = parseFloat(finance.amount)
        const { type } = finance

        switch (type) {
          case 'INCOME':
            totals.totalIncome += amount
            break
          case 'EXPENSE':
            totals.totalExpense += amount
            break
          case 'SAVING':
            totals.totalSavings += amount
            break
          default:
            break
        }

        return totals
      },
      {
        totalIncome: 0,
        totalExpense: 0,
        totalSavings: 0,
      }
    )
  }, [data, isSuccess])

  const currentBal = totalIncome - (totalExpense + totalSavings)

  const STATS = [
    {
      title: 'Current Balance',
      amount: `Php ${currentBal.toFixed(2)}`,
      status: '+20.1% from last month',
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: 'Total Income',
      amount: `Php ${totalIncome.toFixed(2)}`,
      status: '+201 since last hour',
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: 'Total Spendings',
      amount: `Php ${totalExpense.toFixed(2)}`,
      status: '+180.1% from last month',
      className: 'text-destructive',
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: 'Savings',
      amount: `Php ${totalSavings.toFixed(2)}`,
      status: '+19% from last month',
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  return (
    <div className="relative overflow-hidden bg-grid-black/[0.035]">
      <section className="mx-auto my-4 min-h-[98dvh] max-w-screen-2xl px-8 md:px-14 lg:mb-0 xl:px-20">
        <div className="relative ml-auto pt-20">
          <div className="pb-8 md:w-2/3 md:py-6 lg:w-1/2">
            <h1 className="text-3xl font-black dark:text-white">
              Track Your Financial Health
            </h1>
          </div>

          <div className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {STATS.map((stat, idx) => (
                <FinanceStats key={idx} stat={stat} />
              ))}
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
              <Transactions />
              {/* <Manifestations /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Finances
