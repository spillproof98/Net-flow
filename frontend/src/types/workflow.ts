import { Node, Edge } from "reactflow"

export type Workflow = {
  id: string
  stackId: string
  nodes: Node[]
  edges: Edge[]
  createdAt: string
}
