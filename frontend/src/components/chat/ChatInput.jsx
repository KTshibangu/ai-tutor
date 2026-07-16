import { useState } from "react";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  const submit = () => {
    if (!question.trim()) return;

    onSend(question);

    setQuestion("");
  };

  return (
    <div className="flex gap-3">

      <Input
        placeholder="Ask anything about your study material..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && submit()
        }
      />

      <Button
        onClick={submit}
        disabled={loading}
      >
        <Send className="h-4 w-4" />
      </Button>

    </div>
  );
}