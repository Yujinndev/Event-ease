import React, { useEffect, useState } from 'react'
import { Clock8, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import UpdateFormDialog from '@/components/events/UpdateFormDialog'
import { useGetEventById } from '@/hooks/useFetchEvents'

const EventOverview = ({ id }) => {
  const { data } = useGetEventById(id)
  const convertDate = new Date(data.date)
  const formattedDate = format(convertDate, 'PPp')

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

          <Card>
            <CardContent className="flex flex-col gap-2 p-8">
              <h1 className="text-xl font-black">Timeline:</h1>
              <div className="ms-6 flex items-center gap-4 font-mono text-base lg:text-lg">
                <Clock8 size={24} className="flex-shrink-0" />
                <p className="line-clamp-3">{formattedDate}</p>
                <Badge
                  variant={data.status === 'UPCOMING' ? '' : 'destructive'}
                  className="w-max"
                >
                  {data.status}
                </Badge>
              </div>
              <div className="ms-6 flex items-center gap-4 font-mono text-base lg:text-lg">
                <MapPin size={24} className="flex-shrink-0" />
                <p className="line-clamp-3">{data.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-2 p-8">
            <div>
              <h1 className="text-xl font-black">Description:</h1>
              <p className="ms-8 text-lg lg:text-justify lg:text-xl">
                {data.desc}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EventOverview
