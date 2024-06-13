import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import Header from '@/components/Header'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import WithDashboardLayout from '@/hoc/WithDashboardLayout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import city_img from '../../assets/city.png'
import map_img from '../../assets/ZIP.png'
import zip_img from '../../assets/zips.png'

const UpdateAddress = () => {
    const [date, setDate] = useState(new Date())

    return (
        <>
            <div className='login_page min-h-screen'>
                <div className="container">
                    <div className='bg-white p-3 mt-3 w-full mx-auto rounded-lg sm:w-full'>
                        <KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} />
                        <h2 className="font-medium text-base mt-3 ">Update Address</h2>
                        <div className="max-w-[320px] w-full mx-auto mt-3">
                            <div className='mt-2 shadow rounded-md flex gap-2 pl-2 items-center'>
                                <img className='w-5' src={map_img} alt="" />
                                <input type="text" className='outline-none w-full py-3 rounded-md' placeholder='Street Address' />
                            </div>
                            <div className='mt-2 shadow rounded-md flex gap-2 pl-2 items-center'>
                                <img className='w-5' src={city_img} alt="" />
                                <input type="text" className='outline-none w-full py-3 rounded-md' placeholder='City' />
                            </div>
                            <div className='mt-2 shadow rounded-md flex gap-2 pl-2 items-center'>
                                <img className='w-5 h-4 object-contain' src={zip_img} alt="" />
                                <input type="text" className='outline-none w-full py-3 rounded-md' placeholder='ZIP' />
                            </div>
                            <div className='w-full'>
                                <button type="submit" className="main_btn border border-transparent text-center w-full mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithDashboardLayout(UpdateAddress)