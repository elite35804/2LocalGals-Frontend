
import { Link } from 'react-router-dom';
import Header from '../Header';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddBoxIcon from '@mui/icons-material/AddBox';
import sixth_img from '../../assets/six.png'
const Sixth = () => {
    return (
        <div className=''>
            {/* <Header /> */}
            <div className='container '>
                <div className='bg-white p-3 sm:p-0 mt-5 rounded-xl mx-auto'>
                   {/* <Link to={'/fifth'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
             {/* <div className='w-[60%] lg:w-full mx-auto'>
                     
             <div className='timer_list'>
                             <ul className='list-disc once_list'>
                                <li className='text-grey-500 font-semibold mb-1'>This is your checklist. Everything needs to be completed for the job to be done.</li>
                                
                                <li className='text-grey-500 font-semibold mb-1'>Click on the <AddBoxIcon sx={{color:"#6fc1e9"}} ></AddBoxIcon> to open the checklist for that particular area</li>
                                <li className='text-grey-500 font-semibold mb-1'>Once the entire area is complete, a green check mark will automatically appear next to the area    <input className='ms-2 checkbox_class' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/></li>
                             </ul>
                  
                      
                    </div>
<div className='flex justify-between md:block'>
    
<table width="100%" className='mt-10 general_clean_items '>
                 <tr>
                    <th className='font-bold text-start text-lg sm:text-m'>General clean items</th>
                    <th className='text-red-500 text-bold text-start text-lg sm:text-m' >Not Completed</th>
                 </tr>

                 <tbody>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Master Bathroom</li>
                       </ul>
                     
                        </td>
                        <td className=''>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
                <AddBoxIcon sx={{color:"#6fc1e9",marginTop:'-10px' ,marginLeft:'5px'}}  ></AddBoxIcon>  
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1 '>Master Bedroom</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
                <AddBoxIcon sx={{color:"#6fc1e9",marginTop:'-10px',marginLeft:'5px'}}  ></AddBoxIcon>  
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Bathroom 2</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
                <AddBoxIcon sx={{color:"#6fc1e9",marginTop:'-10px' ,marginLeft:'5px'}}  ></AddBoxIcon>  
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Bathroom 2</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
                <AddBoxIcon sx={{color:"#6fc1e9",marginTop:'-10px' ,marginLeft:'5px'}}  ></AddBoxIcon>  
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Kitchen</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4 border-solid-red' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"/>
                <AddBoxIcon sx={{color:"#6fc1e9",marginTop:'-10px',marginLeft:'5px'}}  ></AddBoxIcon>  
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Other Rooms/Areas</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
                <AddBoxIcon sx={{color:"#6fc1e9",marginTop:'-10px' ,marginLeft:'5px'}}  ></AddBoxIcon>  
                     
                        </td>
                        
                    </tr>
                 </tbody>
                
                </table>    

               <table width="100%" className='mt-8 general_clean_items'>
                 <tr>
                    <th className='font-bold text-start deep_clean text-lg sm:text-m'>Deep clean items</th>
                    <th className='text-red-500 text-bold text-start text-lg sm:text-m'>Not Completed</th>
                 </tr>

                 <tbody>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Kitchen Cupboard(Outside only)</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"/>
                 
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1 '>Bath Cupboards(Outside only)</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
              
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Inside Oven</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
            
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Fridge/Freezer</li>
                       </ul>
                     
                        </td>
                        <td>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
          
                     
                        </td>
                        
                    </tr>
              
                 </tbody>
                
                </table>  
    </div>  
             
             
             </div> */}

               <div className='flex justify-center'><img src={sixth_img} alt="" className='pointer-events-none w-[50%] sm:w-full' /></div>
                    {/* <Link to={'/seventh'} className='flex items-center justify-center  mt-10'>
                        <button type="submit" className="bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                            Next
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Sixth;