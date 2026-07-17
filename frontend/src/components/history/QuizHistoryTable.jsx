import { getQuizHistory } from "@/api/quiz";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function QuizHistoryTable() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false)

  async function loadHistory() {
    try {
      setLoading(true)
      const quizHistory = await getQuizHistory();
      setHistory(quizHistory);
      console.log(history)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory();
  }, [])

  if (history.length === 0) {
    return (
      <Card className="p-6">
        No history uploaded yet.
      </Card>
    );
  }

  return (
    <Card>

      <CardContent className="p-0">

        {
          loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
            </div>
          ) : (
            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left p-4">
                    Topic
                  </th>

                  <th className="text-left p-4">
                    Score (%)
                  </th>

                  <th className="text-left p-4">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map((h, index) => (

                  <tr
                    key={index}
                    className="border-b"
                  >

                    <td className="p-4">
                      {h.topic}
                    </td>

                    <td className="p-4">
                      {(h.score / h.total * 100).toFixed(2)}
                    </td>

                    <td className="p-4">
                      {h.timestamp.split("T")[0]}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )
        }

      </CardContent>

    </Card>
  );
}