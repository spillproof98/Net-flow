export default function Dropdown({
  options
}: {
  options: string[]
}) {
  return (
    <select className="w-full border rounded-lg px-3 py-2 text-sm">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  )
}
