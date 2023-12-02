/** @format */

import React from "react";
import { Offcanvas, Tabs, Tab } from "react-bootstrap";

export const AppointmentCanvas = ({ show, handleClose }) => {
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
      <Offcanvas.Body>
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="info" title="Home">
            Tab content for Home
          </Tab>
          <Tab eventKey="notes" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="longer-tab" title="Loooonger Tab">
            Tab content for Loooonger Tab
          </Tab>
        </Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
