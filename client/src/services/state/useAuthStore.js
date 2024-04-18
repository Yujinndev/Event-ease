import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: localStorage.getItem('user') || null,
  login: (userdata) => {
    set({ user: userdata })
    localStorage.setItem('user', userdata)
  },
  logout: () => {
    set({ user: null })
    localStorage.removeItem('user')
    localStorage.removeItem('_tkn')
    localStorage.removeItem('isFirstVisit')
  },
}))

export default useAuthStore
