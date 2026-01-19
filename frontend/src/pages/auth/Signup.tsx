import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authService } from "../../services/auth.service"

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Email and password required")
      return
    }

    try {
    setLoading(true)
      await authService.signup(email, password)

      setSuccess(true)
      setTimeout(() => navigate("/login"), 1200)
    } catch (err: any) {
      alert(err.response?.data?.detail || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-card rounded-xl p-8 w-[380px]">
        <div className="text-center mb-6">
          <img src="/logo-full.png" className="mx-auto h-7 mb-2" />
          <h2 className="text-lg font-semibold">Create your account</h2>
        </div>

        {success ? (
          <div className="text-center text-green-600">
            ✅ Account created<br />
              Redirecting to login…
          </div>
        ) : (
          <>
            <input
              type="email"
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
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </>
        )}

        <p className="text-sm text-center mt-4">
            Already have an account?{" "}
          <Link to="/login" className="font-semibold">
              Login
            </Link>
          </p>
      </div>
    </div>
  )
}
