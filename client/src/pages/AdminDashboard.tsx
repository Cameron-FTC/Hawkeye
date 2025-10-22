import { StatCard } from "@/components/StatCard";
import { UserManagement } from "@/components/UserManagement";
import { AddEmployeeDialog } from "@/components/AddEmployeeDialog";
import { Users, Building2, UserCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [users, setUsers] = useState<
    Array<{
      id: string;
      name: string;
      email: string;
      phone?: string;
      role: "employee" | "manager" | "client" | "admin";
      businessName: string;
    }>
  >([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@acme.com",
      phone: "+1 (555) 123-4567",
      role: "employee",
      businessName: "Acme Construction Co.",
    },
    {
      id: "2",
      name: "Sarah Manager",
      email: "sarah.m@acme.com",
      phone: "+1 (555) 234-5678",
      role: "manager",
      businessName: "Acme Construction Co.",
    },
    {
      id: "3",
      name: "Mike Client",
      email: "mike.c@clientco.com",
      role: "client",
      businessName: "Client Corporation",
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.w@acme.com",
      phone: "+1 (555) 345-6789",
      role: "employee",
      businessName: "Acme Construction Co.",
    },
    {
      id: "5",
      name: "David Admin",
      email: "david.a@acme.com",
      phone: "+1 (555) 456-7890",
      role: "admin",
      businessName: "Acme Construction Co.",
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    totalUsers: users.length,
    employees: users.filter((u) => u.role === "employee").length,
    managers: users.filter((u) => u.role === "manager").length,
    clients: users.filter((u) => u.role === "client").length,
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Manage users and assign roles across your organization
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)} data-testid="button-add-user">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
        />
        <StatCard
          title="Employees"
          value={stats.employees}
          icon={UserCheck}
        />
        <StatCard
          title="Managers"
          value={stats.managers}
          icon={Shield}
        />
        <StatCard
          title="Clients"
          value={stats.clients}
          icon={Building2}
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-users"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40" data-testid="select-role-filter">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          User Management ({filteredUsers.length})
        </h2>
        {filteredUsers.length > 0 ? (
          <UserManagement
            users={filteredUsers}
            onRoleChange={(userId, newRole) => {
              setUsers(
                users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
              );
              console.log("Role changed:", userId, newRole);
            }}
            onDeleteUser={(userId) => {
              console.log("Delete user:", userId);
            }}
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No users found matching your search criteria
          </div>
        )}
      </div>

      <AddEmployeeDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={(employee) => {
          const newUser = {
            id: String(users.length + 1),
            ...employee,
          };
          setUsers([...users, newUser]);
          console.log("New user added:", newUser);
        }}
      />
    </div>
  );
}
