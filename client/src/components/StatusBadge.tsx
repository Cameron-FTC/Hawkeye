import { Badge } from "./ui/badge";
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

type Status = "active" | "pending" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: Status;
  showIcon?: boolean;
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: "Active",
      icon: CheckCircle,
      className: "bg-chart-2 text-white border-chart-2",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-chart-3 text-white border-chart-3",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle,
      className: "bg-muted text-muted-foreground border-muted",
    },
    cancelled: {
      label: "Cancelled",
      icon: XCircle,
      className: "bg-destructive/10 text-destructive border-destructive/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={config.className} data-testid={`badge-status-${status}`}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  );
}
