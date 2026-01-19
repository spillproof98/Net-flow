import { useNavigate } from "react-router-dom"
import { useStackStore } from "../../store/stackStore"

type StackCardProps = {
  id: string
  name: string
  createdAt?: string
}

export default function StackCard({
  id,
  name,
  createdAt,
}: StackCardProps) {
  const navigate = useNavigate()
  const deleteStack = useStackStore((s) => s.deleteStack)
  const updateStack = useStackStore((s) => s.updateStack)

  const handleEdit = async () => {
    const newName = prompt("Rename stack", name)
    if (!newName || newName === name) return
    await updateStack(id, newName)
  }

  const handleDelete = async () => {
    if (!confirm("Delete this stack?")) return
    await deleteStack(id)
  }

  return (
    <div className="bg-white shadow-card rounded-xl p-5 flex flex-col justify-between relative">
      {/* ACTIONS */}
      <div className="absolute top-3 right-3 flex gap-2 text-xs">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleEdit()
          }}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-1">{name}</h3>

        <p className="text-sm text-gray-500">
          {createdAt
            ? `Created ${new Date(createdAt).toLocaleDateString()}`
            : "Custom workflow stack"}
        </p>
      </div>

      <button
        onClick={() => navigate(`/stacks/${id}`)}
        className="mt-4 border px-3 py-1 rounded-md text-sm hover:bg-gray-50"
      >
        Open Stack ↗
      </button>
    </div>
  )
}
