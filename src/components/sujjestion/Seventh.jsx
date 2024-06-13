
import { Link } from 'react-router-dom';
import Header from '../Header';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import seven_img from '../../assets/seven.png'
const Seventh = () => {
    return (
        <div className=''>
            {/* <Header /> */}
            <div className='container '>
                <div className='bg-white p-3 sm:p-0 mt-5 rounded-xl mx-auto'>
                   {/* <Link to={'/sixth'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
             {/* <div className='w-[80%] lg:w-full mx-auto'>
                     
             <div className='timer_list'>
                             <ul className='list-disc once_list'>
                                <li className='text-grey-500 font-semibold mb-1'>Once each item is completed, check it off.</li>
                                
                                <li className='text-grey-500 font-semibold mb-1'>To go back to the main checklist, click on the arrow button.</li>
                                
                             </ul>
                  
                      
                    </div>
<div className='flex items-start justify-between md:block'>
    
<table width="100%" className='mt-10 general_clean_items'>
                 <tr>
                    <th className='font-bold text-start sm:w-[66%] pl-2 text-lg sm:text-m'>Kitchen</th>
                    <th className='text-red-500 text-bold text-start sm:text-center text-lg sm:text-m '>Not Completed</th>
                 </tr>

                 <tbody>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Take Before/After Pictures</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
              
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1 '>General dusting and remove cobwebs</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
              
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Damp wipe countertops & cloth dry</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>

                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Clean outsides of range hood</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
   
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Clean top/front of range and fridge</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4 border-solid-red' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"/>
             
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Clean top/front of all appliances</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
       
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Wipe out Microwave</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
       
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Do any dishes or place in dishwasher</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
       
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Clean/disinfect sink</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
       
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Empty garbage and replace liner</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
       
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Sweep/vacuum any hard flooring</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
       
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Mop any hard flooring</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
       
                     
                        </td>
                        
                    </tr>
                 </tbody>
                
                </table>    

               <table width="100%" className='mt-10 general_clean_items'>
                 <tr>
                    <th className='font-bold text-start deep_clean text-lg sm:text-m'>Deep clean items</th>
                    <th className='text-red-500 text-bold text-start sm:text-center text-lg sm:text-m'>Not Completed</th>
                 </tr>

                 <tbody>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Kitchen Cupboard(Outside only)</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike"/>
                 
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1 '>Bath Cupboards(Outside only)</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
              
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'> Inside Oven</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
            
                     
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                        <ul className='list-disc once_list mt-4'>
                        <li className='text-grey-500 font-semibold mb-1'>Fridge/Freezer</li>
                       </ul>
                     
                        </td>
                        <td className='sm:text-center'>
                       
                <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked/>
          
                     
                        </td>
                        
                    </tr>
              
                 </tbody>
                
                </table>    
</div>
             </div>
                */}
                <div className='flex justify-center'><img src={seven_img} alt="" className='pointer-events-none w-[50%] sm:w-full' /></div>

                    {/* <Link to={'/eight'} className='flex items-center justify-center  mt-10'>
                        <button type="submit" className="bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                            Next
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Seventh;