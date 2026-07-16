import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecentQuizCard() {
  const quizzes = [
    {
      subject: "Mathematics",
      score: 90,
      date: "12 Jul 2026",
    },
    {
      subject: "Physics",
      score: 84,
      date: "10 Jul 2026",
    },
    {
      subject: "Biology",
      score: 95,
      date: "08 Jul 2026",
    },
  ];

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Recent Activity
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-4">

          {quizzes.map((quiz, index) => (

            <div
              key={index}
              className="flex justify-between border rounded-xl p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {quiz.subject}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {quiz.date}
                </p>

              </div>

              <div className="font-bold text-blue-600">
                {quiz.score}%
              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
}