import { create } from "zustand"

type AuthState = {
  token: string | null
  user: { email: string } | null
  login: (token: string, user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,

  login: (token, user) => {
    localStorage.setItem("token", token)
    set({ token, user })
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ token: null, user: null })
  }
}))
