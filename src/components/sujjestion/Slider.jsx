import React, { useState } from 'react'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Header from '../Header';
import First from '@/components/sujjestion/First'
import Second from '@/components/sujjestion/Second'
import { useNavigate } from 'react-router-dom';
import Third from '@/components/sujjestion/Third';
import Fourth from '@/components/sujjestion/Fourth'
import Fifth from '@/components/sujjestion/Fifth'
import Sixth from '@/components/sujjestion/Sixth'
import Seventh from '@/components/sujjestion/Seventh'
import Eight from '@/components/sujjestion/Eight'
import Ninth from '@/components/sujjestion/Ninth'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Slider = () => {
  const navigate = useNavigate();
  const handleslider = () => {
    if (index === data.length - 1) {
      navigate('/home');  // Replace '/dashboard' with your actual dashboard route
    } else {
      setindex(index + 1);
    }
  }

  const handleprev = () => {
    setindex(index - 1);
  }

  let data = [<First />, <Second />, <Third />, <Fourth />, <Fifth />, <Sixth />, <Seventh />, <Eight />, <Ninth />];
  const [index, setindex] = useState(0);
  return (
    <div className='min-h-screen '>
      <Header />
      <div className='container'>
        <div className='bg-white  mt-5 rounded-xl'>
          {index === 0 ? '' : (<buttton onClick={handleprev}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", marginLeft:"20px" , marginTop:"15px", borderRadius: "50%", color: "#fda839" }} /></buttton>)}
          {data[index]}
          <div className='flex items-center justify-center flex-col pb-4  mt-10'>
            <div className="dots-container">
              {data.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`dot ${index === dotIndex ? 'active' : ''}`}
                  onClick={() => setindex(dotIndex)}
                ></span>
              ))}
            </div>
            <button onClick={handleslider} className="bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg next_buton">
              {index === data.length - 1 ? 'Continue' : 'Next'}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Slider;