import React from 'react'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useGetEventById } from '@/hooks/useFetchEvents'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import UpdateFormDialog from '@/components/events/UpdateFormDialog'
import DeleteDialog from '@/components/events/DeleteDialog'

const More = ({ id }) => {
  const { data } = useGetEventById(id)

  return (
    <div className="relative grid w-full gap-4 lg:grid-cols-2">
      <Card>
        <UpdateFormDialog data={data} />
      </Card>
      <Card>
        <DeleteDialog id={id} />
      </Card>
    </div>
  )
}

export default More
