import { Edge, Node } from "reactflow"

export function validateWorkflow(nodes: Node[], edges: Edge[]) {
  if (!nodes.length) return "Workflow is empty"

  const hasInput = nodes.some(n => n.type === "input")
  const hasOutput = nodes.some(n => n.type === "output")

  if (!hasInput) return "Missing User Query node"
  if (!hasOutput) return "Missing Output node"

  return null
}
