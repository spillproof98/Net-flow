import { Routes, Route, Navigate } from "react-router-dom"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
import StacksPage from "../pages/stacks/StacksPage"
import StackEditor from "../pages/builder/StackEditor"
import { AuthGuard } from "./auth.guard"
import AppLayout from "../components/layout/AppLayout"
import StacksLayout from "../components/layout/StacksLayout"

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* My Stacks (no sidebar) */}
      <Route
        element={
          <AuthGuard>
            <StacksLayout />
          </AuthGuard>
        }
      >
        <Route path="/stacks" element={<StacksPage />} />
      </Route>

      {/* Stack Editor (with sidebar) */}
      <Route
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route path="/stacks/:id" element={<StackEditor />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/stacks" replace />} />
    </Routes>
  )
}
