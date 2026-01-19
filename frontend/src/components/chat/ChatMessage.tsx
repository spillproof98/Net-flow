import ReactMarkdown from "react-markdown";

export default function ChatMessage({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div className={`flex mb-3 ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm leading-relaxed
          ${
            isUser
              ? "bg-gray-100 text-gray-900"
              : "bg-white border shadow-sm"
          }
        `}
      >
        {isUser ? content : <ReactMarkdown>{content}</ReactMarkdown>}
      </div>
    </div>
  );
}
