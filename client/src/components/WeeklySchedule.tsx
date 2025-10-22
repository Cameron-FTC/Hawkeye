import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScheduleItem {
  id: string;
  employeeName: string;
  jobTitle: string;
  location: string;
}

interface DaySchedule {
  date: string;
  dayName: string;
  items: ScheduleItem[];
}

interface WeeklyScheduleProps {
  weekDays: DaySchedule[];
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
  onDayClick?: (date: string) => void;
}

export function WeeklySchedule({
  weekDays,
  onPreviousWeek,
  onNextWeek,
  onDayClick,
}: WeeklyScheduleProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <h3 className="font-semibold">Weekly Schedule</h3>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={onPreviousWeek}
            data-testid="button-previous-week"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onNextWeek}
            data-testid="button-next-week"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <button
              key={day.date}
              onClick={() => onDayClick?.(day.date)}
              className="p-2 rounded-md border hover-elevate active-elevate-2 text-left"
              data-testid={`button-day-${day.date}`}
            >
              <div className="text-xs font-medium text-muted-foreground mb-1">
                {day.dayName}
              </div>
              <div className="text-sm font-semibold mb-2">{day.date}</div>
              <div className="space-y-1">
                {day.items.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded truncate"
                  >
                    {item.employeeName}
                  </div>
                ))}
                {day.items.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{day.items.length - 2} more
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
