import { useState } from "react";
import { Plus, Package, MapPin, User, QrCode } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAssetSchema, insertAssetScanSchema, type InsertAsset, type InsertAssetScan } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

type AssetWithDetails = {
  id: string;
  title: string;
  customTag?: string | null;
  description?: string | null;
  status: string;
  locationName?: string | null;
  lastCheckedOutBy?: string | null;
  lastScanAt?: Date | null;
};

export default function AssetsPage() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const businessId = "mock-business-id"; // TODO: Get from auth context
  
  // Fetch assets from API
  const { data: assets = [], isLoading: assetsLoading } = useQuery<AssetWithDetails[]>({
    queryKey: ["/api/assets", { businessId }],
  });

  // Fetch locations from API
  const { data: locations = [], isLoading: locationsLoading } = useQuery<Array<{ id: string; name: string }>>({
    queryKey: ["/api/locations", { businessId }],
  });

  // Add asset mutation
  const addAssetMutation = useMutation({
    mutationFn: async (data: InsertAsset) => {
      return await apiRequest("POST", "/api/assets", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      toast({
        title: "Asset added",
        description: "The asset has been successfully added to the register.",
      });
      setDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add asset. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Checkout/checkin mutation
  const scanAssetMutation = useMutation({
    mutationFn: async ({ assetId, scanType }: { assetId: string; scanType: string }) => {
      const scanData: InsertAssetScan = {
        assetId,
        employeeId: "mock-employee-id", // TODO: Get from auth context
        scanType,
        notes: scanType === "check-out" ? "Checked out via web interface" : "Checked in via web interface",
      };
      return await apiRequest("POST", "/api/asset-scans", scanData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      toast({
        title: variables.scanType === "check-out" ? "Asset checked out" : "Asset checked in",
        description: `The asset has been ${variables.scanType === "check-out" ? "checked out" : "checked in"} successfully.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update asset status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = (assetId: string, currentStatus: string) => {
    const scanType = currentStatus === "checked_out" || currentStatus === "in-use" ? "check-in" : "check-out";
    scanAssetMutation.mutate({ assetId, scanType });
  };

  const form = useForm<InsertAsset>({
    resolver: zodResolver(insertAssetSchema.extend({
      businessId: insertAssetSchema.shape.businessId.default("mock-business-id"),
    })),
    defaultValues: {
      businessId: "mock-business-id",
      title: "",
      customTag: "",
      description: "",
      locationId: "",
      status: "available",
    },
  });

  const onSubmit = async (data: InsertAsset) => {
    addAssetMutation.mutate(data);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary"> = {
      available: "secondary",
      checked_out: "default",
      "in-use": "default",
      maintenance: "default",
    };
    
    const labels: Record<string, string> = {
      available: "Available",
      checked_out: "Checked Out",
      "in-use": "In Use",
      maintenance: "Maintenance",
    };
    
    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Asset Register</h1>
          <p className="text-muted-foreground">
            Track and manage your equipment and assets
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-asset">
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
              <DialogDescription>
                Register a new asset in your inventory system.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Drill - DeWalt DCD771"
                          data-testid="input-asset-title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customTag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Tag / Serial Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., TOOL-001"
                          data-testid="input-asset-tag"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional details about this asset..."
                          data-testid="input-asset-description"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Location</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        data-testid="select-asset-location"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    data-testid="button-cancel-asset"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-submit-asset">
                    Add Asset
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assets</CardTitle>
          <CardDescription>
            View and manage all registered assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Tag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Checked Out By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Package className="h-12 w-12" />
                      <p>No assets registered yet</p>
                      <p className="text-sm">Add your first asset to get started</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                assets.map((asset) => (
                  <TableRow key={asset.id} data-testid={`row-asset-${asset.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium" data-testid={`text-asset-title-${asset.id}`}>
                            {asset.title}
                          </div>
                          {asset.description && (
                            <div className="text-sm text-muted-foreground">
                              {asset.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {asset.customTag && (
                        <div className="flex items-center gap-1 text-sm">
                          <QrCode className="h-3 w-3" />
                          {asset.customTag}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(asset.status)}
                    </TableCell>
                    <TableCell>
                      {asset.locationName && (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {asset.locationName}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {asset.lastCheckedOutBy ? (
                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-3 w-3 text-muted-foreground" />
                          {asset.lastCheckedOutBy}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCheckout(asset.id, asset.status)}
                        disabled={scanAssetMutation.isPending}
                        data-testid={`button-checkout-${asset.id}`}
                      >
                        {asset.status === "checked_out" || asset.status === "in-use" ? "Check In" : "Check Out"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
