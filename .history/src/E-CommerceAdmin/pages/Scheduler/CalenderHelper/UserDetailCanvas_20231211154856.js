/** @format */
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";

const UserDetailCanvas = ({ show, handleClose }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Body style={{ padding: "0" }}>
        <div className="user_detail_canvas">
            <div className="user_detail">
              <div className="img">L</div>
              <div className="content">
                <p className="heading">LeRon Rich Sr.</p>
                <p className="faded">+1 214-280-4084 </p>
                <p className="faded">mrrichierich2521@yahoo.com </p>
              </div>
            </div>
            <div className="tags">
            <span></span>

            </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserDetailCanvas;