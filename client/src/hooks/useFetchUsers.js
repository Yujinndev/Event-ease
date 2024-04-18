import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

const getUserDetails = async (id) => {
  try {
    const response = await axios.get(`/user/details/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Error fetching: ${error.message}`)
  }
}

const useUserDetails = (id) => {
  const queryResult = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserDetails(id),
    enabled: !!id,
  })

  return queryResult
}

export default useUserDetails
