import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import First from '@/components/sujjestion/First';
import Second from '@/components/sujjestion/Second';
import Third from '@/components/sujjestion/Third';
import Fourth from '@/components/sujjestion/Fourth';
import Fifth from '@/components/sujjestion/Fifth';
import Sixth from '@/components/sujjestion/Sixth';
import Seventh from '@/components/sujjestion/Seventh';
import Eight from '@/components/sujjestion/Eight';
import Ninth from '@/components/sujjestion/Ninth';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Slider = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index === data.length - 1) {
      navigate('/home');  // Replace '/home' with your actual home route
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true // enables mouse swipe functionality
  });

  const data = [<First />, <Second />, <Third />, <Fourth />, <Fifth />, <Sixth />, <Seventh />, <Eight />, <Ninth />];

  return (
    <div className='min-h-screen' {...handlers}>
      <div className='container'>
        <div className='bg-white mt-5 rounded-xl'>
          {index > 0 && (
            <button onClick={handlePrev}>
              <KeyboardBackspaceIcon
                sx={{ fontSize: '40px', cursor: 'pointer', padding: '5px', marginLeft: '20px', marginTop: '15px', borderRadius: '50%', color: '#fda839' }}
              />
            </button>
          )}
          {data[index]}
          <div className='flex items-center justify-center flex-col pb-4 mt-10'>
            <div className='dots-container'>
              {data.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`dot ${index === dotIndex ? 'active' : ''}`}
                  onClick={() => setIndex(dotIndex)}
                ></span>
              ))}
            </div>
            <button onClick={handleNext} className='bg-yellow-900 main_btn border border-transparent text-white text-xs font-semibold px-12 py-3 rounded-lg next_button'>
              {index === data.length - 1 ? 'Continue' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
