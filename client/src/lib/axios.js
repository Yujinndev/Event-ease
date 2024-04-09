import authHeader from '@/services/api/authHeader'
import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8080',
  headers: authHeader(),
})
