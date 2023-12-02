import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";

const NewCal = () => {
  // Sample static data for today's date
  const currentDate = new Date();
  const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );
  const endOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59
  );

  const staticData = [
    {
      title: "Meeting 1",
      start: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        10,
        0
      ),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        12,
        0
      ),
    },
    {
      title: "Meeting 2",
      start: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        14,
        0
      ),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        16,
        0
      ),
    },
    {
      title: "Event 3",
      start: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        9,
        0
      ),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        11,
        0
      ),
    },
  ].filter(
    (event) =>
      event.start >= startOfDay && event.start <= endOfDay // Only check the start time
  );

  return (
    <div>
      <ScheduleComponent
        currentView="Day"
        eventSettings={{ dataSource: staticData }}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default NewCal;