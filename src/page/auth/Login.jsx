import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useLocation, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/joy/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Login = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault();
   handleOpen();

    setTimeout(()=>{
        navigate('/walk_through')
    },500)

    }
    return (
        <div className='login_page h-screen'>
            <div className='2xl:max-w-[350px] w-full max-w-[330px] mx-auto h-full justify-center flex flex-col gap-2 px-2'>
                <div className='text-center'>
                    <div className='flex justify-center'>
                        <img className='rounded-full border-2 w-28 h-28' src="https://scontent.fixc1-7.fna.fbcdn.net/v/t39.30808-6/277778836_401580788636662_7687958163370346394_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=n1rh91JcfWYQ7kNvgGwO6FN&_nc_ht=scontent.fixc1-7.fna&oh=00_AYAZlM9hpL2MmcpYjioCEOWf9GKvHu85F0bceQfYC-AT5g&oe=6669ECD3" alt="" />
                    </div>
                    <h2 className="font-bold text-white text-2xl heading mt-3">Welcome</h2>
                </div>
                <h2 className="font-bold text-white text-base heading mt-8">Log In to your account</h2>
                {/* <h4 className="2xl:text-base font-semibold text-xs">Welcome back!</h4>
                <p className="text-[12px] 2xl:text-base text-input-placeholder">Please enter your Unique password to sign in</p> */}
                <form className="flex flex-col mt-2" onSubmit={onSubmit} >
                    <div className="2xl:p-4 focus:border bg-white border-input-placeholder focus:border-[#000E2F70] flex items-center gap-x-2 rounded-xl p-4 relative mt-2">
                        <EmailIcon sx={{ fontSize: "15px", color: "#747474" }} />
                        <input placeholder="Email" className="w-full bg-transparent outline-none text-[12px] text-input-placeholder" type="email" id="email" />
                    </div>
                    <div className="2xl:p-4 bg-white border-input-placeholder items-center flex gap-x-2 rounded-xl p-4 relative mt-4">
                        <KeyIcon sx={{ fontSize: "15px", color: "#747474" }} />
                        <input
                            placeholder="Password"
                            className="w-full outline-none bg-transparent text-[12px] text-input-placeholder"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                        />
                        {showPassword ? (
                            <VisibilityOffIcon
                                sx={{ fontSize: "15px", color: "#747474", cursor: 'pointer' }}
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <VisibilityIcon
                                sx={{ fontSize: "15px", color: "#747474", cursor: 'pointer' }}
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </div>
                    {/* <p className="text-[11px] my-2 mr-2 text-input-placeholder w-max ml-auto" >Forgot Password ?</p> */}
                    <button type="submit" className="border border-transparent main_btn text-center mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                        <div className='flex items-center justify-center'>
                            <span className=''>Sign In</span>
                        </div>
                    </button>
                </form>
                {/* <div className='mt-5'>
                <div className='flex items-center'>
                    <span className='w-[28%] h-[1px] bg-blue-900'></span>
                    <p className='w-[44%] text-xs'>New to Our Computer guy?</p>
                    <span className='w-[28%] h-[1px] bg-blue-900'></span>
                </div>
                <Link to='/signup'>
                    <div className='border mt-5 text-center border-blue-900 rounded-md py-1'>
                        <button className='text-xs font-semibold'>Sign Up</button>
                    </div>
                </Link>
            </div> */}
            </div>

          
      <Snackbar style={{background:"#C4FFD5"}}
      
        open={open}
        autoHideDuration={2000} // Optional: Adjust duration as needed
        onClose={handleClose}
        message="Snackbar message"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }
    
    } 
      >   Login Succesfull <CheckCircleIcon style={{ color: 'white', fontSize: '2rem'  }} className='ms-auto'></CheckCircleIcon>  </Snackbar>
        </div>
    )
}

export default Login