import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

const getEvents = async () => {
  try {
    const response = await axios.get(`/event/all`)
    return response.data.events
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`)
  }
}

const useGetAllEvents = () => {
  const queryResult = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents(),
  })

  return queryResult
}

const getEventById = async (id) => {
  try {
    const response = await axios.get(`/event/details/${id}`)
    return response.data.event
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`)
  }
}

const useGetEventById = (id) => {
  const queryResult = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id),
  })

  return queryResult
}

export { useGetAllEvents, useGetEventById }
