import { useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { useWorkflowStore } from "../../store/workflowStore";

export default function ChatInput({
  stackId,
}: {
  stackId: string;
}) {
  const [input, setInput] = useState("");
  const addMessage = useChatStore((s) => s.addMessage);
  const { nodes, edges } = useWorkflowStore();

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // User message
    addMessage({
      role: "user",
      content: userMessage,
    });

    // Execute WORKFLOW
    const res = await fetch(
      "http://localhost:8000/workflow/run",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodes,
          edges,
          user_query: userMessage,
          stack_id: stackId,
        }),
      }
    );

    const data = await res.json();

    // Assistant message (workflow output)
    addMessage({
      role: "assistant",
      content: data.output,
    });
  };

  return (
    <div className="border-t p-3">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Send a message"
          className="flex-1 border rounded-md px-3 py-2 text-sm"
        />
        <button
          onClick={send}
          className="bg-green-600 text-white px-4 rounded-md"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
