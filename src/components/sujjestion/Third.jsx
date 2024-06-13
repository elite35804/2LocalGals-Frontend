import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../Header';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import SendIcon from '@mui/icons-material/Send';
import TodayIcon from '@mui/icons-material/Today';
import WithDashboardLayout from '@/hoc/WithDashboardLayout';
const Third = () => {
  const params = useLocation()
  console.log(params.pathname)
  return (
    <div className=''>
      {params.pathname == '/walk_through' ? null : <Header />}
      <div className='container'>
        <div className='bg-white p-4 mt-5 rounded-xl'>
          <div className='status'>
            <p className='text-red-500 text-end font-bold'>Not Completed</p>
          </div>
          <div className='Brad_allen_section mt-8'>
            <div className='flex justify-between'>
              <p className='font-bold text-lg'>Brad ALLen</p>
              <p><AddIcCallIcon sx={{ color: "#478e00" }}></AddIcCallIcon>   <InsertCommentIcon sx={{ color: "#6fc1e9" }}></InsertCommentIcon>  </p>
            </div>
            <div className='flex items-center justify-between mt-5 march_date'>
              <div>
                <p className='text-grey-500 font-semibold'> <TodayIcon sx={{ color: "grey" }}></TodayIcon> Mar 31</p>
              </div>
              <div>
                <p className='text-grey-500 font-semibold'><WatchLaterIcon sx={{ color: "#fda839" }}></WatchLaterIcon> 9:30 to 11:00 </p>
              </div>
              <div className='sm:w-full md:w-full '>
                <div className='flex items-center gap-5 send_icon justify-between'>
                  <p className='font-semibold'><b>Address</b> <span className='text-grey-500 font-semibold'>:28446 Brach Dr, SLC</span></p>
                  <p className='icon_width'><SendIcon sx={{ bgcolor: "#2ab2eb", color: "#fff", borderRadius: '100%', width: '35px', lineHeight: '30px', height: '35px', padding: '7px' }}></SendIcon></p>
                </div>
              </div>
              {/* partner */}
              <div className='sm:w-full md:w-full'>
                <div className='flex gap-5 items-center mt-3 send_icon justify-between'>
                  <p><b>Partners(s)</b> <span className='text-grey-500 font-semibold'>Kimber Stovall</span></p>
                  <p><AddIcCallIcon sx={{ color: "#478e00" }}></AddIcCallIcon>   <InsertCommentIcon sx={{ color: "#6fc1e9" }}></InsertCommentIcon>  </p>
                </div>
              </div>
              <div className='mt-3'>
                <p><b>Approx.Pay</b>: <span className='text-red-500 font-semibold'> $60.70</span></p>
              </div>
            </div>
          </div>
          <hr className='border-dashed border-gray-500  mt-5' />
          {/* buildinginformation */}
          <div className="building mt-4 flex  justify-between">
            <div>
              <div>
                <p className='font-bold text-lg'>Building Information: <span className='text-[#5e72f7] font-bold'>(Take Keys)</span> </p>
                <p className='text-grey-500 font-semibold'>SF(2000), Beds(2), Baths(2), Take Vaccum Pets(+3), Clean Rafting(5), Flooring(Carpet, Hardwood)</p>
              </div>
            </div>
            <div>
              <div>
                <p className='font-bold'>Cleaning Types:</p>
                <p className='text-grey-500 font-semibold'>General Clean Plus</p>
              </div>
            </div>
            <div>
              <div>
                <p className='font-bold'>Deep Cleaning Items</p>
                <ol className='list-decimal px-4 text-grey-500 font-semibold'>
                  <li>Kitch Cupboards (Outsides Only)</li>
                  <li>Bath Cupboards (Outsides Only)</li>
                  <li>Oven</li>
                  <li>Refrigerator</li>
                </ol>
              </div>
            </div>
          </div>
          <hr className='border-dashed mt-5' />
          <div className="Details flex justify-between mt-8">
            <div>
              <div>
                <p className='font-bold text-lg'>Details:</p>
                <p className='text-grey-500 font-semibold'>SF(2000), Beds(2), Baths(2), Take Vaccum Pets(+3), Clean Rating(5), Flooring(Carpet, Hardwood)</p>
              </div>
            </div>
            <div>
              <div>
                <p className='font-bold'>Payment Type:</p>
                <p className='text-[#a1d6f1] font-semibold'><u>Check(Collect $170)</u></p>
              </div>
            </div>
            <div>
              <div>
                <p className='font-bold'>Before/After Pics Required:</p>
                <p className='text-[#a1d6f1] font-semibold' > Yes</p>
              </div>
            </div>
          </div>
          {/* not complete */}
          <hr className='border-dashed mt-5' />
          <div className='notcomplete flex justify-between mt-5 items-center' >
            <div className='flex gap-5 Details'>
              <p><AddIcCallIcon sx={{ color: "#478e00" }}></AddIcCallIcon>   <InsertCommentIcon sx={{ color: "#6fc1e9" }}></InsertCommentIcon>  </p>
              <p className='text-grey-500 font-semibold'>Call/Text Client or partner(s)</p>
            </div>
            <div>
              <div className='flex gap-5 Details complete_space'>
                <p className='font-bold text-red-500 text-lg '>Not Complete</p>
                <p className='text-grey-500 font-semibold'>Shows the job status</p>
              </div>
            </div>
            <div>
              <div className='flex gap-5 items-center Details complete_space'>
                <p><SendIcon sx={{ bgcolor: "#2ab2eb", color: "#fff", borderRadius: '100%', width: '35px', lineHeight: '30px', height: '35px', padding: '7px' }}></SendIcon></p>
                <p className='text-grey-500 font-semibold'>Click to navigate to client</p>
              </div>
            </div>
            <div>
              <div className='flex gap-5 Details complete_space'>
                <p className='text-red-500 font-bold text-lg'>$60.70</p>
                <p className='text-grey-500 font-semibold'>Approximate pay for the  job</p>
              </div>
            </div>
          </div>
          {/* takekeys */}
          <hr className='border-dashed mt-5' />
          <div className='take_keys notcomplete flex justify-between mt-10'>
            <div>
              <p className='text-[#5e72f7] font-bold  text-lg'>(Take Keys)</p>
              <p className='text-grey-500 font-semibold'>Be sure to see if you need  keys</p>
            </div>
            <div>
              <p className='font-bold complete_space  text-lg'>Details:</p>
              <p className='text-grey-500 font-semibold'>Cleaning details. <span className='text-red-500'>Read each time!</span></p>
            </div>
            <div>
              <p className=' text-[#a1d6f1] font-bold complete_space  text-lg'><u>Check (Collect $170)</u></p>
              <p className='text-grey-500 font-semibold'>Collect payment if it is cash or check</p>
            </div>
            <div>
              <p className='font-bold complete_space  text-lg'>Before/After Pics Required: <span className='text-[#a1d6f1]'><u>Yes</u></span></p>
              <p className='text-grey-500 font-semibold'>Tells you if before/After pictures are required of each area.</p>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default WithDashboardLayout(Third)
