import React from 'react'
import WeeklyData from '../../components/WeeklyData'
import Schedule from '../../components/Schedule'
import WithDashboardLayout from '@/hoc/WithDashboardLayout'

const Home = () => {
  let name = "sanju";
  let data =[
    {id:1,
      date:'Mar 30',
      pay:'209'
    },
    {
      id:2,
    date:'Mar 31',
    pay:'189'
  },
  {
    id:3,
    date:'Apr 1',
    pay:'245'
  },

  {
    id:4,
    date:'Apr 2',
    pay:'205'
  },

  {
    id:5,
    date:'Apr 3',
    pay:'145'
  },

  {
    id:6,
    date:'Apr 4',
    pay:'185'
  },

  {
    id:7,
    date:'Apr 5',
    pay:'195'
  }




]


  return (
    <div className='login_page min-h-screen'>
      <div className="container">
        <div className='py-4'>
          <div className='flex items-center'>
            <h2 className="font-bold text-white text-base heading mt-3 w-1/2 ">Good Morning Carly!</h2>
           
            <h2 className="font-bold text-white text-base heading mt-3 w-1/2 pl-3 sm:hidden">Schedule</h2>
          </div>
          <div className='flex flex-wrap gap-5 sm:flex-col'>
            <WeeklyData />
          <h2 className="font-bold text-white text-base heading mt-3 w-[49%] pl-3 main_hide">Schedule</h2>
          {data.map((items)=>{
           return(
            <Schedule key = {items.id} date = {items.date} pay = {items.pay}>

            </Schedule>
           )
          })}
           
          </div>
          
          
         
   
        </div>
      </div>
    </div>
  )
}

export default WithDashboardLayout(Home)