
import { Link } from 'react-router-dom';
import Header from '../Header';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddBoxIcon from '@mui/icons-material/AddBox';
const Ninth = () => {
    return (
        <div className=''>
            {/* <Header /> */}
            <div className='container '>
                <div className='bg-white p-3 mt-5 rounded-xl mx-auto'>
                   {/* <Link to={'/eight'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
             <div className='w-[50%] sm:w-full mx-auto'>
                     
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
      <figure className='flex justify-center'>
        <img src="src\assets\ss.png" alt="" className='w-[70%]' />
      </figure>
    </div>
     

                {/* notes */}


      
             </div>

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