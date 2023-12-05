/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";

const Calendar = ({ month, year, events, onPrevMonth, onNextMonth }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

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
      <div className="month-navigation">
        <button onClick={onPrevMonth}>&lt; Prev Month</button>
        <h3>
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
          }).format(new Date(year, month, 1))}
        </h3>
        <button onClick={onNextMonth}>Next Month &gt;</button>
      </div>

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
                    {day !== null ? day : ""}
                  </div>
              
                    <div className="bookings">
                      <span className="time">12:00 PM</span>
                      <span className="subject">Propeel</span>
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

  //   -----
  const handlePrevMonth = () => {
    setNewEvent((prevEvent) => {
      const prevMonth = new Date(prevEvent.date);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return { ...prevEvent, date: prevMonth };
    });
  };

  const handleNextMonth = () => {
    setNewEvent((prevEvent) => {
      const nextMonth = new Date(prevEvent.date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return { ...prevEvent, date: nextMonth };
    });
  };

  //   ----
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data);
      setLoading(false);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const events = data?.flatMap((order) =>
    order?.orders?.flatMap((item) =>
      item?._doc?.services?.map((service) => ({
        Subject: service.serviceId?.name,
        StartTime: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        EndTime: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        Id: item?._doc?._id,
        serviceId: service?.serviceId?._id,
        Time: item?._doc?.time,
        FirstName: item?._doc?.user?.firstName,
        LastName: item?._doc?.user?.lastName,
        userEmail: item?._doc?.user?.email,
        userPhone: item?._doc?.user?.phone,
      }))
    )
  );

  return (
    <>

      <div>
        <Calendar
          month={newEvent.date.getMonth()}
          year={newEvent.date.getFullYear()}
          events={events}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </>
  );
};

export default HOC(Calender);
