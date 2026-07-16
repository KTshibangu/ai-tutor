import { useState } from "react";
import { Loader2 } from "lucide-react";

import ChatInput from "../components/chat/ChatInput";
import ChatMessage from "../components/chat/ChatMessage";
import SuggestedQuestions from "../components/chat/SuggestedQuestions";

import { askQuestion } from "../api/chat";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuestion = async (question) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: question,
      },
    ]);

    try {
      setLoading(true);

      const response = await askQuestion(question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: response.answer,
          source: response.source,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message:
            "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">

      <div>

        <h1 className="text-3xl font-bold">
          AI Tutor
        </h1>

        <p className="text-muted-foreground">
          Ask questions about your uploaded study material.
        </p>

      </div>

      {messages.length === 0 && (
        <SuggestedQuestions
          onSelect={sendQuestion}
        />
      )}

      <div className="space-y-4 min-h-100">

        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            {...msg}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin h-5 w-5" />
            Thinking...
          </div>
        )}

      </div>

      <ChatInput
        onSend={sendQuestion}
        loading={loading}
      />

    </div>
  );
}