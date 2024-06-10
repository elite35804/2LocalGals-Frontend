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


const UpdateUnavailability = () => {
    const [date, setDate] = useState(new Date())

    return (
        <>
            <div className='login_page min-h-screen'>
                <Header />
                <div className="container">
                    <div className="max-w-[320px] w-full mx-auto">
                        <div className='bg-white p-3 mt-3 w-full mx-auto rounded-lg sm:w-full'>
                            <h2 className="font-bold text-base heading mt-3  ">Update Unavailability</h2>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md mt-5 w-full border-b border-dashed"
                            />
                            <div>
                                <h2 className="font-bold text-base heading mt-3  ">Start Time</h2>
                                <AccessTimeIcon />
                            </div>
                            <div>
                                <h2 className="font-bold text-base heading mt-3  ">End Time</h2>
                                <AccessTimeIcon />
                            </div>
                            <div>
                                <h2 className="font-bold text-base heading mt-3  ">Recurrence</h2>
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
                                <div className='flex items-center justify-between'>
                                    <button type="submit" className="sign-in text-center mt-10 border border-yellow-900 text-xs font-semibold px-12 py-3 rounded-lg">
                                        Delete
                                    </button>
                                    <button type="submit" className="sign-in text-center mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateUnavailability