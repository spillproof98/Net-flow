import { useWorkflowStore } from "../../store/workflowStore";

export default function ConfigPanel() {
  const { setNodes, selectedNode } = useWorkflowStore();

  if (!selectedNode) {
    return (
      <aside className="w-80 bg-white border-l p-4 text-sm text-gray-500">
        Select a node to configure
      </aside>
    );
  }

  const updateData = (key: string, value: any) => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === selectedNode.id
          ? {
              ...n,
              data: {
                ...n.data,
                [key]: value,
              },
            }
          : n
      )
    );
  };

  if (selectedNode.type !== "llm") {
    return (
      <aside className="w-80 bg-white border-l p-4 text-sm text-gray-500">
        No configuration for this node
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white border-l p-4">
      <h3 className="font-semibold mb-4">LLM Configuration</h3>

      <label className="text-sm">Model</label>
      <select
        className="w-full border rounded-md px-3 py-2 mb-3"
        value={selectedNode.data?.model || "gpt-4o-mini"}
        onChange={(e) => updateData("model", e.target.value)}
      >
        <option value="gpt-4o-mini">GPT-4o Mini</option>
        <option value="gpt-4">GPT-4</option>
      </select>

      <label className="text-sm">Temperature</label>
      <input
        type="number"
        step="0.1"
        min={0}
        max={2}
        className="w-full border rounded-md px-3 py-2 mb-3"
        value={selectedNode.data?.temperature ?? 0.75}
        onChange={(e) =>
          updateData("temperature", Number(e.target.value))
        }
      />

      <label className="text-sm">Prompt</label>
      <textarea
        rows={5}
        className="w-full border rounded-md px-3 py-2"
        value={
          selectedNode.data?.prompt ||
          "You are a helpful assistant.\n\nCONTEXT: {context}\nUser Query: {query}"
        }
        onChange={(e) => updateData("prompt", e.target.value)}
      />
    </aside>
  );
}
