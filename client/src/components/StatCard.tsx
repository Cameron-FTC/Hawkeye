import { Card, CardContent, CardHeader } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card data-testid="card-stat">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold" data-testid="text-stat-value">
          {value}
        </div>
        {trend && (
          <p
            className={`text-xs ${
              trend.positive ? "text-chart-2" : "text-destructive"
            }`}
            data-testid="text-stat-trend"
          >
            {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
