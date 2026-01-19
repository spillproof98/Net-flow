export type User = {
  id: string
  email: string
}

export type AuthResponse = {
  access_token: string
  user: User
}
