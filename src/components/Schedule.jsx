import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";

const Schedule = ({ appointments, date }) => {
  let pay = 0;
  appointments?.map((a) => (pay += a?.AproxPay));
  const navigate = useNavigate();
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
          <a
            onClick={() =>
              !appointment?.JobCompleted
                ? navigate(`/schedule_detail/${appointment?.AppointmentId}`)
                : {}
            }
            key={id}
            className="cursor-pointer"
          >
            <div
              className={`flex sm:justify-between border-b border-dashed py-2 p-3 hover:bg-[#cccccc45] ${
                appointment?.JobCompleted && "bg-green-200"
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
          </a>
        ))}
      </div>
    </>
  );
};

export default Schedule;
