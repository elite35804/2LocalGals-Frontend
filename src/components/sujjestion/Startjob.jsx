import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useEffect, useRef } from 'react';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

import AddBoxIcon from '@mui/icons-material/AddBox';
import TodayIcon from '@mui/icons-material/Today';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState } from 'react';
const Startjob = () => {
  const params = useLocation()
  console.log(params.pathname);
  const [seconds, setSeconds] = useState(3509); // Starting at 58:29 (58*60 + 29)
  const [options, setoptions] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [allchecked, setchecked] = useState(false);
  const handlechecked = () => {
    setchecked(!allchecked);
  }

  const intervalRef = useRef(null);
  const handleback = () => {

    if (options === false) {
      navigate('/schedule_details');
    }
    else {
      setoptions(false);
    }
  }

  const navigate = useNavigate();
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
    <div className='min-h-screen'>
      <Header />
      <div className='container'>
        <div className='bg-white p-4 mt-5 rounded-xl'>

          <div className='status flex items-center justify-between'>
            <p> <button onClick={handleback} ><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", marginLeft: "0px", marginTop: "15px", borderRadius: "50%", color: "#fda839" }} /></button></p>
            <p className='text-red-600 text-end font-bold text-lg'>Not Completed</p>
          </div>
          <div className='Brad_allen_section mt-8'>
            <div className='flex justify-between '>
              <p className='font-bold text-lg'>Brad ALLen</p>
              <p><AddIcCallIcon sx={{ color: "#478e00" }}></AddIcCallIcon>   <InsertCommentIcon sx={{ color: "#6fc1e9" }}></InsertCommentIcon>  </p>
            </div>
            <div className='flex flex-col items-start gap-2 justify-between mt-5 march_date'>
              <div>
                <p className='text-grey-500 font-semibold'> <TodayIcon sx={{ color: "grey" }}></TodayIcon> Mar 31</p>
              </div>
              <div>
                <p className='text-grey-500 font-semibold'><WatchLaterIcon sx={{ color: "#fda839" }}></WatchLaterIcon> 9:30 to 11:00 </p>
              </div>



            </div>
            <div>
              <div className="flex flex-col items-center justify-center mt-10 ">
                <div className="flex items-center justify-center w-40 h-40 bg-[#fdfec4] rounded-full border-4 border-[#ffd808]">
                  <span className="text-2xl font-bold">{formatTime(seconds)}</span>
                </div>
                <div className="mt-8 flex gap-4 ">
                  <button
                    onClick={handlePause}
                    className={`px-10 py-2  rounded-lg font-semibold ${isActive ? 'bg-gray-300 text-gray-500' : 'bg-transparent border-2 text-black'}`}
                    disabled={isActive ? false : true}
                  >
                    pause
                  </button>
                  <button
                    onClick={handleReset}
                    className={`px-10 py-2  rounded-lg font-semibold ${isActive ? 'bg-transparent border-2 text-black' : 'bg-gray-300 text-gray-500'}`}
                    disabled={isActive ? true : false}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>

          </div>
          {/* <div className='flex items-center justify-center  mt-10'>
            <button type="submit"  className=" bg-green-600 border border-transparent text-white text-lg w-[20%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 "  >
             Next
            </button>
          </div> */}
        </div>



        <div className='bg-white p-3 mt-5 rounded-xl mx-auto'>
          {/* <Link to={'/fifth'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
          <div className=' lg:w-full mx-auto mt-8'>



            {options ? (
              <div className='flex items-start justify-between md:block'>

              

                <div className=' w-[45%] sm:w-full '>

<div className='flex justify-between items-center mt-10'>
  <h4 className='font-bold sm:text-sm text-lg'>Kitchen</h4>
   <h4 className='font-bold text-red-600 sm:text-sm text-lg'>Not Completed</h4>
</div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Take Before/After Pictures </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>General dusting and remove cobwebs </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>

  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Damp wipe countertops & cloth dry</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Clean outsides of range hood </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Clean top/front of range and fridge</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Clean top/front of all appliances</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Wipe out Microwave</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Do any dishes or place in dishwasher</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Clean/disinfect sink</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Empty garbage and replace liner</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Sweep/vacuum any hard flooring</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Mop any hard flooring</li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked}/>
  </ul>
  </div>



</div>





               
                <div className=' w-[45%] sm:w-full '>

<div className='flex justify-between items-center mt-10'>
  <h4 className='font-bold sm:text-sm text-lg'>Deep clean items</h4>
   <h4 className='font-bold text-red-600 sm:text-sm text-lg'>Not Completed</h4>
</div>

  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Kitchen Cupboard(Outside only) </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Bath Cupboards(Outside only) </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Inside Oven </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Fridge/Freezer </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>



</div>
           
              </div>



            ) : (



              <div>

                <div>
                  <h4 className='text-lg font-bold  '>Details: </h4>
                  <p className='text-grey-500 font-semibold  mt-4'>3 Cats and 1 Dog. Dog would be in the office
                    with wife. They're both working from home.
                    Aren't looking for a full house clean. We
                    mostly want to have the main living area's
                    covered, so Kitchen/Dining Room, Living
                    Room, Bathrooms, NO BEDROOMS/
                    OFFICES. They have a vacuum they'd like you
                    to use, they'll have it out work for you.</p>
                </div>

                <div className='flex justify-between  items-start md:block'>

                  <table width="55% sm:w-full" className='mt-10 general_clean_items'>
                    <thead>
                    <tr>
                      <th className='font-bold text-start text-lg sm:text-sm sm:w-[73%]'>General clean items</th>
                      <th className='text-red-600 text-bold text-start sm:text-end text-lg sm:text-sm sm:w-[27%]' >Not Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <ul className='list-disc once_list bg-[#fafafa] p-4 rounded-xl'>
                            <li className='text-grey-500 font-semibold'>Master Bathroom</li>
                          </ul>
                        </td>
                        <td className='sm:text-end'>
                          <div className='bg-[#fafafa] p-4 inline-block rounded-xl'>
                            <input className='checkbox_class w-[17px] h-[17px]' type="checkbox" id="vehicle2" name="vehicle1"   onChange={handlechecked} />
                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => setoptions(true)}  ></AddBoxIcon>
                          </div>
                        </td>

                      </tr>
                      <tr>
                        <td>
                          <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl'>
                            <li className='text-grey-500 font-semibold '>Master Bedroom</li>
                          </ul>

                        </td>
                        <td  className='sm:text-end'>
                          <div className='bg-[#fafafa] p-4 mt-2 inline-block rounded-xl'>
                            <input className='checkbox_class w-[17px] h-[17px]' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => setoptions(true)} ></AddBoxIcon>
                          </div>
                        </td>

                      </tr>
                      <tr>
                        <td>
                          <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl'>
                            <li className='text-grey-500 font-semibold'> Bathroom 2</li>
                          </ul>

                        </td>
                        <td  className='sm:text-end'>
                          <div className='bg-[#fafafa] p-4 inline-block rounded-xl'>
                            <input className='checkbox_class w-[17px] h-[17px]' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => setoptions(true)} ></AddBoxIcon>
                          </div>
                        </td>

                      </tr>
                      <tr>
                        <td>
                          <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl'>
                            <li className='text-grey-500 font-semibold'>Bathroom 2</li>
                          </ul>

                        </td>
                        <td  className='sm:text-end'>
                          <div className='bg-[#fafafa] p-4 inline-block rounded-xl'>
                            <input className='checkbox_class w-[17px] h-[17px]' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => setoptions(true)} ></AddBoxIcon>
                          </div>
                        </td>

                      </tr>
                      <tr>
                        <td>
                          <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl'>
                            <li className='text-grey-500 font-semibold'>Kitchen</li>
                          </ul>

                        </td>
                        <td  className='sm:text-end'>
                          <div className='bg-[#fafafa] inline-block rounded-xl p-4'>
                            <input className='checkbox_class w-[17px] h-[17px] border-solid-red' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => setoptions(true)} ></AddBoxIcon>
                          </div>
                        </td>

                      </tr>
                      <tr>
                        <td>
                          <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl'>
                            <li className='text-grey-500 font-semibold'>Other Rooms/Areas</li>
                          </ul>

                        </td>
                        <td  className='sm:text-end '>
                          <div className='bg-[#fafafa] inline-block rounded-xl p-4'>
                            <input className='checkbox_class w-[17px] h-[17px]' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px', marginLeft: '5px', cursor: 'pointer' }} onClick={() => setoptions(true)}  ></AddBoxIcon>
                          </div>
                        </td>

                      </tr>
                    </tbody>

                  </table>


<div className=' w-[45%] sm:w-full '>

<div className='flex justify-between items-center mt-10'>
  <h4 className='font-bold sm:text-sm text-lg'>Deep clean items</h4>
   <h4 className='font-bold text-red-600 sm:text-sm text-lg'>Not Completed</h4>
</div>

  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Kitchen Cupboard(Outside only) </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"  onChange={handlechecked} />
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Bath Cupboards(Outside only) </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Inside Oven </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>
  <div>
  <ul className='list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between'>
  <li className='text-grey-500 font-semibold sm:text-sm'>Fridge/Freezer </li>
  <input className='checkbox_class w-[17px] h-[17px] leading-tight text-red-600' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"   onChange={handlechecked} />
  </ul>
  </div>



</div>
               
                </div>


                <hr className='border-dashed mt-4' />

                <div className="container">

                  <div className='flex justify-between lg:block'>
                    <div className='mt-12'>
                      <h4 className='font-bold text-lg'>Notes</h4>
                      <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Type here....' className='custom_textarea xl:w-[400px] w-[500px] h-[250px] lg:w-full sm:h-[100px]'></textarea>

                    </div>



                    <div className='mt-12'>
                      <h4 className='font-bold text-lg'>Upload Pictures</h4>
                      <div className='w-[500px] xl:w-[400px] h-[250px] sm:w-full sm:h-[100px] lg:w-full border-2 border-dashed mt-4 border-grey-500 rounded-2xl  center_image'>

                        <figure >
                          <img src="src\assets\drag.png" />
                        </figure>

                      </div>
                      <div className='text-center mt-5'><button className='bg-[#fda839] w-[150px] px-4 py-2 text-white rounded-lg text-lg'>
                        Upload</button></div>

                    </div>


                  </div>
                  <div className='flex items-center justify-center  mt-10'>
                    <button onClick={() => navigate('/finish')} type="submit" className="text-lg border bg-green-400 border-transparent text-white text-lg w-[20%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 "  >
                      Next
                    </button>
                  </div>
                </div>


              </div>)}









          </div>

          {/* <Link to={'/seventh'} className='flex items-center justify-center  mt-10'>
                        <button type="submit" className="bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                            Next
                        </button>
                    </Link> */}
        </div>
        {/* <div className='flex items-center justify-center  mt-10'>
         <button type="submit"  className=" bg-green-600 border border-transparent text-white text-lg w-[20%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 "  >
          Next
         </button>
       </div> */}
      </div>
    </div>

  )
}

export default Startjob;
