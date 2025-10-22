import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Clock,
  Package,
  Settings,
  Building2,
  Shield,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { RoleBadge } from "./RoleBadge";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface AppSidebarProps {
  role: "employee" | "manager" | "client" | "admin";
  businessName: string;
  userName: string;
}

export function AppSidebar({ role, businessName, userName }: AppSidebarProps) {
  const [location] = useLocation();

  const adminItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "User Management", url: "/users", icon: Users },
    { title: "Assets", url: "/assets", icon: Package },
    { title: "Businesses", url: "/businesses", icon: Building2 },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const managerItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Employees", url: "/employees", icon: Users },
    { title: "Jobs", url: "/jobs", icon: Briefcase },
    { title: "Timesheets", url: "/timesheets", icon: Clock },
    { title: "Invoices", url: "/invoices", icon: FileText },
    { title: "Assets", url: "/assets", icon: Package },
    { title: "User Management", url: "/users", icon: Shield },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const employeeItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "My Schedule", url: "/schedule", icon: Briefcase },
    { title: "Timesheets", url: "/timesheets", icon: Clock },
    { title: "My Assets", url: "/assets", icon: Package },
  ];

  const clientItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "My Jobs", url: "/", icon: Briefcase },
  ];

  const items = 
    role === "admin" ? adminItems :
    role === "manager" ? managerItems : 
    role === "employee" ? employeeItems : 
    clientItems;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm truncate">{businessName}</h2>
            <RoleBadge role={role} />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(" ", "-")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
