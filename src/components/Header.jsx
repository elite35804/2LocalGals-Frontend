import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className='border-b border-dashed border-white  py-3'>
            <div className="container">
                <div className='flex items-center justify-between'>
                    <div>
                        <img className='w-16 object-cover h-16 rounded-full' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <HomeIcon sx={{ fontSize: "40px", cursor: "pointer", bgcolor: "#cbe9f7", padding: "5px", borderRadius: "50%", color: "#fda839" }} />
                        </PopoverTrigger>
                        <PopoverContent className="w-[97%]">
                            <div>
                                <h2 className="font-bold text-base">Setting</h2>
                                <Link to={'/UpdateUnavailability'} className='shadow p-3 mt-3  flex items-center gap-1 rounded-2xl cursor-pointer'>
                                    <CalendarMonthIcon sx={{ fontSize: "18px" }} />
                                    <h1 className="font-bold text-sm heading ">Update Unavailability</h1>
                                </Link>
                                <Link to={'/update_profile_picture'} className='shadow p-3 mt-3 flex items-center gap-1 rounded-2xl cursor-pointer'>
                                    <PersonIcon />
                                    <h1 className="font-bold text-sm heading ">Update Profile Picture</h1>
                                </Link>
                                <Link to={'/update_address'} className='shadow p-3 mt-3 flex items-center gap-1 rounded-2xl cursor-pointer'>
                                    <AddLocationIcon />
                                    <h1 className="font-bold text-sm heading ">Update Address</h1>
                                </Link>
                                <div className='shadow p-3 mt-3 flex items-center gap-1 rounded-2xl cursor-pointer'>
                                    <DirectionsWalkIcon />
                                    <h1 className="font-bold text-sm heading ">Update View App Walkthrough</h1>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Header