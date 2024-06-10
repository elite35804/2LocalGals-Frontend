import React from 'react'
import Header from '../../components/Header'
import WeeklyData from '../../components/WeeklyData'
import Schedule from '../../components/Schedule'

const Home = () => {
  return (
    <div className='login_page min-h-screen'>
      <Header />
      <div className="container">
        <div className='py-4'>
          <div className='flex items-center'>
            <h2 className="font-bold text-white text-base heading mt-3 w-1/2 ">Good Morning Carly!</h2>
            <h2 className="font-bold text-white text-base heading mt-3 w-1/2 pl-3">Schedule</h2>
          </div>
          <div className='flex gap-5 sm:flex-col'>
            <WeeklyData />
            <Schedule />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home