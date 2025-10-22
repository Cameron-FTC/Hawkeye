import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, MapPin, CheckCircle, X } from "lucide-react";
import { Badge } from "./ui/badge";

interface TimesheetEntryProps {
  id: string;
  employeeName: string;
  jobTitle: string;
  location: string;
  clockIn: string;
  clockOut?: string;
  totalHours?: string;
  status: "pending" | "approved" | "rejected";
  onApprove?: () => void;
  onReject?: () => void;
}

export function TimesheetEntry({
  id,
  employeeName,
  jobTitle,
  location,
  clockIn,
  clockOut,
  totalHours,
  status,
  onApprove,
  onReject,
}: TimesheetEntryProps) {
  const statusConfig = {
    pending: { label: "Pending", variant: "outline" as const },
    approved: { label: "Approved", variant: "secondary" as const },
    rejected: { label: "Rejected", variant: "destructive" as const },
  };

  return (
    <Card data-testid={`card-timesheet-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium mb-1" data-testid={`text-employee-${id}`}>
              {employeeName}
            </h4>
            <p className="text-sm text-muted-foreground mb-1 truncate">{jobTitle}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
          <Badge variant={statusConfig[status].variant}>
            {statusConfig[status].label}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-xs" data-testid={`text-clock-in-${id}`}>
              In: {clockIn}
            </span>
          </div>
          {clockOut && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="font-mono text-xs" data-testid={`text-clock-out-${id}`}>
                Out: {clockOut}
              </span>
            </div>
          )}
          {totalHours && (
            <div className="font-medium text-xs" data-testid={`text-total-hours-${id}`}>
              Total: {totalHours}h
            </div>
          )}
        </div>
        {status === "pending" && (onApprove || onReject) && (
          <div className="flex gap-2">
            {onApprove && (
              <Button
                size="sm"
                variant="default"
                className="flex-1"
                onClick={onApprove}
                data-testid={`button-approve-${id}`}
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
            )}
            {onReject && (
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={onReject}
                data-testid={`button-reject-${id}`}
              >
                <X className="h-3 w-3 mr-1" />
                Reject
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
