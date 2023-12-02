/** @format */

import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import axios from "axios";

const token = localStorage.getItem("AdminToken");
const Auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const NewCal = () => {
  const [data, setData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data);
    } catch {}
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
      }))
    )
  );

  //   View Appointment
  const ViewApointment = (args) => {
    const [data, setData] = useState(null);

    const fetchHandler = async () => {
      try {
        const { data } = await axios.get(
          `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${args.event.serviceId}`
        );
        setData(data.data);
      } catch {}
    };

    useEffect(() => {
      fetchHandler();
    }, []);

    const filterdServices =
      data != null &&
      data?.services?.filter(
        (i) => i.serviceId?._id === args.event?.serviceId
      );


      console.log(filterdServices)
    alert("Clicked");
    args.cancel = true;
  };

  return (
    <div style={{ padding: "50px", marginTop: "100px" }}>
      {" "}
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: events }}
        eventClick={ViewApointment}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default NewCal;