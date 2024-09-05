import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import key from "../assets/key.png";
import location_icon from "../assets/location.png";

const Schedule = ({ appointments, date, currentAppointment }) => {
  let pay = 0;
  appointments?.map((a) => (pay += a?.AproxPay));
  const navigate = useNavigate();
  function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    console.log(userAgent, "userAgent");
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
      return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
    return "unknown";
  }
  const getLocation = (e, a) => {
    e.stopPropagation();
    let text = [];
    if (a?.locationAddress) text.push(a?.locationAddress);
    if (a?.locationCity) text.push(a?.locationCity);
    if (a?.locationState) text.push(a?.locationState);
    if (a?.locationZip) text.push(a?.locationZip);
    console.log(getMobileOperatingSystem());
    if (getMobileOperatingSystem() === "iOS") {
      window.open(`https://maps.apple.com?q=${text.join(", ")}`, "_blank");
    } else {
      window.open(
        `https://maps.google.com/maps?f=d&t=h&saddr=${text.join(
          ", "
        )}&daddr=${text.join(", ")}`,
        "_blank"
      );
    }
  };

  const onClickSchedule = async (appointment) => {
    if (appointment?.jobStartTime) {
      navigate(`/Startjob/${appointment?.AppointmentId}`);
    } else {
      navigate(`/schedule_detail/${appointment?.AppointmentId}`);
    }
  };

  return (
    <>
      <div className="bg-white w-full rounded-lg sm:w-full">
        <div className="flex p-3 justify-between">
          <h2 className="text-grey-500">{moment(date).format("MMM D")}</h2>
          <p className="text-grey-500">
            Approx. Pay:{" "}
            <span className="font-semibold text-[red]">
              ${numeral(pay).format("0,0.00")}
            </span>
          </p>
        </div>
        {appointments?.map((appointment, id) => (
          <div
            onClick={() => onClickSchedule(appointment)}
            key={id}
            className="cursor-pointer relative "
          >
            <div
              className={`grid sm:grid-cols-1 grid-cols-3 gap-3 border-b border-dashed py-2 p-3 hover:bg-[#cccccc45] ${
                appointment?.AppointmentId ===
                  currentAppointment?.AppointmentId && "bg-green-200"
              }`}
            >
              <div className="sm:flex sm:items-center sm:gap-4">
                <p className="text-yellow-900 font-semibold text-sm">Start</p>
                <span className="sm:text-[12px]">{appointment?.startTime}</span>
              </div>
              <div className="sm:flex sm:items-center sm:gap-4">
                <p className="text-yellow-900 font-semibold text-sm">End</p>
                <span className="sm:text-[12px]">{appointment?.endTime}</span>
              </div>
              <div className="sm:flex sm:items-center sm:gap-4">
                <p className="text-yellow-900 font-semibold text-sm">Hrs</p>
                <span className="sm:text-[12px]">{appointment?.Hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-yellow-900 font-semibold text-sm">
                  Customer
                </p>
                <span className="text-grey-500 text-xs overflow-hidden whitespace-nowrap text-ellipsis pr-3">
                  {appointment?.CustomerName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-grey-500 text-xs">
                  {appointment?.CustomerCity}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-grey-500 text-xs">
                  {appointment?.Miles}
                </span>
              </div>
            </div>
            {appointment.Keys && (
              <div className="absolute -left-6 top-7 p-1 bg-[#1BD30B] rounded-l-full">
                <img src={key} alt="" />
              </div>
            )}
            <a
              onClick={(e) => getLocation(e, appointment)}
              className="absolute -right-7 top-7 bg-blue-300 pl-1 rounded-r-full cursor-pointer"
            >
              <img src={location_icon} alt="" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Schedule;
