import {
  MessageSquare,
  ClipboardCheck,
  History,
  BookOpen,
} from "lucide-react";

import { Link } from "react-router-dom";

import StatsCard from "../components/student/StatsCard";
import QuickActionCard from "../components/student/QuickActionCard";
import RecentQuizCard from "../components/student/RecentQuizCard";
import { useState, useEffect } from "react";
import { getQuizHistory } from "@/api/quiz";

export default function StudentDashboard() {
  const [quizStats, setQuizStats] = useState([])
  const [loading, setLoading] = useState(false)
  

  async function loadQuizStats() {
    try {
      setLoading(true)
      const response = await getQuizHistory();
      setQuizStats(response.history);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuizStats();
  }, [])

  let totalQuestions = 0
  let aggScore = 0
  let totalScore = 0
  for (let i = 0; i < quizStats.length; i++) {
    totalQuestions += quizStats[i].quiz_content.length;
    aggScore += quizStats[i].score
    totalScore += quizStats[i].total
  }

  const scorePct =
  totalScore > 0
    ? ((Number(aggScore) / Number(totalScore)) * 100).toFixed(2)
    : "0.00";




  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Student Dashboard
        </h1>

        <p className="text-muted-foreground">
          Welcome back! Continue your learning journey.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Quiz Sessions"
          value={quizStats.length}
          icon={<MessageSquare />}
        />

        <StatsCard
          title="Total Quiz Questions"
          value={totalQuestions}
          icon={<ClipboardCheck />}
        />

        <StatsCard
          title="Total Correct Answers"
          value={aggScore}
          icon={<ClipboardCheck />}
        />

        <StatsCard
          title="Average Score"
          value={`${scorePct}%`}
          icon={<BookOpen />}
        />

      </div>

      <div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          {/* <QuickActionCard
            title="Chat with AI"
            description="Ask questions about your uploaded study material."
            link="/student/chat"
            buttonText="Start Chat"
          /> */}

          <QuickActionCard
            title="Generate Quiz"
            description="Create a quiz from your study material."
            link="/student/quiz"
            buttonText="Generate"
          />

          <QuickActionCard
            title="Quiz History"
            description="Review your previous quiz attempts."
            link="/student/history"
            buttonText="View History"
          />

        </div>

      </div>

      <div>

        <h2 className="text-xl font-semibold mb-4">
          Recent Quiz Attempts
        </h2>

        <RecentQuizCard loading = {loading}/>

      </div>

    </div>
  );
}