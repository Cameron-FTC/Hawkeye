import { AssetCard } from "../AssetCard";

export default function AssetCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <AssetCard
        id="1"
        tag="AST-001"
        title="Laptop - Dell XPS 15"
        location="Office Building A"
        status="active"
        onScan={() => console.log("Scan asset 1")}
      />
      <AssetCard
        id="2"
        tag="AST-002"
        title="Drill Kit - Makita"
        location="Warehouse B"
        status="pending"
        onScan={() => console.log("Scan asset 2")}
      />
      <AssetCard
        id="3"
        tag="AST-003"
        title="Safety Vest"
        status="completed"
        onScan={() => console.log("Scan asset 3")}
      />
    </div>
  );
}
