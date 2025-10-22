import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, CheckSquare, Square } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function ClientDashboard() {
  // Mock data for client's assigned jobs (read-only view)
  const assignedJobs = [
    {
      id: "1",
      title: "Office Renovation - Phase 1",
      location: "Downtown Office Building",
      address: "123 Main St, Suite 500",
      startDate: "2025-10-22",
      endDate: "2025-10-26",
      status: "active" as const,
      schedule: [
        {
          date: "2025-10-22",
          dayName: "Tuesday",
          employees: ["John Smith", "Sarah Johnson"],
          timeRange: "8:00 AM - 4:30 PM",
        },
        {
          date: "2025-10-23",
          dayName: "Wednesday",
          employees: ["John Smith", "Sarah Johnson", "Mike Davis"],
          timeRange: "8:00 AM - 4:30 PM",
        },
        {
          date: "2025-10-24",
          dayName: "Thursday",
          employees: ["John Smith", "Mike Davis"],
          timeRange: "8:00 AM - 4:30 PM",
        },
      ],
      todos: [
        {
          id: "1",
          title: "Remove old carpeting from floors 3-5",
          completed: true,
        },
        {
          id: "2",
          title: "Paint walls in conference rooms",
          completed: true,
        },
        {
          id: "3",
          title: "Install new lighting fixtures",
          completed: false,
        },
        {
          id: "4",
          title: "Clean and prepare workspace",
          completed: false,
        },
      ],
    },
    {
      id: "2",
      title: "Equipment Maintenance",
      location: "Warehouse District",
      address: "456 Industrial Ave",
      startDate: "2025-10-23",
      endDate: "2025-10-25",
      status: "pending" as const,
      schedule: [
        {
          date: "2025-10-23",
          dayName: "Wednesday",
          employees: ["Sarah Johnson"],
          timeRange: "9:00 AM - 5:00 PM",
        },
        {
          date: "2025-10-24",
          dayName: "Thursday",
          employees: ["Sarah Johnson", "Mike Davis"],
          timeRange: "9:00 AM - 5:00 PM",
        },
      ],
      todos: [
        {
          id: "1",
          title: "Inspect HVAC systems",
          completed: false,
        },
        {
          id: "2",
          title: "Test electrical connections",
          completed: false,
        },
        {
          id: "3",
          title: "Replace air filters",
          completed: false,
        },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">My Jobs</h1>
        <p className="text-sm text-muted-foreground">
          View schedules and to-do lists for your assigned locations
        </p>
      </div>

      <div className="space-y-6">
        {assignedJobs.map((job) => (
          <Card key={job.id} data-testid={`card-job-${job.id}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={job.status} />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Details */}
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-xs text-muted-foreground mb-1">Address</p>
                <p className="text-sm">{job.address}</p>
                <div className="flex gap-4 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-mono">{job.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="text-sm font-mono">{job.endDate}</p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Schedule</h3>
                </div>
                <div className="space-y-2">
                  {job.schedule.map((day, idx) => (
                    <div
                      key={idx}
                      className="p-3 border rounded-md hover-elevate"
                      data-testid={`schedule-day-${day.date}`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div>
                          <p className="font-medium text-sm">
                            {day.dayName}, {day.date}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {day.timeRange}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {day.employees.length} crew{day.employees.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {day.employees.map((employee, empIdx) => (
                          <Badge
                            key={empIdx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {employee}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* To-Do List */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">To-Do List</h3>
                  <Badge variant="secondary" className="ml-auto">
                    {job.todos.filter((t) => t.completed).length} / {job.todos.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {job.todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-start gap-3 p-3 border rounded-md"
                      data-testid={`todo-${todo.id}`}
                    >
                      {todo.completed ? (
                        <CheckSquare className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Square className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <p
                        className={`text-sm flex-1 ${
                          todo.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {todo.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
