import api from "./api"

export const stackService = {
  list() {
    return api.get("/stacks")
  },

  create(name: string) {
    return api.post("/stacks", { name })
  },

  get(id: string) {
    return api.get(`/stacks/${id}`)
  },
}
