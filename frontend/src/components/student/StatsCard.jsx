import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({
  title,
  value,
  icon,
}) {
  return (
    <Card>

      <CardContent className="flex justify-between items-center p-6">

        <div>

          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-blue-600">
          {icon}
        </div>

      </CardContent>

    </Card>
  );
}