import { useRef,useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';


import WatchLaterIcon from '@mui/icons-material/WatchLater';
const Fifth = () => {
    const [seconds, setSeconds] = useState(3509);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

  
   
    useEffect(() => {
      if (isActive) {
        intervalRef.current = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
      } else {
        clearInterval(intervalRef.current);
      }
  
      return () => clearInterval(intervalRef.current);
    }, [isActive]);
  
    const handlePause = () => {
      setIsActive(false);
    };
  
    const handleReset = () => {
      setIsActive(true);
      setSeconds(3509); // Reset to 58:29
    };
  
    const formatTime = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };



    return (
        <div className=''>
         
            <div className='container '>
                <div className='bg-white p-5 sm:p-2 mt-5 rounded-xl mx-auto'>
                   {/* <Link to={'/fourth'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
             <div className='w-[50%] md:w-full lg:w-[90%] xl:w-[60%] mx-auto'>
                     
             <div className='timer_list'>
                             <ul className='list-disc once_list'>
                                <li className='text-grey-500 font-semibold mb-1'>The timer is intended as a tool to help keep track of your time</li>
                                <li className='text-red-500 font-semibold timer_will mb-1 '>The timer will not adjust your time, so remember to let the office know of ANY time changes</li>
                                <li className='text-grey-500 font-semibold mb-1'>You can pause your time if you need to take a break by pressing the pause button</li>
                                <li className='text-grey-500 font-semibold mb-1'>Your timer will change colors depending on how much time is remaining</li>
                             </ul>
                  
                      
                    </div>

                  <div className='flex justify-between items-center sm:block'>
                  <div>

<div className='mt-6'>
   <div className='sm:flex sm:gap-3'>
   <p ><WatchLaterIcon  sx ={{color:"#fda839",bgcolor:"#dbfadb" ,width:'40px',padding:'3px',borderRadius:'10px'}}></WatchLaterIcon></p>
   <p className='text-green-400 font-bold text-lg'>Green</p>
   </div>
    <ul className='once_list list-disc'>
        <li className='text-grey-500 font-semibold'>Up until there is 10 min. Remaining</li>
    </ul>
</div>


<div className='mt-6'>
 <div className='sm:flex sm:gap-3'>
 <p ><WatchLaterIcon  sx ={{color:"#fda839",bgcolor:"#f9fadb" ,width:'40px',padding:'3px',borderRadius:'10px'}}></WatchLaterIcon></p>
 <p className=' text-light_yellow-500 font-bold text-lg'>Yellow</p>
 </div>
    <ul className='once_list list-disc'>
        <li className='text-grey-500 font-semibold'>10 min. to 0 min. Remaining</li>
    </ul>
</div>

<div className='mt-6'>
       <div className='sm:flex sm:gap-3'>
       <p  className=''><WatchLaterIcon  sx ={{color:"#fda839",bgcolor:"#fadbdb" ,width:'40px',padding:'3px',borderRadius:'10px'}}></WatchLaterIcon></p>
       <p className='text-red-500 font-bold text-lg'>Red(flashing)</p>
       </div>
    <ul className='once_list list-disc '>
        <li className='text-grey-500 font-semibold'>Time is up!</li>
    </ul>
    </div>




</div>




<div className='mt-6'>



    <div className='w-[100%] sm:w-full'>
    <div>
           <div className="flex flex-col items-center justify-center mt-10 ">
      <div className="flex items-center justify-center w-40 h-40 bg-[#c4fed4] rounded-full border-4 border-[#4c9309]">
        <span className="text-2xl font-bold">{formatTime(seconds)}</span>
      </div>
      <div className="mt-8 flex gap-4 ">
        <button
          onClick={handlePause}
          className={`px-10 py-2  rounded-lg font-semibold ${isActive ? 'bg-gray-300 text-gray-500' : 'bg-transparent border-2 text-black'}` }
          disabled={isActive?false:true}
        >
         pause
        </button>
        <button
          onClick={handleReset}
          className={`px-10 py-2  rounded-lg font-semibold ${isActive ? 'bg-transparent border-2 text-black':'bg-gray-300 text-gray-500'}`}
          disabled={isActive?true:false}
        >
      Start
        </button>
      </div>
    </div>
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