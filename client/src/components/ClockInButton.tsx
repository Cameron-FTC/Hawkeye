import { Button } from "./ui/button";
import { Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ClockInButtonProps {
  isClockedIn: boolean;
  currentJob?: {
    title: string;
    location: string;
  };
  clockInTime?: string;
  onClockIn?: () => void;
  onClockOut?: () => void;
}

export function ClockInButton({
  isClockedIn,
  currentJob,
  clockInTime,
  onClockIn,
  onClockOut,
}: ClockInButtonProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {!isClockedIn ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to start?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Clock in to begin tracking your time
            </p>
            <Button
              size="lg"
              className="w-full"
              onClick={onClockIn}
              data-testid="button-clock-in"
            >
              <Clock className="h-5 w-5 mr-2" />
              Clock In
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 bg-chart-2 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-chart-2">
                Currently Clocked In
              </span>
            </div>
            {currentJob && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Current Job</p>
                <h4 className="font-semibold" data-testid="text-current-job">
                  {currentJob.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentJob.location}
                </p>
              </div>
            )}
            {clockInTime && (
              <p className="text-sm text-muted-foreground mb-4">
                Clocked in at{" "}
                <span className="font-mono font-medium text-foreground">
                  {clockInTime}
                </span>
              </p>
            )}
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onClockOut}
              data-testid="button-clock-out"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Clock Out
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
