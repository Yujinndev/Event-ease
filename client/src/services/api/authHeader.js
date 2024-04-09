export default function authHeader() {
  const token = localStorage.getItem('_tkn')

  if (token) {
    return { Authorization: `Bearer ${token}` }
  } else {
    return {}
  }
}
