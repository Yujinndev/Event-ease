import { create } from 'zustand'

const useAuthStore = create((set) => ({
  auth: JSON.parse(localStorage.getItem('user')) || null,
  login: (user) => set({ auth: user }),
  logout: () => set({ auth: null }),
}))

export default useAuthStore
