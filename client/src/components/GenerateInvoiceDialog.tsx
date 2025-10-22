import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

interface GenerateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobs?: Array<{
    id: string;
    title: string;
    clientName?: string;
    location?: string;
  }>;
  onGenerate?: (data: {
    jobId: string;
    weekStartDate: string;
    weekEndDate: string;
  }) => void;
}

export function GenerateInvoiceDialog({
  open,
  onOpenChange,
  jobs = [],
  onGenerate,
}: GenerateInvoiceDialogProps) {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [weekStart, setWeekStart] = useState<string>("");

  const getWeekEnd = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end.toISOString().split("T")[0];
  };

  const handleGenerate = () => {
    if (!selectedJob || !weekStart) {
      toast({
        title: "Validation Error",
        description: "Please select a job and week start date",
        variant: "destructive",
      });
      return;
    }

    const weekEnd = getWeekEnd(weekStart);
    
    onGenerate?.({
      jobId: selectedJob,
      weekStartDate: weekStart,
      weekEndDate: weekEnd,
    });

    toast({
      title: "Invoice Generated",
      description: `Invoice for week ${weekStart} to ${weekEnd} has been created`,
    });

    setSelectedJob("");
    setWeekStart("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-generate-invoice">
        <DialogHeader>
          <DialogTitle>Generate Weekly Invoice</DialogTitle>
          <DialogDescription>
            Create an invoice for a job's weekly hours and send to the assigned client
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="job">Job / Location</Label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger data-testid="select-invoice-job">
                <SelectValue placeholder="Select a job" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title} {job.location && `- ${job.location}`}
                    {job.clientName && ` (${job.clientName})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="weekStart">Week Start Date</Label>
            <div className="relative">
              <input
                type="date"
                id="weekStart"
                value={weekStart}
                onChange={(e) => setWeekStart(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                data-testid="input-week-start"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {weekStart && (
              <p className="text-xs text-muted-foreground">
                Week: {weekStart} to {getWeekEnd(weekStart)}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-generate-invoice"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            data-testid="button-submit-generate-invoice"
          >
            Generate & Send Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
