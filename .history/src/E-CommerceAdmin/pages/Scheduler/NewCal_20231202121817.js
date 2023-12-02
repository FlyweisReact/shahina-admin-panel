/** @format */

import React, { useEffect, useRef, useState } from "react";
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
import { Internationalization, isNullOrUndefined } from "@syncfusion/ej2-base";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";
import SpinnerComp from "../Component/SpinnerComp";

const token = localStorage.getItem("AdminToken");
const Auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const NewCal = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [service, setServices] = useState([]);
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    quantity: 1,
    userId,
    date,
    time,
  };

  const addInCart = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/service/${productId}`,
        payload,
        Auth
      );
      toast.success(data.message);
      fetchHandler();
    } catch (e) {
      console.log(e);
    }
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

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/getAllUser`
      );
      setUsers(data.data);
    } catch {}
  };

  const fetchService = async () => {
    try {
      const res = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/Service/all/paginateServiceSearch`
      );
      const data = res.data.data?.docs;
      setServices(data);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
    fetchUsers();
    fetchService();
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

  let titleObj = useRef(null);

  const intl = new Internationalization();

  const getHeaderTitle = (data) => {
    return data?.Id ? "Appointment Details" : "Add Appointment";
  };

  const getHeaderDetails = (data) => {
    return (
      intl.formatDate(data.StartTime, { type: "date", skeleton: "full" }) +
      " (" +
      intl.formatDate(data.StartTime, { skeleton: "hm" }) +
      " - " +
      intl.formatDate(data.EndTime, { skeleton: "hm" }) +
      ")"
    );
  };

  const onPopupOpen = (args) => {
    if (
      args.target &&
      !args.target.classList.contains("e-appointment") &&
      !isNullOrUndefined(titleObj) &&
      !isNullOrUndefined(titleObj.current)
    ) {
      titleObj.current.focusIn();
    }
  };

  const headerTemplate = (props) => {
    return (
      <div className="quick-info-header">
        <div className="quick-info-header-content" style={{ color: "black" }}>
          <div className="quick-info-title">{getHeaderTitle(props)}</div>
          <div className="duration-text">{getHeaderDetails(props)}</div>
        </div>
      </div>
    );
  };

  const contentTemplate = (props) => {
    const [idd, setIdd] = useState("");
    return <div>NewCal</div>;
  };

  const contentTemplate = (props) => {
    const [idd, setIdd] = useState("");

    return props?.Id ? (
      <div className="Schedule_Enquiry_Modal">
        <div className="close_btn">
          <h4>{props.Subject}</h4>
        </div>

        <p> First name : {props.FirstName} </p>
        <p> Last name : {props.LastName} </p>
        <p> User Email : {props.userEmail} </p>
        <p> Phone Number : {props.userPhone} </p>
      </div>
    ) : (
      <div className="Add_Service_Modal">
        <form onSubmit={addInCart}>
          <select onChange={(e) => setProductId(e.target.value)}>
            <option>Select Service</option>
            {service?.map((i, index) => (
              <option key={index} value={i._id}>
                {" "}
                {i.name}{" "}
              </option>
            ))}
          </select>
          <select onChange={(e) => setUserId(e.target.value)}>
            <option>Select User</option>
            {users?.map((i, index) => (
              <option key={index} value={i._id}>
                {" "}
                {i.firstName + " " + i.lastName}{" "}
              </option>
            ))}
          </select>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <input type="time" onChange={(e) => setTime(e.target.value)} />
          <button className="Add_Service_Modal_button" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  };

  const footerTemplate = () => {
    return <div className="quick-info-footer"></div>;
  };

  return loading ? (
    <SpinnerComp />
  ) : (
    <div
      style={{ padding: "50px", marginTop: "100px" }}
      className="Calender_App"
    >
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: events }}
        quickInfoTemplates={{
          header: headerTemplate.bind(this),
          content: contentTemplate.bind(this),
          footer: footerTemplate.bind(this),
        }}
        popupOpen={onPopupOpen.bind(this)}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default HOC(NewCal);
