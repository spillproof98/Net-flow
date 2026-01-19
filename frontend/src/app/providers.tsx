import { ReactNode } from "react"
import { ReactFlowProvider } from "reactflow"

export function AppProviders({ children }: { children: ReactNode }) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>
}
