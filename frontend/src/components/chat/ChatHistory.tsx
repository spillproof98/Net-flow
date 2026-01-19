import ChatMessage from "./ChatMessage"
import { useChatStore } from "../../store/chatStore"

export default function ChatHistory() {
  const messages = useChatStore((s) => s.messages)

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.map((m, index) => (
        <ChatMessage
          key={index}
          role={m.role}
          content={m.content}
        />
      ))}
    </div>
  )
}
