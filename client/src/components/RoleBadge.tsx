import { Badge } from "./ui/badge";

type Role = "employee" | "manager" | "client" | "admin";

interface RoleBadgeProps {
  role: Role;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const roleConfig = {
    employee: {
      label: "Employee",
      variant: "secondary" as const,
    },
    manager: {
      label: "Manager",
      variant: "default" as const,
    },
    client: {
      label: "Client",
      variant: "outline" as const,
    },
    admin: {
      label: "Admin",
      variant: "default" as const,
    },
  };

  const config = roleConfig[role];

  return (
    <Badge variant={config.variant} data-testid={`badge-role-${role}`}>
      {config.label}
    </Badge>
  );
}
