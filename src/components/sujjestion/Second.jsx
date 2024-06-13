
import { Link } from 'react-router-dom';
import Header from '../Header';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Second = () => {
    return (
        <div className=''>

            <div className=''>
                <div className='bg-white p-3 mt-5 rounded-xl mx-auto'>

                    <div className='w-[70%] sm:w-full mx-auto'>
                        <div>
                            <p className='text-grey-500 font-semibold' >This is your pay dashboard to give you and idea of what your pay looks like. <b className='text-[red] font-extrabold' >Keep in mind these are estimates only</b></p>
                        </div>
                        <div className='bg-[#89cae9] p-3 mt-3 w-full rounded-lg sm:w-full'>
                            <div className='bg-white rounded-lg p-3'>
                                <div className='flex items-end'>
                                    <div className='w-[25%] mt-3 flex flex-col gap-3'>
                                        <p className='text-yellow-900 font-semibold text-sm'>Hours</p>
                                        <p className='text-yellow-900 font-semibold text-sm'>Pay</p>
                                        <p className='text-yellow-900 font-semibold text-sm'>Hourly Rate</p>
                                    </div>
                                    <div className='flex items-center gap-4 justify-end w-[75%]'>
                                        <div className='flex flex-col justify-center items-center w-[25%]'>
                                            <span className='text-[#747474] sm:text-xs font-medium'>Today</span>
                                            <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                                            <div className='mt-3 flex flex-col gap-3'>
                                                <div>
                                                    <p className='text-sm font-medium'>6.5</p>
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium'>6.5</p>
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium'>6.5</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-center items-center w-[25%]'>
                                            <span className='text-[#747474] sm:text-xs font-medium'>This Week</span>
                                            <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                                            <div className='mt-3 flex flex-col gap-3'>
                                                <div>
                                                    <p className='text-sm font-medium'>$209</p>
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium'>$209</p>
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium'>$209</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-center items-center w-[25%]'>
                                            <span className='text-[#747474] sm:text-xs font-medium'>Next Week</span>
                                            <img className='w-20' src="https://www.shutterstock.com/image-vector/calendar-icon-clock-notice-message-600nw-1981476518.jpg" alt="" />
                                            <div className='mt-3 flex flex-col gap-3'>
                                                <div>
                                                    <p className='text-sm font-medium'>$27.26</p>
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium'>$27.26</p>
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium'>$27.26</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8 list_of_jobs text-grey-500 font-semibold'>
                            <p>Next, is a list of your jobs for this week and next week.</p>
                            <ul className='mt-4'>
                                <li className='mb-1'>The top right shows you an estimate of what you could expect to be paid for that day.</li>
                                <li className='mb-1'>To start/view a job,click anywhere in the customer area.</li>
                                <li className='mb-1'>To navigate to a job, click the blue and white arrow.</li>
                                <li className='mb-1'>If the Key icon is showing , be sure you or your partner have the key to get in.</li>
                            </ul>
                        </div>


                        <div className='bg-[#89cae9] p-3 mt-3 w-full  rounded-lg sm:w-full mt-5'>
                            <div className='bg-white rounded-lg'>
                                <div className='flex justify-between p-3'>
                                    <h2 className='text-grey-500 font-medium'>Mar 30</h2>
                                    <p className='text-black font-medium'>Approx. Pay: <span className='font-semibold text-[red]'>$209</span></p>
                                </div>
                                <div className='flex border-b justify-between border-dashed py-2 bg-[#c8eaa5] pl-3 sm:pl-1 mt-3'>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs '>Start</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <p className='text-yellow-900 font-semibold text-xs'>Customer</p>
                                            <span className='text-grey-500 text-xs'>Brad Alien</span>
                                        </div>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>End</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <span className='text-grey-500 text-xs'>Salt laka City</span>
                                        </div>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>Hrs</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <span className='text-grey-500 text-xs'>12.5ml</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex border-b justify-between border-dashed py-2 pl-3'>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>Start</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <p className='text-yellow-900 font-semibold text-xs'>Customer</p>
                                            <span className='text-grey-500 text-xs'>Brad Alien</span>
                                        </div>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>End</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <span className='text-grey-500 text-xs'>Salt laka City</span>
                                        </div>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>Hrs</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <span className='text-grey-500 text-xs'>12.5ml</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex border-b justify-between border-dashed py-2 pl-3'>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>Start</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <p className='text-yellow-900 font-semibold text-xs'>Customer</p>
                                            <span className='text-grey-500 text-xs'>Brad Alien</span>
                                        </div>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>End</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <span className='text-grey-500 text-xs'>Salt laka City</span>
                                        </div>
                                    </div>
                                    <div className='w-[33%]'>
                                        <p className='text-yellow-900 font-semibold text-xs'>Hrs</p>
                                        <span className='sm:text-xs sm:font-medium'>11:30 Am</span>
                                        <div className='flex items-center gap-2 mt-3'>
                                            <span className='text-grey-500 text-xs'>12.5ml</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <Link to={'/third'} className='flex items-center justify-center  mt-10'>
                        <button type="submit" className="bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                            Next
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Second