import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-2 p-4">
      <StatusBadge status="active" />
      <StatusBadge status="pending" />
      <StatusBadge status="completed" />
      <StatusBadge status="cancelled" />
    </div>
  );
}
