import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Link } from 'react-router-dom'
import {
  Activity,
  CreditCard,
  DollarSign,
  Plus,
  ShoppingCart,
} from 'lucide-react'
import { useGetAllFinances } from '@/hooks/useFetchFinance'
import { format } from 'date-fns'

const Transactions = () => {
  const { data, isSuccess } = useGetAllFinances()

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <Button size="sm" className="ml-auto rounded-full px-3 py-5" asChild>
          <Link to="/finances/new">
            <Plus size={18} />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="max-h-[28rem] overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden xl:table-cell">Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isSuccess && data.length != 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Button
                      className="h-12 w-12 rounded-full"
                      variant={item.type == 'EXPENSE' ? 'destructive' : ''}
                    >
                      {(() => {
                        switch (item.type) {
                          case 'INCOME':
                            return <DollarSign />
                          case 'EXPENSE':
                            return <ShoppingCart />
                          case 'SAVING':
                            return <CreditCard />
                          case 'INVESTMENT':
                            return <Activity />
                          default:
                            return null
                        }
                      })()}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                    <div className="line-clamp-1 max-w-32 text-sm text-muted-foreground md:inline lg:line-clamp-2">
                      {item.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge className="text-xs" variant="outline">
                      {format(new Date(item.dateTransac), 'PPp')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('fil-PH', {
                      style: 'currency',
                      currency: 'PHP',
                      maximumFractionDigits: 2,
                    }).format(parseInt(item.amount))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Transactions Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Transactions
