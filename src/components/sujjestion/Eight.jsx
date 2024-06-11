
import { Link } from 'react-router-dom';
import Header from '../Header';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddBoxIcon from '@mui/icons-material/AddBox';
const Eight = () => {
    return (
        <div className=''>
            {/* <Header /> */}
            <div className='container '>
                <div className='bg-white p-3 mt-5 rounded-xl mx-auto'>
                    {/* <Link to={'/Seventh'}><KeyboardBackspaceIcon sx={{ fontSize: "40px", cursor: "pointer", padding: "5px", borderRadius: "50%", color: "#fda839" }} /></Link> */}
                    <div className='w-[70%] sm:w-full mx-auto'>

                        <div className='timer_list'>
                            <ul className='list-disc once_list'>
                                <li className='text-grey-500 font-semibold mb-1'>Once the job is completed, add any notes, upload any pictures, then click Next.</li>
                                <li className='text-red-400 font-semibold timer_will mb-1 '>If you complete the job early, make sure there is nothing else you can do!</li>

                            </ul>


                        </div>
                        <div className='flex justify-between sm:block'>



                            <table width="100%" className='mt-10 general_clean_items'>
                                <tr>
                                    <th className='font-bold text-start'>General clean items</th>
                                    <th className='text-red-400 text-bold text-start'>Not Completed</th>
                                </tr>

                                <tbody>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'>Master Bathroom</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />
                                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px' }}  ></AddBoxIcon>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1 '>Master Bedroom</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />
                                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px' }}  ></AddBoxIcon>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'> Bathroom 2</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />
                                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px' }}  ></AddBoxIcon>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'>Bathroom 2</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />
                                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px' }}  ></AddBoxIcon>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'>Kitchen</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4 border-solid-red' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />
                                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px' }}  ></AddBoxIcon>

                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'>Other Rooms/Areas</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />
                                            <AddBoxIcon sx={{ color: "#6fc1e9", marginTop: '-10px' }}  ></AddBoxIcon>

                                        </td>

                                    </tr>
                                </tbody>

                            </table>

                            <table width="86%" className='mt-10 general_clean_items'>
                                <tr>
                                    <th className='font-bold text-start deep_clean'>Deep clean items</th>
                                    <th className='text-red-400 text-bold text-start'>Not Completed</th>
                                </tr>

                                <tbody>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'>Kitchen Cupboard(Outside only)</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />


                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1 '>Bath Cupboards(Outside only)</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />


                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'> Inside Oven</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />


                                        </td>

                                    </tr>
                                    <tr>
                                        <td>
                                            <ul className='list-disc once_list mt-4'>
                                                <li className='text-grey-500 font-semibold mb-1'>Fridge/Freezer</li>
                                            </ul>

                                        </td>
                                        <td>

                                            <input className='ms-2 checkbox_class w-[17px] h-[17px] mt-4' type="checkbox" id="vehicle2" name="vehicle1" value="Bike" checked />


                                        </td>

                                    </tr>

                                </tbody>

                            </table>


                        </div>


                        {/* notes */}



                    </div>
                    <hr className='border-dashed mt-4' />

                    <div className="container">

                        <div className='flex justify-between lg:block'>
                            <div className='mt-12'>
                                <h4 className='font-bold'>Notes</h4>
                                <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Type here....' className='custom_textarea xl:w-[400px] w-[500px] h-[250px] lg:w-full sm:h-[100px]'></textarea>

                            </div>



                            <div className='mt-12'>
                                <h4 className='font-bold'>Upload Pictures</h4>
                                <div className='w-[500px] xl:w-[400px] h-[250px] sm:w-full sm:h-[100px] lg:w-full border-2 border-dashed mt-4 border-grey-500 rounded-2xl  center_image'>

                                    <figure >
                                        <img src="src\assets\drag.png" />
                                    </figure>

                                </div>
                                <div className='text-center mt-5'><button className='bg-[#fda839] w-[150px] px-4 py-2 text-white rounded-lg'>
                                    Upload</button></div>

                            </div>
                        </div>
                    </div>

                    {/* <Link to={'/ninth'} className='flex items-center justify-center  mt-10'>
                        <button type="submit" className="bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg">
                            Next
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Eight;