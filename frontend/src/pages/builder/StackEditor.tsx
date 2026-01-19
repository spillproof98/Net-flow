import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Canvas from "../../components/workflow/Canvas"
import ConfigPanel from "../../components/workflow/ConfigPanel"
import ChatModal from "../../components/chat/ChatModal"
import { useChatStore } from "../../store/chatStore"
import { useStackStore } from "../../store/stackStore"

export default function StackEditor() {
  const { id } = useParams()
  const [chatOpen, setChatOpen] = useState(false)

  const clearChat = useChatStore((s) => s.clear)
  const stacks = useStackStore((s) => s.stacks)

  // ✅ LOAD STACK
  useEffect(() => {
    if (!id) return

    const stack = stacks.find((s) => s.id === id)
    if (!stack) {
      console.warn("Stack not found:", id)
    } else {
      console.log("Editing stack:", stack)
      // later: hydrate Canvas + ConfigPanel
    }
  }, [id, stacks])

  const runStackOnce = () => {
    console.log("Run stack without chat", id)
  }

  const openChat = () => {
    clearChat()
    setChatOpen(true)
  }

  return (
    <>
      <div className="flex h-full">
        <Canvas stackId={id!} onRun={runStackOnce} />
        <ConfigPanel />
      </div>

      <button
        onClick={openChat}
        className="fixed bottom-6 right-6 bg-black text-white px-5 py-2 rounded-full"
      >
        Chat
      </button>

      {chatOpen && (
        <ChatModal
          stackId={id!}
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  )
}
