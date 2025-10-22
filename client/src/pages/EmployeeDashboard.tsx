import { ClockInButton } from "@/components/ClockInButton";
import { JobCard } from "@/components/JobCard";
import { AssetCard } from "@/components/AssetCard";
import { TimesheetEntry } from "@/components/TimesheetEntry";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function EmployeeDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [todos, setTodos] = useState([
    { id: "1", text: "Complete safety inspection", completed: false },
    { id: "2", text: "Review equipment checklist", completed: false },
    { id: "3", text: "Submit daily report", completed: true },
  ]);

  const todaysJob = {
    id: "1",
    title: "Office Renovation - Phase 1",
    location: "Downtown Office Building",
    startDate: "2025-10-21",
    endDate: "2025-10-26",
    employees: [
      { id: "1", name: "John Smith" },
      { id: "2", name: "Sarah Johnson" },
    ],
    status: "active" as const,
  };

  const assets = [
    {
      id: "1",
      tag: "AST-001",
      title: "Laptop - Dell XPS 15",
      location: "Office Building A",
      status: "active" as const,
    },
    {
      id: "2",
      tag: "AST-002",
      title: "Drill Kit - Makita",
      status: "active" as const,
    },
  ];

  const recentTimesheets = [
    {
      id: "1",
      employeeName: "You",
      jobTitle: "Office Renovation - Phase 1",
      location: "Downtown Office Building",
      clockIn: "08:00",
      clockOut: "16:30",
      totalHours: "8.0",
      status: "approved" as const,
    },
  ];

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's your schedule for today
        </p>
      </div>

      <ClockInButton
        isClockedIn={isClockedIn}
        currentJob={
          isClockedIn
            ? {
                title: "Office Renovation - Phase 1",
                location: "Downtown Office Building",
              }
            : undefined
        }
        clockInTime={isClockedIn ? "08:00 AM" : undefined}
        onClockIn={() => {
          setIsClockedIn(true);
          console.log("Clocked in");
        }}
        onClockOut={() => {
          setIsClockedIn(false);
          console.log("Clocked out");
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Today's Job</h2>
            <JobCard
              {...todaysJob}
              onViewDetails={() => console.log("View job details")}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">To-Do List</h2>
            <Card>
              <CardHeader>
                <h3 className="font-medium">Tasks for Office Renovation</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div key={todo.id} className="flex items-center gap-3">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodo(todo.id)}
                        data-testid={`checkbox-todo-${todo.id}`}
                      />
                      <span
                        className={`text-sm ${
                          todo.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">My Assets</h2>
            <div className="space-y-3">
              {assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  {...asset}
                  onScan={() => console.log("Scan asset", asset.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Timesheets</h2>
            <div className="space-y-3">
              {recentTimesheets.map((timesheet) => (
                <TimesheetEntry key={timesheet.id} {...timesheet} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
