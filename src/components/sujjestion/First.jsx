import React from 'react'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Header from '../Header';


const First = () => {
    return (
        <div className=''>
            <div className='container'>
                <div className='bg-white p-5 mt-5 rounded-xl'>
                    <h2 className="font-bold text-base w-1/2 ">2LG app Walkthough</h2>
                    <div className='pt-4'>
                        <SettingsApplicationsIcon sx={{ fontSize: "40px", cursor: "pointer", bgcolor: "#cbe9f7", padding: "5px", borderRadius: "50%", color: "#fda839" }} />
                        <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nemo adipisci quaerat ex cumque! Nulla alias at, magni vero officiis ab incidunt ipsum, tempore velit dolore sed eos, suscipit modi.</p>
                    </div>
                    <div className='pt-4'>
                        <HomeIcon sx={{ fontSize: "40px", cursor: "pointer", bgcolor: "#cbe9f7", padding: "5px", borderRadius: "50%", color: "#fda839" }} />
                        <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem nemo adipisci quaerat ex cumque! Nulla alias at, magni vero officiis ab incidunt ipsum, tempore velit dolore sed eos, suscipit modi.</p>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default First