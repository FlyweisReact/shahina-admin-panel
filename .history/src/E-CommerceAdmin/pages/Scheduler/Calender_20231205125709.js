/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HOC from "../../layout/HOC";

const Calendar = ({ month, year, events }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getDaysArray = () => {
    const daysArray = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (
          (i === 0 && j < firstDayOfMonth) ||
          (day > daysInMonth && i === 0)
        ) {
          week.push(null);
        } else if (day <= daysInMonth) {
          week.push(day);
          day++;
        }
      }
      daysArray.push(week);
    }

    return daysArray;
  };

  const renderEvents = (day) => {
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });

    return dayEvents.map((event, index) => (
      <div key={index} className="event">
        {event.title}
      </div>
    ));
  };

  const daysArray = getDaysArray();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="customize_calender">
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysArray.map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => (
                <td key={index}>
                  <div class="e-date-header e-navigate">
                    {" "}
                    {day !== null ? day : ""} <span> {renderEvents(day)} </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Calender = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      date,
    }));
  };

  const handleAddEvent = () => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setNewEvent({
      title: "",
      date: new Date(),
    });
  };

  return (
    <>
      <div className="scheduler-container">
        <h2>Scheduler</h2>
        <div>
          <label>
            Event Title:
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Event Date:
            <input
              type="date"
              name="date"
              value={newEvent.date.toISOString().split("T")[0]}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
          </label>
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
      </div>

      <div>
        <h3>Upcoming Events</h3>
        <Calendar
          month={newEvent.date.getMonth()}
          year={newEvent.date.getFullYear()}
          events={events}
        />
      </div>
    </>
  );
};

export default HOC(Calender);
