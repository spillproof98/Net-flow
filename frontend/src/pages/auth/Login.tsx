import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "../../services/auth.service"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required")
      return
    }

    try {
      setLoading(true)
      await authService.login(email, password)
      navigate("/stacks")
    } catch (err: any) {
      alert(err.response?.data?.detail || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-card rounded-xl p-8 w-[380px]">
        <div className="text-center mb-6">
          <img src="/logo-full.png" className="mx-auto h-6 mb-2" />
        </div>

        <input
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}
