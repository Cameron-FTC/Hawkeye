import { StatCard } from "../StatCard";
import { Clock, Users, Briefcase, CheckCircle } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
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
  );
}
