import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";



import { useState } from "react";
const Finish = () => {
  const params = useLocation();
  console.log(params.pathname);

  const [allchecked, setchecked] = useState(false);
  const handlechecked = () => {
    setchecked(!allchecked);
  };

 
  const handelcheck = () => {
    setcheked(!check);
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      {params.pathname == "/walk_through" ? null : <Header />}
      <div className="container">
        <div className="bg-white p-4 mt-5 rounded-xl">
          <div>
            <h3 className="font-bold text-lg">Finished Checklist</h3>
            <div className="timer_list w-[50%] md:w-full lg:w-[62%]">
              <ul className="once_list flex gap-5 justify-between pe-4 items-center mt-4 bg-[#d9d9d9] py-3 rounded-xl">
                <li className="text-grey-500 font-semibold circule_icon mb-1 circule_icon">
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

              <ul className=" once_list flex gap-5 justify-between pe-4 items-center mt-4 bg-[#d9d9d9] py-3   rounded-xl">
                <li className="text-grey-500 font-semibold circule_icon mb-1 ">
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

              <ul className=" justify-between pe-4 once_list flex gap-5 items-center mt-4 bg-[#d9d9d9] py-3   rounded-xl">
                <li className="text-grey-500 font-semibold circule_icon mb-1 ">
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

              <ul className=" justify-between pe-4 once_list flex gap-5 items-center mt-4 bg-[#d9d9d9] py-3   rounded-xl">
                <li className="text-grey-500 font-semibold circule_icon mb-1 ">
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
          <div className="flex items-center justify-center  mt-10">
            <button
              onClick={() => navigate("/home")}
              type="submit"
            style={allchecked?{background:"green"}:{background:"grey"}}
              className="  border border-transparent text-white text-lg w-[20%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 "
              disabled={allchecked? false : true}
            >
              Finish Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finish;
