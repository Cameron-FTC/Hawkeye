import { useState } from "react";
import { ClockInButton } from "../ClockInButton";

export default function ClockInButtonExample() {
  const [isClockedIn, setIsClockedIn] = useState(false);

  return (
    <div className="max-w-md mx-auto p-4">
      <ClockInButton
        isClockedIn={isClockedIn}
        currentJob={
          isClockedIn
            ? {
                title: "Office Renovation - Phase 1",
                location: "Downtown Office Building",
              }
            : undefined
        }
        clockInTime={isClockedIn ? "08:00 AM" : undefined}
        onClockIn={() => {
          setIsClockedIn(true);
          console.log("Clocked in");
        }}
        onClockOut={() => {
          setIsClockedIn(false);
          console.log("Clocked out");
        }}
      />
    </div>
  );
}
