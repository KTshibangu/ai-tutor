import { Card } from "@/components/ui/card";

export default function ChatMessage({ sender, message, source }) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <Card
        className={`max-w-3xl p-4 ${isUser
            ? "bg-blue-600 text-white"
            : "bg-white"
          }`}
      >
        <p className="whitespace-pre-wrap">
          {message}
        </p>

        {source?.length > 0 && (
          <div className="mt-4 border-t pt-3">

            <p className="font-semibold mb-2">
              Sources
            </p>

            {source.map((doc, index) => (
              <div
                key={index}
                className="text-sm text-gray-500"
              >
                📄 {doc}
              </div>
            ))}

          </div>
        )}
      </Card>
    </div>
  );
}