import React from "react";
import balance_img from "../assets/balance.png";
import wallet_img from "../assets/wallet.png";
import calender_img from "../assets/calender.png";

const WeeklyData = ({ report }) => {
  return (
    <div className="bg-white p-3 mt-3 w-full rounded-lg sm:w-full">
      <div className="flex items-end">
        <div className="w-[25%] mt-3 flex flex-col gap-3 overflow-hidden">
          <p className="text-yellow-900 font-semibold text-sm">Hours</p>
          <p className="text-yellow-900 font-semibold text-sm">Pay</p>
          <p className="text-yellow-900 font-semibold text-sm whitespace-nowrap">
            Hourly Rate
          </p>
        </div>
        <div className="flex items-center gap-4 justify-end sm:w-[75%] w-full">
          <div className="flex flex-col justify-center items-center w-[25%]">
            <span className="text-[#6c5e5e] sm:text-xs font-semibold">
              Today
            </span>
            <img className="w-14" src={calender_img} alt="" />
            <div className="mt-3 flex flex-col gap-3 justify-center items-center">
              <div>
                <p className="text-sm">{report?.today?.hours}</p>
              </div>
              <div>
                <p className="text-sm">${report?.today?.pay}</p>
              </div>
              <div>
                <p className="text-sm">${report?.today?.hourlyRate}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-[25%]">
            <span className="text-[#747474] sm:text-xs font-semibold whitespace-nowrap">
              This Week
            </span>
            <img className="w-14" src={balance_img} alt="" />
            <div className="mt-3 flex flex-col gap-3 justify-center items-center">
              <div>
                <p className="text-sm">{report?.thisWeek?.hours}</p>
              </div>
              <div>
                <p className="text-sm">${report?.thisWeek?.pay}</p>
              </div>
              <div>
                <p className="text-sm">${report?.thisWeek?.hourlyRate}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-[25%]">
            <span className="text-[#747474] sm:text-xs font-semibold whitespace-nowrap text-ellipsis">
              Next Week
            </span>
            <img className="w-14" src={wallet_img} alt="" />
            <div className="mt-3 flex flex-col gap-3 justify-center items-center">
              <div>
                <p className="text-sm">{report?.nextWeek?.hours}</p>
              </div>
              <div>
                <p className="text-sm">${report?.nextWeek?.pay}</p>
              </div>
              <div>
                <p className="text-sm">${report?.nextWeek?.hourlyRate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <table className='w-full'>
                <thead>
                    <tr>
                        <th className='w-[25%]'></th>
                        <th className='w-[25%]'>
                            <div className='flex flex-col justify-center items-center'>
                                <span>Today</span>
                                <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                            </div>
                        </th>
                        <th className='w-[25%]'>
                            <div className='flex flex-col justify-center items-center'>
                                <span>This Week</span>
                                <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                            </div>
                        </th>
                        <th className='w-[25%]'>
                            <div className='flex flex-col justify-center items-center'>
                                <span>Next Week</span>
                                <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td className='text-center'>Hours</td>
                        <td className='text-center'>Pay</td>
                        <td className='text-center'>Hourly Rate</td>
                    </tr>
                </tbody>
            </table> */}
    </div>
  );
};

export default WeeklyData;
