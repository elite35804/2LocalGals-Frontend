

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ninth_img from '../../assets/nine.png'
const Ninth = () => {
  const [allchecked, setchecked] = useState(false);
  const navigate = useNavigate();
  const handlechecked = () => {
    setchecked(!allchecked);
  };

  return (
    <div className=''>
      {/* <Header /> */}
      <div className='container '>
        <div className='bg-white p-3 mt-5 rounded-xl mx-auto'>
          {/* <Link to={'/eight'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
          {/* <div className='w-[50%] sm:w-full mx-auto'>

            <div className='timer_list'>
              <ul className='list-disc once_list'>
                <li className='text-grey-500 font-semibold mb-1'>The final step is to double check all your work,
                  check your partners work, if you had one, and
                  have the customer do a walkthrough, if
                  possible.</li>
                <li className='text-grey-500 font-semibold mb-1'>Once everything has been checked, click
                  on the Finish Job button. You will be taken
                  back to your Home page to navigate to
                  your next job, if you have one.</li>


              </ul>


            </div>




            <div className=' flex justify-center mt-10'>
            <div>
            <h3 className="font-bold text-lg">Finished Checklist</h3>
            <div className="timer_list w-[100%] md:w-full lg:w-[62%]">
              <ul className="list-disc once_list flex gap-5 justify-between pe-4 items-center mt-4 bg-[#d9d9d9] py-3   rounded-xl">
                <li className="text-grey-500 font-semibold mb-1 ">
                  Did you upload all Before/After pics, if applicable
                </li>
                <input
                  className="checkbox_class w-[17px] h-[17px] sm:w-[23px]"
                  type="checkbox"
                  id="vehicle2"
                  name="vehicle1"
                  value="Bike"
                  checked={allchecked}
                  onChange={handlechecked}
                />
              </ul>

              <ul className="list-disc once_list flex gap-5 justify-between pe-4 items-center mt-4 bg-[#d9d9d9] py-3   rounded-xl">
                <li className="text-grey-500 font-semibold mb-1 ">
                  Have you double checked your work?
                </li>
                <input
                  className="checkbox_class w-[17px] h-[17px]  "
                  type="checkbox"
                  id="vehicle2"
                  name="vehicle1"
                  value="Bike"
                  checked={allchecked}
                  onChange={handlechecked}
                />
              </ul>

              <ul className="list-disc justify-between pe-4 once_list flex gap-5 items-center mt-4 bg-[#d9d9d9] py-3   rounded-xl">
                <li className="text-grey-500 font-semibold mb-1 ">
                  Did the customer do a walthrough, if possible?
                </li>
                <input
                  className=" checkbox_class w-[17px] h-[17px] sm:w-[23px] "
                  type="checkbox"
                  id="vehicle2"
                  name="vehicle1"
                  value="Bike"
                  checked={allchecked}
                  onChange={handlechecked}
                />
              </ul>

              <ul className="list-disc justify-between pe-4 once_list flex gap-5 items-center mt-4 bg-[#d9d9d9] py-3   rounded-xl">
                <li className="text-grey-500 font-semibold mb-1 ">
                  Have you double checked your partners work, if you had one ?
                </li>
                <input
                  className=" checkbox_class w-[17px] h-[17px] sm:w-[30px] sw:h-[30px] "
                  type="checkbox"
                  id="vehicle2"
                  name="vehicle1"
                  value="Bike"
                  checked={allchecked}
                  onChange={handlechecked}
                />
              </ul>
            </div>
          </div>
            </div>
          <div className="flex items-center justify-center  mt-10">
            <button
              onClick={() => navigate("/home")}
              type="submit"
            style={allchecked?{background:"green"}:{background:"grey"}}
              className="  border border-transparent text-white text-lg w-[70%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 "
              disabled={allchecked? false : true}
            >
              Finish Job
            </button>
          </div>





          </div> */}


<div className='flex justify-center'><img src={ninth_img} alt="" className='pointer-events-none w-[50%] sm:w-full' /></div>
          {/* <Link to={'/home'} className='flex items-center justify-center  mt-10'>
                        <button type="submit" className="bg-yellow-900 text-white text-lg font-semibold px-12 py-3 rounded-lg">
                          Continue
                        </button>
                    </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Ninth;