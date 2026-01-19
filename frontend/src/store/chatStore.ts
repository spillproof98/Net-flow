import { create } from "zustand"

type Message = {
  role: "user" | "assistant"
  content: string
}

type ChatState = {
  messages: Message[]
  addMessage: (m: Message) => void
  clear: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],

  addMessage: (message) =>
    set((s) => ({ messages: [...s.messages, message] })),

  clear: () => set({ messages: [] })
}))
