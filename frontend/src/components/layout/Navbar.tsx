import { useNavigate } from "react-router-dom"

export default function Navbar({
  showSave = false,
}: {
  showSave?: boolean
}) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    navigate("/login")
  }

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      {/* CLICKABLE LOGO */}
      <button
        onClick={() => navigate("/stacks")}
        className="flex items-center gap-2 hover:opacity-80"
        title="Back to stacks"
      >
        <img src="/logo-full.png" className="h-6" />
        <span className="font-semibold">NF</span>
      </button>

      <div className="flex items-center gap-4">
        {showSave && (
          <button className="border px-3 py-1 rounded-md text-sm">
            Save
          </button>
        )}

        <button
          onClick={logout}
          className="h-8 w-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm"
          title="Logout"
        >
          S
        </button>
      </div>
    </header>
  )
}
