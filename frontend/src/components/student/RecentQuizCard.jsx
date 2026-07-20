import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

import { getQuizHistory } from "@/api/quiz";
import { Loader2 } from "lucide-react";

export default function RecentQuizCard() {
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getRecent() {
    try {
      setLoading(true)
      const quizHistory = await getQuizHistory(1, 3);
      setRecentQuizzes(quizHistory);
      console.log(recentQuizzes)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecent();
  }, [])


  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Recent Activity
        </CardTitle>

      </CardHeader>

      <CardContent>

        {
          loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="space-y-4">

              {recentQuizzes.map((recentQuiz, index) => (

                <div
                  key={index}
                  className="flex justify-between border rounded-xl p-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      {recentQuiz.topic}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {recentQuiz.timestamp.split("T")[0]}
                    </p>

                  </div>

                  <div className="font-bold text-blue-600">
                    {
                      recentQuiz.total ?
                        (Number(recentQuiz.score) / Number(recentQuiz.total)).toFixed(2) * 100 :
                        "0.00"
                    }%
                  </div>

                </div>

              ))}

            </div>
          )

        }

      </CardContent>

    </Card>
  );
}