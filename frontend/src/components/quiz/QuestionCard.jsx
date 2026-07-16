import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function QuestionCard({
  question,
  selected,
  onAnswer,
}) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          {question.question}
        </CardTitle>

      </CardHeader>

      <CardContent>

        <RadioGroup
          value={selected}
          onValueChange={onAnswer}
        >

          {question.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mb-4"
            >
              <RadioGroupItem
                value={option}
                id={`${question.id}-${index}`}
              />

              <Label htmlFor={`${question.id}-${index}`}>
                {option}
              </Label>

            </div>
          ))}

        </RadioGroup>

      </CardContent>

    </Card>
  );
}