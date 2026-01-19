import { create } from "zustand"
import api from "../services/api"

type StackApi = {
  id: string
  name: string
  created_at: string
}

export type Stack = {
  id: string
  name: string
  createdAt: string
}

type StackState = {
  stacks: Stack[]
  loading: boolean

  fetchStacks: () => Promise<void>
  createStack: (name: string) => Promise<void>
  updateStack: (id: string, name: string) => Promise<void>
  deleteStack: (id: string) => Promise<void>
}

export const useStackStore = create<StackState>((set) => ({
  stacks: [],
  loading: false,

  fetchStacks: async () => {
    set({ loading: true })

    const res = await api.get<StackApi[]>("stacks/")

    set({
      stacks: res.data.map((s) => ({
        id: s.id,
        name: s.name,
        createdAt: s.created_at,
      })),
      loading: false,
    })
  },

  createStack: async (name: string) => {
    const res = await api.post<StackApi>("stacks/", { name })

    set((state) => ({
      stacks: [
        {
          id: res.data.id,
          name: res.data.name,
          createdAt: res.data.created_at,
        },
        ...state.stacks,
      ],
    }))
  },

  updateStack: async (id: string, name: string) => {
    const res = await api.put<StackApi>(`stacks/${id}/`, { name })

    set((state) => ({
      stacks: state.stacks.map((s) =>
        s.id === id
          ? {
              id: res.data.id,
              name: res.data.name,
              createdAt: res.data.created_at,
            }
          : s
      ),
    }))
  },

  deleteStack: async (id: string) => {
    await api.delete(`stacks/${id}/`)

    set((state) => ({
      stacks: state.stacks.filter((s) => s.id !== id),
    }))
  },
}))
