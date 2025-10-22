import { JobCard } from "../JobCard";

export default function JobCardExample() {
  const employees = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Mike Davis" },
    { id: "4", name: "Emma Wilson" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <JobCard
        id="1"
        title="Office Renovation - Phase 1"
        location="Downtown Office Building"
        startDate="2025-10-22"
        endDate="2025-10-26"
        employees={employees}
        status="active"
        onViewDetails={() => console.log("View job 1 details")}
      />
      <JobCard
        id="2"
        title="Equipment Maintenance"
        location="Warehouse District"
        startDate="2025-10-23"
        employees={employees.slice(0, 2)}
        status="pending"
        onViewDetails={() => console.log("View job 2 details")}
      />
    </div>
  );
}
