import { StatCard } from "@/components/StatCard";
import { JobCard } from "@/components/JobCard";
import { TimesheetEntry } from "@/components/TimesheetEntry";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { AddEmployeeDialog } from "@/components/AddEmployeeDialog";
import { Clock, Users, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ManagerDashboard() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const employees = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Mike Davis" },
  ];

  const jobs = [
    {
      id: "1",
      title: "Office Renovation - Phase 1",
      location: "Downtown Office Building",
      startDate: "2025-10-22",
      endDate: "2025-10-26",
      employees,
      status: "active" as const,
    },
    {
      id: "2",
      title: "Equipment Maintenance",
      location: "Warehouse District",
      startDate: "2025-10-23",
      employees: employees.slice(0, 2),
      status: "pending" as const,
    },
  ];

  const timesheets = [
    {
      id: "1",
      employeeName: "John Smith",
      jobTitle: "Office Renovation - Phase 1",
      location: "Downtown Office Building",
      clockIn: "08:00",
      clockOut: "16:30",
      totalHours: "8.0",
      status: "pending" as const,
    },
    {
      id: "2",
      employeeName: "Sarah Johnson",
      jobTitle: "Equipment Maintenance",
      location: "Warehouse District",
      clockIn: "09:00",
      clockOut: "17:00",
      totalHours: "7.5",
      status: "pending" as const,
    },
  ];

  const weekDays = [
    {
      date: "21",
      dayName: "Mon",
      items: [
        { id: "1", employeeName: "John S.", jobTitle: "Renovation", location: "Office A" },
        { id: "2", employeeName: "Sarah J.", jobTitle: "Maintenance", location: "Warehouse" },
      ],
    },
    {
      date: "22",
      dayName: "Tue",
      items: [{ id: "3", employeeName: "Mike D.", jobTitle: "Installation", location: "Client Site" }],
    },
    { date: "23", dayName: "Wed", items: [] },
    {
      date: "24",
      dayName: "Thu",
      items: [
        { id: "4", employeeName: "Emma W.", jobTitle: "Inspection", location: "Building B" },
        { id: "5", employeeName: "John S.", jobTitle: "Renovation", location: "Office A" },
      ],
    },
    { date: "25", dayName: "Fri", items: [] },
    { date: "26", dayName: "Sat", items: [] },
    { date: "27", dayName: "Sun", items: [] },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage your workforce and operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAddDialogOpen(true)} data-testid="button-add-employee">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
          <Button data-testid="button-add-job">
            <Plus className="h-4 w-4 mr-2" />
            Assign Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Hours This Week"
          value="156.5"
          icon={Clock}
          trend={{ value: "+12% from last week", positive: true }}
        />
        <StatCard title="Active Employees" value="24" icon={Users} />
        <StatCard
          title="Active Jobs"
          value="8"
          icon={Briefcase}
          trend={{ value: "-2 from yesterday", positive: false }}
        />
        <StatCard title="Pending Approvals" value="3" icon={CheckCircle} />
      </div>

      <WeeklySchedule
        weekDays={weekDays}
        onPreviousWeek={() => console.log("Previous week")}
        onNextWeek={() => console.log("Next week")}
        onDayClick={(date) => console.log("Clicked day:", date)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Active Jobs</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                {...job}
                onViewDetails={() => console.log("View job", job.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Pending Timesheets</h2>
          <div className="space-y-4">
            {timesheets.map((timesheet) => (
              <TimesheetEntry
                key={timesheet.id}
                {...timesheet}
                onApprove={() => console.log("Approve", timesheet.id)}
                onReject={() => console.log("Reject", timesheet.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <AddEmployeeDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={(employee) => {
          console.log("New employee added:", employee);
        }}
      />
    </div>
  );
}
