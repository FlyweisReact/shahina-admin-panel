/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";

const Calender = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const calendar = [];

    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDay) || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      calendar.push(week);
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const calendar = generateCalendar();

  //   New Code

  const token = localStorage.getItem("token");
  const [loader, setLoader] = useState(true);
  const [list, setList] = useState();
  const [fMonth, setFmonth] = useState();
  const [fYear, setFyear] = useState();
  const [currentMonth, setCurrentMonth] = useState();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const tenyears = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const prevyears = [];
  for (let i = 0; i < tenyears.length; i++) {
    prevyears.push(year - tenyears[i]);
  }

  function getlist() {
    const data = {
      month: month,
      year: year,
      limit: 100,
      page: 1,
    };

    axios
      .post(baseurl + "api/v1/user/userAttendancList", data, {
        headers: {
          token: token,
        },
      })
      .then((r) => {
        if (r.data.responseCode === 200) {
          setLoader(false);
          setList(r.data.result.docs);
          setCurrentMonth(monthNames[r.data.result.docs[0].month - 1]);
        } else {
          setLoader(false);
        }
      });
  }

  function getfilterlist() {
    const data = {
      month: fMonth,
      year: fYear,
      limit: 100,
      page: 1,
    };

    axios
      .post(baseurl + "api/v1/user/userAttendancList", data, {
        headers: {
          token: token,
        },
      })
      .then((r) => {
        setList(r.data.result.docs);
        setCurrentMonth(monthNames[r.data.result.docs[0].month - 1]);
      });
  }

  const [popupshow, setPopupshow] = useState("");
  const [popid, setPopId] = useState("");
  const [popDate, setPopDate] = useState("");
  const showdeletepop = (e) => {
    setPopupshow("show-confirm-popup");
    setPopId(e.id);
    setPopDate(e.date);
  };

  const reqPresent = (e) => {
    e.preventDefault();
    const data = {
      _id: e.target.id.value,
      requestPunchIn: e.target.requestPunchIn.value + ":00",
      requestPunchOut: e.target.requestPunchOut.value + ":00",
    };
    axios
      .put(baseurl + "api/v1/user/sendAttendanceRequest", data, {
        headers: {
          token: token,
        },
      })
      .then((r) => {
        if (r.data.responseCode === 200) {
          getlist();
          setPopupshow("");
        }
      });
  };

  useEffect(() => {
    getlist();
    setFmonth(month);
    setFyear(year);
  }, []);

  if (loader === true) {
    return (
      <div className="loader">
        <span></span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={handlePrevMonth}>Previous Month</button>
        <h1>
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h1>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>

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
            {calendar.map((week, index) => (
              <tr key={index}>
                {week.map((day, index) => (
                  <td key={index}>{day !== null ? day : ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Code */}
      <div className="right-section-box">
        <div className="content-area">
          <div className="page-header">
            <div className="flex gap-5 items-end">
              <h2 className="head-title">Attendance</h2>
              <div className="breadcumb">
                <Link to="/company/dashboard">Dashboard</Link>{" "}
                <span>&gt;&gt; Attendance</span>
              </div>
            </div>
          </div>
          <div className="content-box">
            <div className="list-view-header items-center flex-wrap lg:flex-nowrap">
              <h3>Attendance List</h3>

              <div className="filters">
                <div className="flex gap-5 w-full">
                  <div className="form-group">
                    <label htmlFor="">Month</label>
                    <select
                      className="form-control"
                      onChange={(e) => setFmonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Year</label>
                    <select
                      className="form-control"
                      onChange={(e) => setFyear(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {prevyears.map((v, i) => {
                        return (
                          <option value={v} key={i}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">&nbsp;</label>
                    <button
                      className="btn btn-main"
                      onClick={() => getfilterlist()}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pb-5 justify-between mt-5 lg:mt-0">
              <div className="left text-xl">
                <b>{currentMonth}</b>
              </div>
              <div className="right flex gap-3">
                <button className="btn bg-green-500 text-white">
                  Print Report
                </button>
              </div>
            </div>
            <div className="list-view">
              <div className="calander-box">
                <div className="calander-header">
                  <div className="">Date</div>
                  <div className="">Status</div>
                  <div className="">Punch In</div>
                  <div className="">Punch In Location</div>
                  <div className="">In Type</div>
                  <div className="">Punch In Selfie</div>
                  <div className="">Punch Out</div>
                  <div className="">Punch Out Location</div>
                  <div className="">Out Type</div>
                  <div className="">Punch Out Selfie</div>
                  <div className="">Lunch Time</div>
                  <div className="">Working Time</div>
                  <div className="">Total Time</div>
                  <div className="">Day Status</div>
                  <div className="">Action</div>
                </div>
                <div className="calander-body ">
                  {list?.length > 0 ? (
                    list?.map((v, i) => {
                      return (
                        <div className="calander-body-inner">
                          <div className="flex items-center justify-center">
                            {v.date},({v.day})
                          </div>
                          <div className="flex items-center  justify-center">
                            {v.attendanceStatus}
                          </div>
                          <div className="flex items-center  justify-center">
                            {v.requestStatus === "PENDING"
                              ? "Request Punch In: " + v.requestPunchIn
                              : ""}

                            {v.punchIn}
                            <br />
                            {v.inType === "LATEIN" ? "Late In" : ""}
                            {v.inType === "ONTIME" ? "On Time" : ""}
                          </div>
                          <div className="flex items-center  justify-center">
                            {v.punchInLocationWord}
                          </div>

                          <div className="flex items-center  justify-center">
                            {v.requestStatus === "PENDING"
                              ? "Req: " + v.requestPunchIn
                              : v.inType}
                          </div>

                          <div className="flex items-center  justify-center">
                            {v.punchInSelfie !== "" ? (
                              <img
                                src={v.punchInSelfie}
                                style={{ height: "50px", display: "inline" }}
                              />
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="flex items-center  justify-center">
                            {v.requestStatus === "PENDING"
                              ? "Request Punch Out: " + v.requestPunchOut
                              : ""}
                            {v.punchOut}
                            <br />
                            {v.outType === "EARLY_OUT" ? "Early Out" : ""}
                            {v.outType === "ONTIME" ? "On Time" : ""}
                          </div>
                          <div className="flex items-center  justify-center">
                            {v.punchOutLocationWord}
                          </div>

                          <div className="flex items-center  justify-center">
                            {v.requestStatus === "PENDING"
                              ? "Req: " + v.requestPunchOut
                              : v.outType}
                          </div>

                          <div className="flex items-center  justify-center">
                            {v.punchOutSelfie !== "" ? (
                              <img
                                src={v.punchOutSelfie}
                                style={{ height: "50px", display: "inline" }}
                              />
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="flex items-center  justify-center">
                            {v.totalLunchtime} Hours
                          </div>
                          <div className="flex items-center  justify-center">
                            {v.workingTime}
                          </div>
                          <div className="flex items-center justify-center">
                            {v.totalTime}
                          </div>
                          <div className="flex items-center justify-center">
                            {v.dayStatus}
                          </div>
                          <div className="flex items-center  justify-center">
                            {v.requestStatus === "PENDING" ? (
                              "Present Request Sent! (Status: Pending)"
                            ) : v.dayStatus === "ABSENT" ? (
                              <button
                                className="btn-sm btn-main px-1"
                                onClick={() =>
                                  showdeletepop({
                                    id: v._id,
                                    date: v.date,
                                  })
                                }
                              >
                                Request For Present
                              </button>
                            ) : (
                              "Done!"
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="p-2 text-center">No data Found</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <p>
                  <b>Legends:</b>
                </p>
                <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                  <span className="border px-2 text-xs">P = Present</span>
                  <span className="border px-2 text-xs">A = Absent</span>
                  <span className="border px-2 text-xs">HD = Half Day</span>
                  <span className="border px-2 text-xs">L = Leave</span>
                  <span className="border px-2 text-xs">HO = Holiday</span>
                  <span className="border px-2 text-xs">WO = Week Off</span>
                </div>
              </div>
            </div>
          </div>

          <div className={"confirm-popup " + popupshow}>
            <div className="confirm-popup-box">
              <div
                className="confirm-popup-overlay"
                onClick={() => setPopupshow("")}
              ></div>
              <div className="confirm-popup-box-inner">
                <div className="confirm-popup-header">
                  <p>Sending Request For Mark Present For This Date:</p>
                </div>
                <div className="confirm-popup-body">
                  <p>
                    <b>Date:</b> {popDate}
                  </p>

                  <div className="confirm-popup-body-box">
                    <form onSubmit={reqPresent}>
                      <input type="hidden" value={popid} name="id" />
                      <div className="flex mb-3 gap-3 justify-center">
                        <div className="w-1/2">
                          <input
                            type="time"
                            className="form-control"
                            name="requestPunchIn"
                          />
                        </div>
                        <div className="w-1/2">
                          <input
                            type="time"
                            className="form-control"
                            name="requestPunchOut"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <button className="delete">Yes</button>
                        <button
                          className="nodelete"
                          type="button"
                          onClick={() => setPopupshow("")}
                        >
                          No
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Calender);
