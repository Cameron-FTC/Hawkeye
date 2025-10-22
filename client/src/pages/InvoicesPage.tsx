import { useState } from "react";
import { StatCard } from "@/components/StatCard";
import { GenerateInvoiceDialog } from "@/components/GenerateInvoiceDialog";
import { FileText, DollarSign, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InvoicesPage() {
  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);

  // Mock data
  const jobs = [
    {
      id: "1",
      title: "Office Renovation - Phase 1",
      clientName: "ABC Corporation",
      location: "Downtown Office Building",
    },
    {
      id: "2",
      title: "Equipment Maintenance",
      clientName: "XYZ Industries",
      location: "Warehouse District",
    },
    {
      id: "3",
      title: "Installation Project",
      clientName: "Tech Startup Inc",
      location: "Innovation Hub",
    },
  ];

  const [invoices, setInvoices] = useState([
    {
      id: "INV-001",
      jobTitle: "Office Renovation - Phase 1",
      clientName: "ABC Corporation",
      weekStart: "2025-10-14",
      weekEnd: "2025-10-20",
      totalHours: 42.5,
      totalAmount: 2550.0,
      status: "sent" as const,
      sentAt: "2025-10-21",
    },
    {
      id: "INV-002",
      jobTitle: "Equipment Maintenance",
      clientName: "XYZ Industries",
      weekStart: "2025-10-14",
      weekEnd: "2025-10-20",
      totalHours: 35.0,
      totalAmount: 1750.0,
      status: "draft" as const,
    },
    {
      id: "INV-003",
      jobTitle: "Installation Project",
      clientName: "Tech Startup Inc",
      weekStart: "2025-10-07",
      weekEnd: "2025-10-13",
      totalHours: 48.0,
      totalAmount: 2880.0,
      status: "sent" as const,
      sentAt: "2025-10-14",
    },
  ]);

  const stats = {
    totalInvoices: invoices.length,
    totalRevenue: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    draftInvoices: invoices.filter((inv) => inv.status === "draft").length,
    sentInvoices: invoices.filter((inv) => inv.status === "sent").length,
  };

  const handleGenerateInvoice = (data: {
    jobId: string;
    weekStartDate: string;
    weekEndDate: string;
  }) => {
    const job = jobs.find((j) => j.id === data.jobId);
    if (!job) return;

    const newInvoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      jobTitle: job.title,
      clientName: job.clientName || "Unknown Client",
      weekStart: data.weekStartDate,
      weekEnd: data.weekEndDate,
      totalHours: 40.0, // Mock calculation
      totalAmount: 2400.0, // Mock calculation
      status: "draft" as const,
    };

    setInvoices([newInvoice, ...invoices]);
  };

  const handleSendInvoice = (invoiceId: string) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, status: "sent" as const, sentAt: new Date().toISOString().split("T")[0] }
          : inv
      )
    );
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Generate and manage weekly invoices for clients
          </p>
        </div>
        <Button
          onClick={() => setGenerateDialogOpen(true)}
          data-testid="button-generate-invoice"
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invoices"
          value={stats.totalInvoices}
          icon={FileText}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatCard
          title="Draft Invoices"
          value={stats.draftInvoices}
          icon={Clock}
        />
        <StatCard
          title="Sent Invoices"
          value={stats.sentInvoices}
          icon={Send}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <Card key={invoice.id} data-testid={`card-invoice-${invoice.id}`}>
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-medium">
                      {invoice.id}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {invoice.jobTitle}
                    </p>
                  </div>
                </div>
                <Badge 
                  className={
                    invoice.status === "sent"
                      ? "bg-chart-2 text-white border-chart-2"
                      : "bg-chart-3 text-white border-chart-3"
                  }
                  data-testid={`badge-invoice-status-${invoice.status}`}
                >
                  {invoice.status === "sent" ? "Sent" : "Draft"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Client</p>
                    <p className="font-medium">{invoice.clientName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Week</p>
                    <p className="font-medium font-mono text-xs">
                      {invoice.weekStart} to {invoice.weekEnd}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Hours</p>
                    <p className="font-medium font-mono">
                      {invoice.totalHours}h
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-semibold">
                      ${invoice.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
                {invoice.sentAt && (
                  <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                    Sent on {invoice.sentAt}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    data-testid={`button-view-invoice-${invoice.id}`}
                  >
                    View Details
                  </Button>
                  {invoice.status === "draft" && (
                    <Button
                      size="sm"
                      onClick={() => handleSendInvoice(invoice.id)}
                      data-testid={`button-send-invoice-${invoice.id}`}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Send to Client
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <GenerateInvoiceDialog
        open={generateDialogOpen}
        onOpenChange={setGenerateDialogOpen}
        jobs={jobs}
        onGenerate={handleGenerateInvoice}
      />
    </div>
  );
}
