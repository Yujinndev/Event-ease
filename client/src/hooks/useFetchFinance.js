import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

const getFinances = async () => {
  try {
    const response = await axios.get(`/finance/all`)
    return response.data.transactions
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`)
  }
}

const useGetAllFinances = () => {
  const queryResult = useQuery({
    queryKey: ['finances'],
    queryFn: () => getFinances(),
  })

  return queryResult
}

export { useGetAllFinances }
