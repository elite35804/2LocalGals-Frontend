import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/dashboard/Home'
import Login from '../page/auth/Login'
import First from '../components/sujjestion/First'
import Second from '../components/sujjestion/Second'
import UpdateUnavailability from '@/page/dashboard/UpdateUnavailability'
import UpdateProfilePicture from '@/page/dashboard/UpdateProfilePicture'
import UpdateAddress from '@/page/dashboard/UpdateAddress'

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/first' element={<First />} />
                <Route path='/second' element={<Second />} />
                <Route path='/UpdateUnavailability' element={<UpdateUnavailability />} />
                <Route path='/update_profile_picture' element={<UpdateProfilePicture />} />
                <Route path='/update_address' element={<UpdateAddress />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing