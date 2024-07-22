import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";
import key from "../assets/key.png";
import location_icon from "../assets/location.png";

const Schedule = ({ appointments, date, currentAppointment, location }) => {
  let pay = 0;
  appointments?.map((a) => (pay += a?.AproxPay));
  const navigate = useNavigate();
  const getLocation = (e, a) => {
    e.stopPropagation();
    let text = [];
    if (a?.locationAddress) text.push(a?.locationAddress);
    if (a?.locationCity) text.push(a?.locationCity);
    if (a?.locationState) text.push(a?.locationState);
    if (a?.locationZip) text.push(a?.locationZip);
    window.open(`https://maps.apple.com?q=${text.join(", ")}`, "_blank");
  };

  return (
    <>
      <div className="bg-white w-full rounded-lg sm:w-full">
        <div className="flex p-3 justify-between">
          <h2 className="text-grey-500">{moment(date).format("MMM D")}</h2>
          <p className="text-grey-500">
            Approx. Pay:{" "}
            <span className="font-semibold text-[red]">
              ${numeral(pay).format("0,0")}
            </span>
          </p>
        </div>
        {appointments?.map((appointment, id) => (
          <div
            onClick={() =>
              navigate(`/schedule_detail/${appointment?.AppointmentId}`)
            }
            key={id}
            className="cursor-pointer relative "
          >
            <div
              className={`flex sm:justify-between border-b border-dashed py-2 p-3 hover:bg-[#cccccc45] ${
                appointment?.AppointmentId ===
                  currentAppointment?.AppointmentId && "bg-green-200"
              }`}
            >
              <div className="w-[33%] sm:w-[37%] ">
                <div className="sm:flex sm:items-center sm:gap-7">
                  <p className="text-yellow-900 font-semibold text-sm">Start</p>
                  <span className="sm:text-[12px]">
                    {appointment?.startTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <p className="text-yellow-900 font-semibold text-sm">
                    Customer
                  </p>
                  <span className="text-grey-500 text-xs overflow-hidden whitespace-nowrap text-ellipsis pr-3">
                    {appointment?.CustomerName}
                  </span>
                </div>
              </div>
              <div className="w-[33%] sm:w-[30%]">
                <div className="sm:flex sm:items-center sm:gap-4">
                  <p className="text-yellow-900 font-semibold text-sm">End</p>
                  <span className="sm:text-[12px]">{appointment?.endTime}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-grey-500 text-xs">
                    {appointment?.CustomerCity}
                  </span>
                </div>
              </div>
              <div className="w-[33%] sm:w-[28%]">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <p className="text-yellow-900 font-semibold text-sm">Hrs</p>
                  <span className="sm:text-[12px]">{appointment?.Hours}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-grey-500 text-xs">
                    {appointment?.Miles}
                  </span>
                </div>
              </div>
            </div>
            {appointment.NC_RequiresKeys && (
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
