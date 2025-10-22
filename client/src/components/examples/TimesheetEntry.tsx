import { TimesheetEntry } from "../TimesheetEntry";

export default function TimesheetEntryExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <TimesheetEntry
        id="1"
        employeeName="John Smith"
        jobTitle="Office Renovation - Phase 1"
        location="Downtown Office Building"
        clockIn="08:00"
        clockOut="16:30"
        totalHours="8.0"
        status="pending"
        onApprove={() => console.log("Approve timesheet 1")}
        onReject={() => console.log("Reject timesheet 1")}
      />
      <TimesheetEntry
        id="2"
        employeeName="Sarah Johnson"
        jobTitle="Equipment Maintenance"
        location="Warehouse District"
        clockIn="09:00"
        clockOut="17:00"
        totalHours="7.5"
        status="approved"
      />
      <TimesheetEntry
        id="3"
        employeeName="Mike Davis"
        jobTitle="Installation Project"
        location="Client Site A"
        clockIn="07:30"
        status="pending"
        onApprove={() => console.log("Approve timesheet 3")}
        onReject={() => console.log("Reject timesheet 3")}
      />
    </div>
  );
}
