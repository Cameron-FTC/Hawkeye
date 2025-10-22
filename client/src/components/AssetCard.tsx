import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { QrCode, MapPin } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface AssetCardProps {
  id: string;
  tag: string;
  title: string;
  location?: string;
  status: "active" | "pending" | "completed" | "cancelled";
  onScan?: () => void;
}

export function AssetCard({
  id,
  tag,
  title,
  location,
  status,
  onScan,
}: AssetCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-asset-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p
                className="text-xs font-mono text-muted-foreground"
                data-testid={`text-asset-tag-${id}`}
              >
                {tag}
              </p>
              <StatusBadge status={status} showIcon={false} />
            </div>
            <h3
              className="font-medium mb-2 truncate"
              data-testid={`text-asset-title-${id}`}
            >
              {title}
            </h3>
            {location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate" data-testid={`text-asset-location-${id}`}>
                  {location}
                </span>
              </div>
            )}
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={onScan}
            data-testid={`button-scan-${id}`}
          >
            <QrCode className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
