import { Handle, Position } from "reactflow";

export default function KnowledgeBaseNode({ data, selected }: any) {
  return (
    <div
      className={`react-flow__node-default rounded-xl p-4 w-64 pointer-events-auto border transition
        ${
          selected
            ? "border-green-500 shadow-lg bg-white"
            : "border-gray-200 shadow-card bg-white"
        }
      `}
    >
      <h4 className="font-semibold mb-1">Knowledge Base</h4>

      <div className="text-xs text-gray-500">
        {data?.filename
          ? `File: ${data.filename}`
          : "No file uploaded"}
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Embedding: {data?.embeddingModel || "text-embedding-3-small"}
      </div>

      {/* INPUT */}
      <Handle
        id="query"
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-400"
      />

      {/* OUTPUT */}
      <Handle
        id="context"
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-400"
      />
    </div>
  );
}
