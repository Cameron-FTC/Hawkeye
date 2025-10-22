import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import InvoicesPage from "./pages/InvoicesPage";
import AssetsPage from "./pages/AssetsPage";
import NotFound from "@/pages/not-found";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RouterProps {
  role: "manager" | "employee" | "client" | "admin";
}

function Router({ role }: RouterProps) {
  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "employee":
        return <EmployeeDashboard />;
      case "client":
        return <ClientDashboard />;
      default:
        return <ManagerDashboard />;
    }
  };

  return (
    <Switch>
      <Route path="/">
        {() => renderDashboard()}
      </Route>
      <Route path="/users">{() => role === "admin" ? <AdminDashboard /> : <EmployeeManagement />}</Route>
      <Route path="/businesses">{() => <div className="p-4">Businesses Page</div>}</Route>
      <Route path="/employees">{() => <EmployeeManagement />}</Route>
      <Route path="/jobs">{() => <div className="p-4">Jobs Page</div>}</Route>
      <Route path="/timesheets">{() => <div className="p-4">Timesheets Page</div>}</Route>
      <Route path="/invoices">{() => <InvoicesPage />}</Route>
      <Route path="/assets">{() => <AssetsPage />}</Route>
      <Route path="/settings">{() => <div className="p-4">Settings Page</div>}</Route>
      <Route path="/schedule">{() => <div className="p-4">My Schedule Page</div>}</Route>
      <Route path="/schedules">{() => <div className="p-4">Schedules Page</div>}</Route>
      <Route path="/reports">{() => <div className="p-4">Reports Page</div>}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [role, setRole] = useState<"manager" | "employee" | "client" | "admin">("admin");

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const getUserName = () => {
    switch (role) {
      case "admin":
        return "Admin User";
      case "manager":
        return "John Manager";
      case "employee":
        return "Sarah Employee";
      case "client":
        return "Mike Client";
      default:
        return "User";
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar
                role={role}
                businessName="Acme Construction Co."
                userName={getUserName()}
              />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between gap-4 p-4 border-b">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        View as:
                      </span>
                      <Select
                        value={role}
                        onValueChange={(value) =>
                          setRole(value as "manager" | "employee" | "client" | "admin")
                        }
                      >
                        <SelectTrigger className="w-32" data-testid="select-role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="client">Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto">
                  <Router role={role} />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
