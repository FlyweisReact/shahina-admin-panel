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
import { Modal } from "react-bootstrap";

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
  //   const ViewApointment = (args) => {
  //     const [data, setData] = useState(null);

  //     const fetchHandler = async () => {
  //       try {
  //         const { data } = await axios.get(
  //           `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${args.event.serviceId}`
  //         );
  //         setData(data.data);
  //       } catch {}
  //     };

  //     useEffect(() => {
  //       fetchHandler();
  //     }, []);

  //     const filterdServices =
  //       data != null &&
  //       data?.services?.filter(
  //         (i) => i.serviceId?._id === args.event?.serviceId
  //       );

  //       console.log(filterdServices)
  //     alert("Clicked");
  //     args.cancel = true;
  //   };

  function MyVerticallyCenteredModal(props) {
    const [data, setData] = useState(null);

    const fetchHandler = async () => {
      try {
        const { data } = await axios.get(
          `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${props.event?.id}`
        );
        setData(data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchHandler();
      }
    }, [props]);

    const filterdServices =
      data != null &&
      data?.services?.filter(
        (i) => i.serviceId?._id === props.event?.serviceId
      );

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="Schedule_Enquiry_Modal">
          {data != null && (
            <>
              <div className="close_btn">
                <h4>{filterdServices?.[0]?.serviceId?.name}</h4>
                <i className="fa-solid fa-x" onClick={() => props.onHide()}></i>
              </div>
              <p>{filterdServices?.[0]?.serviceId?.description}</p>
              <p>Service Price : ${filterdServices?.[0]?.serviceId?.price} </p>
              <p>Time : {data?.time} </p>
              <p>Membership : ${data?.memberShip} </p>
              <p>Membership Percentage : {data?.memberShipPer}% </p>
              <p>Offer Discount : ${data?.offerDiscount} </p>
              <p>Payment Status : {data?.paymentStatus} </p>
              <p>User First name : {data?.user?.firstName} </p>
              <p>User Last Name : {data?.user?.lastName} </p>
              <p>User Gender : {data?.user?.gender} </p>
              <p>User Email : {data?.user?.email} </p>
              <p>User Phone Number : {data?.user?.phone} </p>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div style={{ padding: "50px", marginTop: "100px" }}>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={selectedEvent}
      />{" "}
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: events }}
        eventClick={MyVerticallyCenteredModal}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default NewCal;
