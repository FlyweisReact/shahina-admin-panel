/** @format */

import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";

export const AppointmentCanvas = ({ show, handleClose }) => {
  const [type, setType] = useState("");
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>New Appointment</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="selector">
        <ul>
            <li>Info</li>
            <li>Notes</li>
            <li>Payments</li>
            <li></li>
        </ul>

        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
