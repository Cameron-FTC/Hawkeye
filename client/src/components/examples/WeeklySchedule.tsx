import { WeeklySchedule } from "../WeeklySchedule";

export default function WeeklyScheduleExample() {
  const weekDays = [
    {
      date: "21",
      dayName: "Mon",
      items: [
        {
          id: "1",
          employeeName: "John S.",
          jobTitle: "Renovation",
          location: "Office A",
        },
        {
          id: "2",
          employeeName: "Sarah J.",
          jobTitle: "Maintenance",
          location: "Warehouse",
        },
      ],
    },
    {
      date: "22",
      dayName: "Tue",
      items: [
        {
          id: "3",
          employeeName: "Mike D.",
          jobTitle: "Installation",
          location: "Client Site",
        },
      ],
    },
    {
      date: "23",
      dayName: "Wed",
      items: [],
    },
    {
      date: "24",
      dayName: "Thu",
      items: [
        {
          id: "4",
          employeeName: "Emma W.",
          jobTitle: "Inspection",
          location: "Building B",
        },
        {
          id: "5",
          employeeName: "John S.",
          jobTitle: "Renovation",
          location: "Office A",
        },
        {
          id: "6",
          employeeName: "Sarah J.",
          jobTitle: "Setup",
          location: "Warehouse",
        },
      ],
    },
    {
      date: "25",
      dayName: "Fri",
      items: [],
    },
    {
      date: "26",
      dayName: "Sat",
      items: [],
    },
    {
      date: "27",
      dayName: "Sun",
      items: [],
    },
  ];

  return (
    <div className="p-4">
      <WeeklySchedule
        weekDays={weekDays}
        onPreviousWeek={() => console.log("Previous week")}
        onNextWeek={() => console.log("Next week")}
        onDayClick={(date) => console.log("Clicked day:", date)}
      />
    </div>
  );
}
