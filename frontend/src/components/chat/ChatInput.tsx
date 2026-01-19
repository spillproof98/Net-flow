import { useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { useWorkflowStore } from "../../store/workflowStore";
import api from "../../services/api";   // ✅ USE AXIOS

export default function ChatInput({ stackId }: { stackId: string }) {
  const [input, setInput] = useState("");
  const addMessage = useChatStore((s) => s.addMessage);
  const { nodes, edges } = useWorkflowStore();

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    addMessage({
      role: "user",
      content: userMessage,
    });

    try {
      const res = await api.post("/workflow/run", {
        nodes,
        edges,
        user_query: userMessage,
        stack_id: stackId,
      });

      addMessage({
        role: "assistant",
        content: res.data.output,
      });
    } catch (err) {
      addMessage({
        role: "assistant",
        content: "❌ Failed to run workflow",
      });
    }
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
