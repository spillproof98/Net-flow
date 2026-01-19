import { Handle, Position, NodeToolbar } from "reactflow";

export default function UserQueryNode({ data, selected }: any) {
  return (
    <div
      className={`react-flow__node-default rounded-xl p-4 w-64 pointer-events-auto border transition
        ${selected
          ? "border-green-500 shadow-lg bg-white"
          : "border-gray-200 shadow-card bg-white"}
      `}
    >
      <NodeToolbar isVisible={selected} position={Position.Top}>
        <div className="text-xs bg-white border rounded px-2 py-1 shadow">
          User Query
        </div>
      </NodeToolbar>

      <h4 className="font-semibold mb-1">User Query</h4>

      <p className="text-xs text-gray-500">
        User input comes from chat
      </p>

      <Handle
        id="query"
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-gray-400"
      />
    </div>
  );
}
