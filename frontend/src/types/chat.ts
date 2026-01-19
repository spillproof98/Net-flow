export type ChatMessage = {
  id?: string
  role: "user" | "assistant"
  content: string
  createdAt?: string

  // Optional, reference-level
  status?: "loading" | "done" | "error"
  sources?: {
    type: "kb" | "web"
    label: string
  }[]
  nodeTrace?: string[]
}
