import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function ScoreCard({
  score,
  total,
}) {
  return (
    <Card>

      <CardContent className="text-center p-10">

        <h1 className="text-6xl font-bold text-blue-600">
          {score}/{total}
        </h1>

        <p className="text-xl mt-5">
          Quiz Completed
        </p>

      </CardContent>

    </Card>
  );
}