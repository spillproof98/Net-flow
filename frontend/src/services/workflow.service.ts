import api from "./api"
import { Node, Edge } from "reactflow"

export const workflowService = {
  save(stackId: string, nodes: Node[], edges: Edge[]) {
    return api.post(`/workflow/${stackId}/save`, {
      nodes,
      edges,
    })
  },

  run(stackId: string, query: string) {
    return api.post(`/workflow/${stackId}/run`, {
      query,
    })
  },
}
