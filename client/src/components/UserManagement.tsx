import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { RoleBadge } from "./RoleBadge";
import { MoreVertical, Mail, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "employee" | "manager" | "client" | "admin";
  businessName: string;
}

interface UserManagementProps {
  users: User[];
  onRoleChange?: (userId: string, newRole: User["role"]) => void;
  onDeleteUser?: (userId: string) => void;
}

export function UserManagement({
  users,
  onRoleChange,
  onDeleteUser,
}: UserManagementProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card key={user.id} data-testid={`card-user-${user.id}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar>
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4
                  className="font-medium truncate"
                  data-testid={`text-user-name-${user.id}`}
                >
                  {user.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {user.businessName}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid={`button-user-menu-${user.id}`}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log("Edit user", user.id)}
                >
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Reset password", user.id)}
                >
                  Reset Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDeleteUser?.(user.id)}
                >
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Role
              </label>
              <Select
                value={user.role}
                onValueChange={(value) =>
                  onRoleChange?.(user.id, value as User["role"])
                }
              >
                <SelectTrigger
                  className="w-full"
                  data-testid={`select-role-${user.id}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
