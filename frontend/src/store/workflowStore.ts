import { create } from "zustand";
import {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
} from "reactflow";

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;

  output: string | null;
  setOutput: (output: string | null) => void;

  setNodes: (
    nodes: Node[] | ((nodes: Node[]) => Node[])
  ) => void;
  setSelectedNode: (node: Node | null) => void;

  


  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  // ✅ ADD THESE
  output: null,
  setOutput: (output) => set({ output }),

  setNodes: (updater) =>
    set((state) => ({
      nodes:
        typeof updater === "function"
          ? updater(state.nodes)
          : updater,
    })),

  setSelectedNode: (node) =>
    set({ selectedNode: node }),

  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(
        changes,
        get().nodes
      ),
    }),

  onEdgesChange: (changes) =>
    set({
      edges: applyEdgeChanges(
        changes,
        get().edges
      ),
    }),

  onConnect: (connection) =>
    set({
      edges: addEdge(
        connection,
        get().edges
      ),
    }),
}));
