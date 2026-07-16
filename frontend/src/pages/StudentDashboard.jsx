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

export default function StudentDashboard() {
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
          title="Questions Asked"
          value="34"
          icon={<MessageSquare />}
        />

        <StatsCard
          title="Quizzes Completed"
          value="12"
          icon={<ClipboardCheck />}
        />

        <StatsCard
          title="Average Score"
          value="86%"
          icon={<BookOpen />}
        />

        <StatsCard
          title="Study Sessions"
          value="9"
          icon={<History />}
        />

      </div>

      <div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          <QuickActionCard
            title="Chat with AI"
            description="Ask questions about your uploaded study material."
            link="/student/chat"
            buttonText="Start Chat"
          />

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

        <RecentQuizCard />

      </div>

    </div>
  );
}