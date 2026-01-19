import api from "./api"

export const authService = {
  async signup(email: string, password: string) {
    return api.post("/api/auth/signup", {
      email,
      password,
    })
  },

  async login(email: string, password: string) {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    })

    // store tokens
    localStorage.setItem("token", res.data.access_token)
    localStorage.setItem("refresh_token", res.data.refresh_token)

    return res.data
  },

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
  },
}
