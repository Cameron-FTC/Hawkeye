import { useState } from "react";
import { AddEmployeeDialog } from "../AddEmployeeDialog";
import { Button } from "../ui/button";

export default function AddEmployeeDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Add Employee Dialog</Button>
      <AddEmployeeDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(employee) => {
          console.log("New employee:", employee);
        }}
      />
    </div>
  );
}
