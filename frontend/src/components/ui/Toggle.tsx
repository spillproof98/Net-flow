export default function Toggle({
  enabled,
  onChange
}: {
  enabled: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-10 h-5 rounded-full p-1 transition ${
        enabled ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`h-3 w-3 bg-white rounded-full transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  )
}
