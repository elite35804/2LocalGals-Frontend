import React from 'react'
import { Link } from 'react-router-dom'

const Schedule = () => {
    return (
        <>
            <h2 className="font-bold text-white text-base heading mt-3 w-1/2 pl-3 main_hide">Schedule</h2>
            <div className='bg-white mt-3 w-1/2 rounded-lg sm:w-full'>
                <div className='flex p-3 justify-between'>
                    <h2 className='text-grey-500'>Mar 30</h2>
                    <p className='text-grey-500'>Approx. Pay: <span className='font-semibold text-[red]'>$209</span></p>
                </div>
                <Link to={'/schedule_details'}> <div className='flex sm:justify-between border-b border-dashed py-2 p-3 hover:bg-[#cccccc45]'>
                    <div className='w-[33%] sm:w-[37%] '>
                        <div className='sm:flex sm:items-center sm:gap-7'>
                        <p className='text-yellow-900 font-semibold text-sm'>Start</p>
                        <span className='sm:text-[12px]'>11:30 Am</span>
                        </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <p className='text-yellow-900 font-semibold text-sm'>Customer</p>
                            <span className='text-grey-500 text-xs'>Brad Alien</span>
                        </div>
                    </div>
                    <div className='w-[33%] sm:w-[30%]'>
                       <div className='sm:flex sm:items-center sm:gap-4'>
                       <p className='text-yellow-900 font-semibold text-sm'>End</p>
                       <span className='sm:text-[12px]'>11:30 Am</span>
                       </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <span className='text-grey-500 text-xs'>Salt laka City</span>
                        </div>
                    </div>
                    <div className='w-[33%] sm:w-[28%]'>
                      <div className='sm:flex sm:items-center sm:justify-between'>
                      <p className='text-yellow-900 font-semibold text-sm'>Hrs</p>
                      <span className='sm:text-[12px]'>11:30 Am</span>
                      </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <span className='text-grey-500 text-xs'>12.5ml</span>
                        </div>
                    </div>
                </div></Link>
                <Link to={'/schedule_details'} className='flex border-b sm:justify-between border-dashed py-2 p-3 hover:bg-[#cccccc45]'>
                <div className='w-[33%] sm:w-[37%] '>
                        <div className='sm:flex sm:items-center sm:sm:gap-4'>
                        <p className='text-yellow-900 font-semibold text-sm'>Start</p>
                        <span className='sm:text-[12px]'>11:30 Am</span>
                        </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <p className='text-yellow-900 font-semibold text-sm'>Customer</p>
                            <span className='text-grey-500 text-xs'>Brad Alien</span>
                        </div>
                    </div>
                    <div className='w-[33%] sm:w-[30%]'>
                       <div className='sm:flex sm:items-center sm:gap-4'>
                       <p className='text-yellow-900 font-semibold text-sm'>End</p>
                       <span className='sm:text-[12px]'>11:30 Am</span>
                       </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <span className='text-grey-500 text-xs'>Salt laka City</span>
                        </div>
                    </div>
                    <div className='w-[33%] sm:w-[28%]'>
                      <div className='sm:flex sm:items-center sm:justify-between'>
                      <p className='text-yellow-900 font-semibold text-sm'>Hrs</p>
                      <span className='sm:text-[12px]'>11:30 Am</span>
                      </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <span className='text-grey-500 text-xs'>12.5ml</span>
                        </div>
                    </div>
                </Link>
                <Link to={'/schedule_details'} className='flex border-b sm:justify-between border-dashed py-2 p-3 hover:bg-[#cccccc45]'>
                <div className='w-[33%] sm:w-[37%] '>
                        <div className='sm:flex sm:items-center sm:sm:gap-4'>
                        <p className='text-yellow-900 font-semibold text-sm'>Start</p>
                        <span className='sm:text-[12px]'>11:30 Am</span>
                        </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <p className='text-yellow-900 font-semibold text-sm'>Customer</p>
                            <span className='text-grey-500 text-xs'>Brad Alien</span>
                        </div>
                    </div>
                    <div className='w-[33%] sm:w-[30%]'>
                       <div className='sm:flex sm:items-center sm:gap-4'>
                       <p className='text-yellow-900 font-semibold text-sm'>End</p>
                       <span className='sm:text-[12px]'>11:30 Am</span>
                       </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <span className='text-grey-500 text-xs'>Salt laka City</span>
                        </div>
                    </div>
                    <div className='w-[33%] sm:w-[28%]'>
                      <div className='sm:flex sm:items-center sm:justify-between'>
                      <p className='text-yellow-900 font-semibold text-sm'>Hrs</p>
                      <span className='sm:text-[12px]'>11:30 Am</span>
                      </div>
                        <div className='flex items-center gap-2 mt-3'>
                            <span className='text-grey-500 text-xs'>12.5ml</span>
                        </div>
                    </div>
                </Link>
                {/* <div>
                    <div className='flex items-center gap-2'>
                        <p className='text-yellow-900 font-semibold text-sm'>Customer</p>
                        <span className='text-grey-500 text-xs'>Brad Alien</span>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Schedule