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


const UpdateAddress = () => {
    const [date, setDate] = useState(new Date())

    return (
        <>
            <div className='login_page min-h-screen'>
                <Header />
                <div className="container">
                    <div className="max-w-[320px] w-full mx-auto">
                        <div className='bg-white p-3 mt-3 w-full mx-auto rounded-lg sm:w-full'>
                            <h2 className="font-bold text-base mt-3 ">Update Address</h2>
                            <div className='mt-2'>
                              <input type="text" className='border outline-none px-2' placeholder='name' />
                            </div>
                            <div className='mt-2'>
                              <input type="text" className='border outline-none px-2' placeholder='name' />
                            </div>
                            <div className='mt-2'>
                              <input type="text" className='border outline-none px-2' placeholder='name' />
                            </div>
                         
                            <div className='w-full'>
                                <button type="submit" className="text-center w-full mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
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

export default UpdateAddress