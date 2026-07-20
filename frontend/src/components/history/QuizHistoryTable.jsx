import { getQuizHistory } from "@/api/quiz";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function QuizHistoryTable() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function loadHistory() {
    try {
      setLoading(true)
      const quizHistory = await getQuizHistory(page, 10);
      setHistory(quizHistory);

      setPages(pages);
      console.log(pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory();
  }, [page])

  if (history.length === 0) {
    return (
      <Card className="p-6">
        No history uploaded yet.
      </Card>
    );
  }

  return (
    <>
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

      <div className="flex justify-between mt-6">

        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>

        <span>
          Page {page} of {pages}
        </span>

        <Button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>

      </div>
    </>

  );
}