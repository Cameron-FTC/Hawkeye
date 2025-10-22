import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin, Calendar, Users } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface Employee {
  id: string;
  name: string;
  avatar?: string;
}

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  employees: Employee[];
  status: "active" | "pending" | "completed" | "cancelled";
  onViewDetails?: () => void;
}

export function JobCard({
  id,
  title,
  location,
  startDate,
  endDate,
  employees,
  status,
  onViewDetails,
}: JobCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover-elevate" data-testid={`card-job-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 truncate" data-testid={`text-job-title-${id}`}>
              {title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate" data-testid={`text-job-location-${id}`}>
                {location}
              </span>
            </div>
          </div>
          <StatusBadge status={status} showIcon={false} />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Calendar className="h-3 w-3 flex-shrink-0" />
          <span className="font-mono text-xs" data-testid={`text-job-dates-${id}`}>
            {startDate}
            {endDate && ` - ${endDate}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
          <div className="flex -space-x-2">
            {employees.slice(0, 3).map((employee) => (
              <Avatar
                key={employee.id}
                className="h-6 w-6 border-2 border-card"
                data-testid={`avatar-employee-${employee.id}`}
              >
                <AvatarImage src={employee.avatar} />
                <AvatarFallback className="text-xs">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
            ))}
            {employees.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{employees.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onViewDetails}
          data-testid={`button-job-details-${id}`}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
