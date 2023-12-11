/** @format */
import { useState, useEffect } from "react";
import { Offcanvas, Modal } from "react-bootstrap";

const UserDetailCanvas = ({ show, handleClose }) => {
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [textToCopy, setTextToCopy] = useState("Text to be copied");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        style={{ top: "65%" }}
        className="text_Modal"
      >
        {type === "phone" ? (
          <>
            <div className="phone_dialoag">
              <p>Call phone</p>
              <p>Send message</p>
              <p onClick={handleCopyToClipboard}> Copy phone</p>
            </div>
            <div className="close_btn" onClick={() => setModalShow(false)}>
              <p>Close</p>
            </div>
          </>
        ) : (
          <>
            <div className="phone_dialoag">
              <p>Call phone</p>
              <p>Send message</p>
              <p onClick={handleCopyToClipboard}> Copy Email Address</p>
            </div>
            <div className="close_btn" onClick={() => setModalShow(false)}>
              <p>Close</p>
            </div>
          </>
        )}
      </Modal>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Body style={{ padding: 0, backgroundColor: "#dedddc" }}>
          <div className="user_detail_canvas">
            <div className="white_backgroud">
              <div className="user_detail">
                <div className="img">L</div>
                <div className="content">
                  <p className="heading">LeRon Rich Sr.</p>
                  <p
                    className="faded"
                    onClick={() => {
                      setType("phone");
                      setTextToCopy(" +1 214-280-4084");
                      setModalShow(true);
                    }}
                  >
                    +1 214-280-4084{" "}
                  </p>
                 
                  <p
                    className="faded"
                    onClick={() => {
                      setType("email");
                      setTextToCopy("mrrichierich2521@yahoo.com");
                      setModalShow(true);
                    }}
                  >
                    mrrichierich2521@yahoo.com{" "}
                  </p>
                </div>
              </div>
              <div className="tags">
                <span>New Client</span>
              </div>

              <div className="btns_upper">
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <button>Book now</button>
              </div>
            </div>

            <div className="activity_dialog">
              <div className="heading">
                <h5>Activity</h5>
                <select>
                  <option>All Activity</option>
                </select>
              </div>
              <span className="faded_span">upcoming</span>
            </div>

            <div className="white_backgroud">
              <div className="appointment_details">
                <div className="dates_stuff">
                  <div className="date">
                    <p className="day">2</p>
                    <p className="mth">DEC</p>
                  </div>
                  <div className="content_stuff">
                    <p className="head">Appointment</p>
                    <p className="faded">Sat, 02 December at 11:30am </p>
                    <span>Booked</span>
                  </div>
                </div>

                <div className="service_details">
                  <div>
                    <p className="title"> jeTOP Hair Loses Treatment </p>
                    <p className="faded"> 2h </p>
                  </div>
                  <p className="price"> $199 </p>
                </div>

                <div className="notes">
                  <p className="heading">Appointment note</p>
                  <p className="faded"> Every time $199 </p>
                  <button>
                    <i className="fa-solid fa-credit-card"></i>
                    Checkout
                  </button>
                </div>
              </div>
            </div>

            <div className="activity_dialog">
              <span className="faded_span">Past</span>
            </div>
            <div className="white_backgroud">
              <div className="appointment_details">
                <div className="dates_stuff">
                  <div className="date">
                    <p className="day">10</p>
                    <p className="mth">NOV</p>
                  </div>
                  <div className="content_stuff">
                    <p className="head">Appointment</p>
                    <p className="faded">Sat, 02 December at 11:30am </p>
                    <span>Booked</span>
                  </div>
                </div>

                <div className="service_details">
                  <div>
                    <p className="title"> jeTOP Hair Loses Treatment </p>
                    <p className="faded"> 2h </p>
                  </div>
                  <p className="price"> $199 </p>
                </div>

                <div className="notes">
                  <p className="heading">Appointment note</p>
                  <p className="faded"> Every time $199 </p>
                  <button>
                    <i className="fa-solid fa-credit-card"></i>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <div className="white_backgroud">
              <div className="appointment_details">
                <div className="dates_stuff">
                  <div className="date">
                    <p className="day">10</p>
                    <p className="mth">NOV</p>
                  </div>
                  <div className="content_stuff">
                    <p className="head">Appointment</p>
                    <p className="faded">Sat, 02 December at 11:30am </p>
                    <span>Booked</span>
                  </div>
                </div>

                <div className="service_details">
                  <div>
                    <p className="title"> jeTOP Hair Loses Treatment </p>
                    <p className="faded"> 2h </p>
                  </div>
                  <p className="price"> $199 </p>
                </div>

                <div className="notes">
                  <p className="heading">Appointment note</p>
                  <p className="faded"> Every time $199 </p>
                  <button>
                    <i className="fa-solid fa-credit-card"></i>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserDetailCanvas;
