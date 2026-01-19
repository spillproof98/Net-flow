import { Handle, Position } from "reactflow";

export default function OutputNode() {
  return (
    <div className="react-flow__node-default bg-white shadow-card rounded-xl p-4 w-56 pointer-events-auto">
      <h4 className="font-semibold mb-2">Output</h4>

      <p className="text-sm text-gray-500">
        Output will be generated here
      </p>

      {/* INPUT HANDLE */}
      <Handle
        id="output"
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-gray-400"
      />
    </div>
  );
}
