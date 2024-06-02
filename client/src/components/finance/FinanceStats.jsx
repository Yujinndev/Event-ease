import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const FinanceStats = ({ stat }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold text-primary', stat.className)}>
          {stat.amount}
        </div>
        <p className="mt-[2px] text-xs text-muted-foreground">{stat.status}</p>
      </CardContent>
    </Card>
  )
}

export default FinanceStats
