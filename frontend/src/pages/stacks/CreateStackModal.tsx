import { useState } from "react"
import { useStackStore } from "../../store/stackStore"

export default function CreateStackModal({
  onClose,
}: {
  onClose: () => void
}) {
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const createStack = useStackStore((s) => s.createStack)

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Stack name is required")
      return
    }

    try {
      setSubmitting(true)
      await createStack(name)
      onClose()
    } catch (e) {
      alert("Failed to create stack")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="font-semibold mb-2">Create New Stack</h2>
        <p className="text-sm text-gray-500 mb-4">
          Start building your generative AI apps
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Stack name"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <button
          onClick={handleCreate}
          disabled={submitting}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full disabled:opacity-60"
        >
          {submitting ? "Creating..." : "+ New Stack"}
        </button>

        <button
          onClick={onClose}
          className="block mt-4 text-sm text-gray-500 mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
