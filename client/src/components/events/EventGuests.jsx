import React from 'react'
import { Clock8, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

const EventGuests = ({ data }) => {
  const convertDate = new Date(data.date)
  const formattedDate = format(convertDate, 'MMMM d, yyyy - HH:mm')

  return (
    <div className="relative ml-auto">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Card className="relative p-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSZHgjV8ckMtH2AEwV7Q63QFOFZoVDKDy24MVx_9NVPA&s"
              alt="Example Image"
              className="w-full rounded-lg"
            />

            <CardContent className="absolute -mt-20 flex items-center gap-2">
              <div className="flex flex-col items-center justify-center rounded-sm border bg-white px-4 py-2">
                <p className="-mb-1 text-sm">{format(convertDate, 'MMM')}</p>
                <p className="mb-0 text-xl font-black">
                  {format(convertDate, 'dd')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EventGuests
