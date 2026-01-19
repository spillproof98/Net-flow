import { Handle, Position } from "reactflow";

export default function LLMNode({ data }: any) {
  return (
    <div className="react-flow__node-default bg-white shadow-card rounded-xl p-4 w-64 pointer-events-auto">
      <h4 className="font-semibold mb-1">
        {data.label || "LLM (OpenAI)"}
      </h4>

      <div className="text-xs text-gray-500 mb-2">
        Model: {data.model || "GPT-4o Mini"}
      </div>

      <div className="text-xs text-gray-500">
        Temp: {data.temperature ?? 0.7}
      </div>

      {/* INPUT */}
      <Handle
        id="context"
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-400"
      />

      {/* OUTPUT */}
      <Handle
        id="output"
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-400"
      />
    </div>
  );
}
