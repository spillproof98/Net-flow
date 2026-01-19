const components = [
  { type: "userQuery", label: "User Query" },
  { type: "llm", label: "LLM (OpenAI)" },
  { type: "knowledgeBase", label: "Knowledge Base" },
  { type: "webSearch", label: "Web Search" },
  { type: "output", label: "Output" },
]

export default function Sidebar() {
  const onDragStart = (
    event: React.DragEvent,
    nodeType: string
  ) => {
    event.dataTransfer.setData(
      "application/reactflow",
      nodeType
    )
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h4 className="text-sm font-semibold mb-2">Components</h4>

      <div className="space-y-2">
        {components.map((c) => (
          <div
            key={c.type}
            draggable
            onDragStart={(e) => onDragStart(e, c.type)}
            className="border rounded-md px-3 py-2 text-sm cursor-move hover:bg-gray-50"
          >
            {c.label}
          </div>
        ))}
      </div>
    </aside>
  )
}
