import React from 'react'
import { Clock8, MapPin, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../ui/button'

const MEMBERS = [
  {
    name: 'Mark Eugene Laysa',
  },
  {
    name: 'Vhince Cedrick Afroilan',
  },
  {
    name: 'Jovan Dela Cerna',
  },
]

const EventGuests = ({ id }) => {
  return (
    <div className="relative ml-auto">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="relative flex flex-col items-center justify-center gap-4 p-4">
          <Button className="h-20 w-20 rounded-full" variant="outline">
            <Plus size={40} />
          </Button>

          <p className="text-base">Invite Guests</p>
        </Card>
        {MEMBERS.map((item) => (
          <Card
            key={item.name}
            className="relative flex flex-col items-center gap-4 p-4"
          >
            <img
              src="https://github.com/shadcn.png"
              className="w-full rounded-lg lg:h-40"
            />
            <p className="text-center text-base font-bold">{item.name}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default EventGuests
