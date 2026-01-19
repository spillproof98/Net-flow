import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function StacksLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar showSave={false} />
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
