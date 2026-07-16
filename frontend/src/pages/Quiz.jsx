import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import QuestionCard from "../components/quiz/QuestionCard";

import {
  generateQuiz,
  checkQuiz,
} from "../api/quiz";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const loadQuiz = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateQuiz(topic, 3);

      setQuestions(data.quiz);
      setQuizId(data.quiz_id);
      setAnswers({});
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    try {
      const answerList = questions.map(
        (_, index) => answers[index] || ""
      );

      const response = await checkQuiz(
        quizId,
        answerList
      );

      setResult(response);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-4xl font-bold">
          Quiz Results
        </h1>

        <div className="rounded-xl bg-white shadow p-8 text-center">

          <h2 className="text-6xl font-bold text-blue-600">
            {result.score}/{result.total}
          </h2>

          <p className="mt-4 text-lg">
            {result.message}
          </p>

        </div>

        <div className="space-y-4">

          {result.results.map((item) => (
            <div
              key={item.question_number}
              className="border rounded-lg p-4"
            >
              <p className="font-semibold">
                Question {item.question_number}
              </p>

              <p>
                Your Answer:{" "}
                <span
                  className={
                    item.is_correct
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {item.user_answer}
                </span>
              </p>

              {!item.is_correct && (
                <p>
                  Correct Answer:{" "}
                  <span className="text-green-600">
                    {item.correct_answer}
                  </span>
                </p>
              )}
            </div>
          ))}

        </div>

        <Button
          className="w-full"
          onClick={() => {
            setQuestions([]);
            setQuizId(null);
            setAnswers({});
            setResult(null);
          }}
        >
          Generate Another Quiz
        </Button>

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <h1 className="text-4xl font-bold">
        AI Quiz Generator
      </h1>

      {questions.length === 0 ? (
        <div className="space-y-4">

          <Input
            placeholder="Enter a topic (e.g. Algebra)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={loadQuiz}
          >
            Generate Quiz
          </Button>

        </div>
      ) : (
        <>
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              selected={answers[index]}
              onAnswer={(value) =>
                setAnswers((prev) => ({
                  ...prev,
                  [index]: value,
                }))
              }
            />
          ))}

          <Button
            className="w-full"
            onClick={submit}
          >
            Submit Quiz
          </Button>
        </>
      )}

    </div>
  );
}