import {
  Card,
  CardContent,
} from "@/components/ui/card";

const history = [
  {
    subject: "Mathematics",
    score: 90,
    date: "12 Jul 2026",
  },
  {
    subject: "Physics",
    score: 82,
    date: "11 Jul 2026",
  },
  {
    subject: "Chemistry",
    score: 75,
    date: "10 Jul 2026",
  },
  {
    subject: "Biology",
    score: 94,
    date: "08 Jul 2026",
  },
];

export default function QuizHistoryTable() {
  return (
    <Card>

      <CardContent className="p-0">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-4">
                Subject
              </th>

              <th className="text-left p-4">
                Score
              </th>

              <th className="text-left p-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {history.map((quiz, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="p-4">
                  {quiz.subject}
                </td>

                <td className="p-4">
                  {quiz.score}%
                </td>

                <td className="p-4">
                  {quiz.date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </CardContent>

    </Card>
  );
}