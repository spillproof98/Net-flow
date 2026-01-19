import ChatInput from "./ChatInput"
import ChatHistory from "./ChatHistory"

export default function ChatModal({
  stackId,
  onClose,
}: {
  stackId: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      {/* Right-side panel */}
      <div className="w-[420px] h-full bg-white shadow-xl flex flex-col">
        <header className="h-12 px-4 border-b flex justify-between items-center">
          <div className="font-semibold text-sm">
            GenAI Stack Chat
          </div>
          <button onClick={onClose}>✕</button>
        </header>

        <ChatHistory />

        <ChatInput stackId={stackId} />
      </div>
    </div>
  )
}
