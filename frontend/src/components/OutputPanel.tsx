import { useWorkflowStore } from "../store/workflowStore";

export default function OutputPanel() {
  const { output } = useWorkflowStore();

  if (!output) return null;

  return (
    <div className="absolute bottom-6 left-6 w-[420px] bg-white border rounded-xl shadow-lg p-4">
      <h4 className="font-semibold mb-2">Output</h4>
      <div className="text-sm text-gray-700 whitespace-pre-wrap">
        {output}
      </div>
    </div>
  );
}
