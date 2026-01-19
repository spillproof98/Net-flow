import api from "./api"

export const chatService = {
  send(stackId: string, message: string) {
    return api.post(`/chat/${stackId}`, { message })
  },
}
