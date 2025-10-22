import { RoleBadge } from "../RoleBadge";

export default function RoleBadgeExample() {
  return (
    <div className="flex gap-2 p-4">
      <RoleBadge role="admin" />
      <RoleBadge role="manager" />
      <RoleBadge role="employee" />
      <RoleBadge role="client" />
    </div>
  );
}
