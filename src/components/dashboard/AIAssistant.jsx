import { useEffect, useRef, useState } from "react";
import { Bot, SendHorizontal } from "lucide-react";
import { chatWithAI } from "../../services/aiService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AIAssistant({
  onTaskChanged,
  currentUser,
}) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const suggestedPrompts = [
  {
    icon: "➕",
    text: "Create task Learn Redis",
  },
  {
    icon: "📅",
    text: "Plan my day",
  },
  {
    icon: "📊",
    text: "Dashboard summary",
  },
  {
    icon: "📈",
    text: "Productivity report",
  },
  {
    icon: "📆",
    text: "Weekly report",
  },
  {
    icon: "🚀",
    text: "Optimize priorities",
  },
];

  // Chat container reference
  const chatContainerRef = useRef(null);

  // Auto scroll inside chat box only
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);


  useEffect(() => {

  if (!currentUser) return;

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  setMessages([
    {
      sender: "ai",
      text: `${greeting}, ${currentUser.name} 👋\n\nHow can I help you manage your tasks today?`,
    },
  ]);

}, [currentUser]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await chatWithAI(userMessage);

      

      const aiText = response.response || response.message;

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiText,
        },
      ]);
      const handleSuggestedPrompt = (prompt) => {
  setMessage(prompt);

  setTimeout(() => {
    handleSendPrompt(prompt);
  }, 100);
};

const handleSendPrompt = async (prompt) => {

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: prompt,
    },
  ]);

  setLoading(true);

  try {

    const response = await chatWithAI(prompt);

    const aiText = response.response || response.message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: aiText,
      },
    ]);

    const lower = aiText.toLowerCase();

    if (
      lower.includes("task created") ||
      lower.includes("task updated") ||
      lower.includes("task deleted") ||
      lower.includes("marked as completed")
    ) {
      onTaskChanged?.();
    }

  } catch {

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "❌ AI service is unavailable.",
      },
    ]);

  } finally {

    setLoading(false);

  }

};

      // Refresh dashboard if AI modifies tasks
      const lower = aiText.toLowerCase();

        if (
          lower.includes("task created") ||
          lower.includes("task updated") ||
          lower.includes("task deleted") ||
          lower.includes("marked as completed")
        ) {
          onTaskChanged?.();
        }
    } catch (error) {

  console.error(error);

  const aiMessage =
    error.response?.data?.message ||
    error.response?.data?.response ||
    "❌ Something went wrong. Please try again.";

  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      text: aiMessage,
    },
  ]);

} finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 h-[700px] flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5 border-b pb-4">
  <div className="bg-indigo-100 p-3 rounded-xl">
    <Bot className="text-indigo-600" size={28} />
  </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800">
          TaskPilot AI
        </h2>

        <p className="text-sm text-gray-500">
          Powered by Spring AI + Groq
        </p>
      </div>
    </div>

      {/* Chat Messages */}
      <div
  ref={chatContainerRef}
  className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-5 space-y-5 scroll-smooth"
>
  {messages.length === 1 && !loading && (

  <div className="mb-6">

    <h3 className="font-semibold text-gray-700 mb-4">
      ✨ Try asking...
    </h3>

    <div className="grid gap-3">

      {suggestedPrompts.map((prompt, index) => (

        <button
          key={index}
          onClick={() => handleSuggestedPrompt(prompt.text)}
          className="text-left p-4 rounded-xl border bg-white hover:bg-indigo-50 hover:border-indigo-500 transition"
        >

          <span className="mr-2">

            {prompt.icon}

          </span>

          {prompt.text}

        </button>

      ))}

    </div>

  </div>

)}
        {messages.map((msg, index) => (
          <div
          key={index}
          className={`max-w-[95%] px-5 py-4 rounded-2xl break-words ${
            msg.sender === "user"
              ? "ml-auto bg-indigo-600 text-white"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          {msg.sender === "ai" && (
          <div className="flex items-center gap-2 mb-3">
            <Bot size={16} className="text-indigo-600" />
            <span className="text-xs font-semibold text-gray-500">
              TaskPilot AI
            </span>
          </div>
        )}
            <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
  h1: ({ children }) => (
    <h1 className="text-xl font-bold mb-3 text-gray-800">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-lg font-semibold mt-4 mb-2 text-gray-800">
      {children}
    </h2>
  ),

  p: ({ children }) => (
    <p className="leading-7 mb-3">
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 mb-3">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-6 space-y-2 mb-3">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li>{children}</li>
  ),

  strong: ({ children }) => (
    <strong className="font-semibold">
      {children}
    </strong>
  ),

  code: ({ children }) => (
    <code className="bg-gray-800 text-green-400 rounded px-2 py-1 text-sm font-mono">
      {children}
    </code>
  ),

  table: ({ children }) => (
    <table className="w-full border-collapse border border-gray-300 my-4 rounded-lg overflow-hidden">
      {children}
    </table>
  ),

  thead: ({ children }) => (
    <thead className="bg-indigo-100">
      {children}
    </thead>
  ),

  tbody: ({ children }) => (
    <tbody>{children}</tbody>
  ),

  tr: ({ children }) => (
    <tr className="border-b border-gray-300">
      {children}
    </tr>
  ),

  th: ({ children }) => (
    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="border border-gray-300 px-4 py-2">
      {children}
    </td>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 my-4">
      {children}
    </blockquote>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:text-indigo-800 underline"
    >
      {children}
    </a>
  ),
}}
>
  {msg.text}
</ReactMarkdown>
          </div>
        ))}

        {loading && (
  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 w-fit shadow-sm">

    <div className="flex items-center gap-2 mb-3">
      <Bot size={16} className="text-indigo-600" />
      <span className="text-xs font-semibold text-gray-500">
        TaskPilot AI
      </span>
    </div>

    <div className="flex gap-2">
      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.3s]"></div>
    </div>

  </div>
)}
      </div>

      {/* Input */}
      
<div className="border-t pt-4 mt-4 flex gap-3">

  <input
    type="text"
    disabled={loading}
    placeholder="Ask TaskPilot AI anything about your tasks..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !loading && message.trim()) {
        e.preventDefault();
        e.stopPropagation();
        handleSend();
      }
    }}
    className="flex-1 border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
  />

  <button
    type="button"
    onClick={handleSend}
    disabled={loading || !message.trim()}
    className={`px-5 rounded-xl text-white transition duration-200 ${
      loading || !message.trim()
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95"
    }`}
  >
    <SendHorizontal size={20} />
  </button>

</div>

    </div>
  );
}

export default AIAssistant;