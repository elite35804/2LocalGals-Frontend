
import { Link } from 'react-router-dom';
import Header from '../Header';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
const Fifth = () => {
    return (
        <div className=''>
         
            <div className='container '>
                <div className='bg-white p-5 sm:p-2 mt-5 rounded-xl mx-auto'>
                   {/* <Link to={'/fourth'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
             <div className='w-[50%] md:w-full lg:w-[90%] xl:w-[60%] mx-auto'>
                     
             <div className='timer_list'>
                             <ul className='list-disc once_list'>
                                <li className='text-grey-500 font-semibold mb-1'>The timer is intended as a tool to help keep track of your time</li>
                                <li className='text-red-400 font-semibold timer_will mb-1 '>The timer will not adjust your time, so remember to let the office know of ANY time changes</li>
                                <li className='text-grey-500 font-semibold mb-1'>You can pause your time if you need to take a break by pressing the pause button</li>
                                <li className='text-grey-500 font-semibold mb-1'>Your timer will change colors depending on how much time is remaining</li>
                             </ul>
                  
                      
                    </div>

                  <div className='flex justify-between items-center sm:block'>
                  <div>

<div className='mt-6'>
    <p ><WatchLaterIcon  sx ={{color:"#fda839",bgcolor:"#dbfadb" ,width:'40px',padding:'3px',borderRadius:'10px'}}></WatchLaterIcon></p>
    <p className='text-green-400 font-bold'>Green</p>
    <ul className='once_list list-disc'>
        <li className='text-grey-500 font-semibold'>Up until there is 10 min. Remaining</li>
    </ul>
</div>


<div className='mt-6'>
    <p ><WatchLaterIcon  sx ={{color:"#fda839",bgcolor:"#f9fadb" ,width:'40px',padding:'3px',borderRadius:'10px'}}></WatchLaterIcon></p>
    <p className=' text-light_yellow-500 font-bold'>Yellow</p>
    <ul className='once_list list-disc'>
        <li className='text-grey-500 font-semibold'>10 min. to 0 min. Remaining</li>
    </ul>
</div>

<div className='mt-6'>
        <p  className=''><WatchLaterIcon  sx ={{color:"#fda839",bgcolor:"#fadbdb" ,width:'40px',padding:'3px',borderRadius:'10px'}}></WatchLaterIcon></p>
    <p className='text-red-400 font-bold '>Red(flashing)</p>
    <ul className='once_list list-disc '>
        <li className='text-grey-500 font-semibold'>Time is up!</li>
    </ul>
    </div>




</div>




<div className='mt-6'>



    <div className='w-[100%] sm:w-full'>
        <div className="timer mt-5">
            <figure>
                <img src="src\assets\image.png" alt="timer_image" className='ms-8' />
            </figure>
            <div className='mt-6'><button className='start_btn font-semibold'>Start</button><button className='start_btn font-semibold ms-4'>Stop</button></div>
        </div>


    </div>
</div>
                  </div>
             </div>
               
                    {/* <Link to={'/sixth'} className='flex items-center justify-center  mt-10'>
                        <button type="submit" className="bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                            Next
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Fifth;