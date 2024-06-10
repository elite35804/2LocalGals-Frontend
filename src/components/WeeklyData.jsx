import React from 'react'

const WeeklyData = () => {
    return (
        <div className='bg-white p-3 mt-3 w-1/2 rounded-lg sm:w-full'>
            <div className='flex items-end'>
                <div className='w-[25%] mt-3 flex flex-col gap-3'>
                    <p className='text-yellow-900 font-semibold text-sm'>Hours</p>
                    <p className='text-yellow-900 font-semibold text-sm'>Pay</p>
                    <p className='text-yellow-900 font-semibold text-sm'>Hourly Rate</p>
                </div>
                <div className='flex items-center gap-4 justify-end w-[75%]'>
                    <div className='flex flex-col justify-center items-center w-[25%]'>
                        <span className='text-[#747474] sm:text-xs font-semibold'>Today</span>
                        <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                        <div className='mt-3 flex flex-col gap-3'>
                            <div>
                                <p className='text-sm'>6.5</p>
                            </div>
                            <div>
                                <p className='text-sm'>6.5</p>
                            </div>
                            <div>
                                <p className='text-sm'>6.5</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-[25%]'>
                        <span className='text-[#747474] sm:text-xs font-semibold'>This Week</span>
                        <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                        <div className='mt-3 flex flex-col gap-3'>
                            <div>
                                <p className='text-sm'>$209</p>
                            </div>
                            <div>
                                <p className='text-sm'>$209</p>
                            </div>
                            <div>
                                <p className='text-sm'>$209</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-[25%]'>
                        <span className='text-[#747474] sm:text-xs font-semibold'>Next Week</span>
                        <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                        <div className='mt-3 flex flex-col gap-3'>
                            <div>
                                <p className='text-sm'>$27.26</p>
                            </div>
                            <div>
                                <p className='text-sm'>$27.26</p>
                            </div>
                            <div>
                                <p className='text-sm'>$27.26</p>
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
    )
}

export default WeeklyData