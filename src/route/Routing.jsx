import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/dashboard/Home'
import Login from '../page/auth/Login'

import UpdateUnavailability from '@/page/dashboard/UpdateUnavailability'
import UpdateProfilePicture from '@/page/dashboard/UpdateProfilePicture'
import UpdateAddress from '@/page/dashboard/UpdateAddress'

import Slider from '@/components/sujjestion/Slider'
import Third from '@/components/sujjestion/Third'




const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/schedule_details' element={<Third />} />
                <Route path='/walk_through' element={<Slider></Slider>}></Route>
                <Route path='/UpdateUnavailability' element={<UpdateUnavailability />} />
                <Route path='/update_profile_picture' element={<UpdateProfilePicture />} />
                <Route path='/update_address' element={<UpdateAddress />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing