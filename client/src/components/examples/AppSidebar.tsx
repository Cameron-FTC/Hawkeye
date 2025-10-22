import { AppSidebar } from "../AppSidebar";
import { SidebarProvider } from "../ui/sidebar";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar
          role="manager"
          businessName="Acme Construction Co."
          userName="John Manager"
        />
        <div className="flex-1 p-4">
          <p className="text-muted-foreground">Main content area</p>
        </div>
      </div>
    </SidebarProvider>
  );
}
