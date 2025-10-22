import { UserManagement } from "../UserManagement";
import { useState } from "react";

export default function UserManagementExample() {
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
      name: "Emma Admin",
      email: "emma.a@acme.com",
      phone: "+1 (555) 345-6789",
      role: "admin",
      businessName: "Acme Construction Co.",
    },
  ]);

  return (
    <div className="p-4">
      <UserManagement
        users={users}
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
    </div>
  );
}
