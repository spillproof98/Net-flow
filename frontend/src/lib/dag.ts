import { Edge, Node } from "reactflow"

export function topoSort(nodes: Node[], edges: Edge[]) {
  const graph: Record<string, string[]> = {}
  const inDegree: Record<string, number> = {}

  nodes.forEach((n) => {
    graph[n.id] = []
    inDegree[n.id] = 0
  })

  edges.forEach((e) => {
    graph[e.source].push(e.target)
    inDegree[e.target]++
  })

  const queue: string[] = []
  Object.keys(inDegree).forEach((id) => {
    if (inDegree[id] === 0) queue.push(id)
  })

  const order: string[] = []
  while (queue.length) {
    const id = queue.shift()!
    order.push(id)

    for (const next of graph[id]) {
      inDegree[next]--
      if (inDegree[next] === 0) queue.push(next)
    }
  }

  if (order.length !== nodes.length) {
    throw new Error("Workflow contains a cycle")
  }

  return order
}
