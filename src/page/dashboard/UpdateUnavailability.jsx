import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
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

const UpdateUnavailability = () => {
    const [date, setDate] = useState(new Date())

    return (
        <>
            <div className='login_page min-h-screen'>
                <div className="container">
                    <div className='bg-white p-3 mt-3 w-full mx-auto rounded-lg sm:w-full'>
                    <KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px",  borderRadius: "50%", color: "#fda839" }}/>
                        <h2 className="font-medium text-base heading mt-3  ">Update Unavailability</h2>
                        <div className='grid grid-cols-3 md:justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md mt-5 w-full"
                            />
                            <div className='flex gap-4'>
                                <div>
                                    <h2 className="font-medium text-base heading mt-3  ">Start Time</h2>
                                    <input type="text" placeholder='Start date' className='border outline-none px-2 rounded-md py-2 w-full' />
                                </div>
                                <div>
                                    <h2 className="font-medium text-base heading mt-3  ">End Time</h2>
                                    <input type="text" placeholder='End date' className='border outline-none px-2 rounded-md py-2 w-full' />
                                </div>
                            </div>
                            <div className='w-full'>
                                <h2 className="font-medium text-base heading mt-3  ">Recurrence</h2>
                                <Select className='w-full'>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>None</SelectLabel>
                                            <SelectItem value="apple">10:00 AM</SelectItem>
                                            <SelectItem value="banana">10:30 AM</SelectItem>
                                            <SelectItem value="blueberry">11:00 AM</SelectItem>
                                            <SelectItem value="grapes">12:00 AM</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className='flex items-center justify-center gap-6'>
                            <button type="submit" className="hover:bg-yellow-900 hover:text-white transition-all text-center mt-10 border border-yellow-900 text-xs font-semibold px-12 py-3 rounded-lg">
                                Delete
                            </button>
                            <button type="submit" className="main_btn border border-transparent text-center mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithDashboardLayout(UpdateUnavailability)