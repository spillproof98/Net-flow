import { useState } from "react"
import Canvas from "../../components/workflow/Canvas"
import ConfigPanel from "../../components/workflow/ConfigPanel"
import ChatModal from "../../components/chat/ChatModal"
import { useChatStore } from "../../store/chatStore"

export default function WorkflowBuilder() {
  const [chatOpen, setChatOpen] = useState(false)
  const clearChat = useChatStore((s) => s.clear)

  const runStack = () => {
    clearChat()
    setChatOpen(true)
  }

  return (
    <>
      <div className="flex h-full">
        <Canvas stackId="temp" onRun={runStack} />
        <ConfigPanel />
      </div>

      {chatOpen && (
        <ChatModal
          stackId="temp"
          onClose={() => setChatOpen(false)}
        />
      )}
    </>
  )
}
