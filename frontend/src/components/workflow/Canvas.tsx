import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlowInstance,
} from "reactflow";

import { useCallback, useRef } from "react";
import { useWorkflowStore } from "../../store/workflowStore";
import { nanoid } from "nanoid";

import LLMNode from "./nodes/LLMNode";
import UserQueryNode from "./nodes/UserQueryNode";
import OutputNode from "./nodes/OutputNode";
import KnowledgeBaseNode from "./nodes/KnowledgeBaseNode";
import WebSearchNode from "./nodes/WebSearchNode";

const nodeTypes = {
  userQuery: UserQueryNode,
  knowledgeBase: KnowledgeBaseNode,
  webSearch: WebSearchNode,
  llm: LLMNode,
  output: OutputNode,
};

type CanvasProps = {
  stackId: string;
  onRun: () => void;
};

export default function Canvas({ stackId, onRun }: CanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const rfInstance = useRef<ReactFlowInstance | null>(null);

  const {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
  } = useWorkflowStore();

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !rfInstance.current) return;

      const bounds = reactFlowWrapper.current!.getBoundingClientRect();

      const position = rfInstance.current.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label: type },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  return (
    <div
      ref={reactFlowWrapper}
      className="relative w-full h-full"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={(instance) => (rfInstance.current = instance)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node)}
        panOnDrag
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        selectionOnDrag
        nodesDraggable
        nodesConnectable
        elementsSelectable
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#e5e7eb"
        />

        <Controls />
      </ReactFlow>

      <button
        onClick={onRun}
        className="absolute bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg"
      >
        ▶
      </button>
    </div>
  );
}
