import { useEffect, useState } from "react"
import StackCard from "./StackCard"
import CreateStackModal from "./CreateStackModal"
import { useStackStore } from "../../store/stackStore"

export default function StacksPage() {
  const [open, setOpen] = useState(false)
  const stacks = useStackStore((s) => s.stacks)
  const fetchStacks = useStackStore((s) => s.fetchStacks)

  useEffect(() => {
    fetchStacks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">My Stacks</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + New Stack
        </button>
      </div>

      {stacks.length === 0 ? (
        <div className="text-gray-500 text-sm">
          No stacks yet. Create your first one 🚀
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {stacks.map((stack) => (
            <StackCard
              key={stack.id}
              id={stack.id}
              name={stack.name}
              createdAt={stack.createdAt}
            />
          ))}
        </div>
      )}

      {open && <CreateStackModal onClose={() => setOpen(false)} />}
    </div>
  );
}
