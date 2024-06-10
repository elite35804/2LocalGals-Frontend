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


const UpdateProfilePicture = () => {
    const [date, setDate] = useState(new Date())

    return (
        <>
            <div className='login_page min-h-screen'>
                <Header />
                <div className="container">
                    <div className="max-w-[320px] w-full mx-auto">
                        <div className='bg-white p-3 mt-3 w-full mx-auto rounded-lg sm:w-full'>
                            <h2 className="font-bold text-base mt-3 ">Update Profile Picture</h2>
                            <div className='mt-10'>
                                <img className='w-[120px] mx-auto h-[120px]' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
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

export default UpdateProfilePicture