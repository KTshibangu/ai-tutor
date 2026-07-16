import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function QuickActionCard({
  title,
  description,
  link,
  buttonText,
}) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          {title}
        </CardTitle>

      </CardHeader>

      <CardContent>

        <p className="text-muted-foreground mb-6">
          {description}
        </p>

        <Button asChild>

          <Link to={link}>
            {buttonText}
          </Link>

        </Button>

      </CardContent>

    </Card>
  );
}