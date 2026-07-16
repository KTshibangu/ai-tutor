import { Button } from "@/components/ui/button";

const suggestions = [
  "Summarize this chapter",
  "Generate revision notes",
  "Explain this topic simply",
  "What are the key concepts?",
];

export default function SuggestedQuestions({
  onSelect,
}) {
  return (
    <div className="flex flex-wrap gap-2">

      {suggestions.map((item) => (
        <Button
          key={item}
          variant="outline"
          onClick={() => onSelect(item)}
        >
          {item}
        </Button>
      ))}

    </div>
  );
}