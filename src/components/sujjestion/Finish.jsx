import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";

import { useState } from "react";
import { useActions, useAppState } from "@/store";
import moment from "moment";
const Finish = () => {
  const params = useParams();
  const actions = useActions();
  const state = useAppState();
  const data = [
    {
      label: "Did you upload all Before/After pics, if applicable",
      isChecked: false,
    },
    {
      label: "Have you double checked your work?",
      isChecked: false,
    },
    {
      label: "Did the customer do a walthrough, if possible?",
      isChecked: false,
    },
    {
      label: "Have you double checked your partners work, if you had one?",
      isChecked: false,
    },
  ];
  const [options, setOptions] = useState(data);

  const handleChecked = (checked, item) => {
    console.log(checked, item);
    const items = [...options];
    items.find((i) => i?.label === item?.label).isChecked = checked;
    setOptions(items);
  };
  console.log(options, "options");
  const navigate = useNavigate();

  const allChecked = () => {
    return options?.filter((o) => o?.isChecked)?.length === options?.length;
  };

  const onFinish = async () => {
    const res = await actions.appointment.endJob(params?.id);
    await actions.appointment.getAppointments({
      startDate: moment().format("M/D/YYYY"),
      endDate: moment().endOf("month").format("M/D/YYYY"),
    });
    if (res) {
      actions.alert.showSuccess({ message: "Job finished successfully!" });
      navigate("/home");
    }
  };
  return (
    <div className="min-h-screen">
      {params.pathname == "/walk_through" ? null : <Header />}
      <div className="container">
        <div className="bg-white p-4 mt-5 rounded-xl">
          <div>
            <h3 className="font-bold text-lg">Finished Checklist</h3>
            <div className="timer_list w-full">
              {options?.map((l, i) => (
                <ul
                  key={l?.label}
                  className="once_list flex gap-5 justify-between pe-4 items-center mt-4 bg-[#d9d9d9] py-3 rounded-xl"
                >
                  <li className="text-grey-500 font-semibold circule_icon mb-1 circule_icon">
                    {l?.label}
                  </li>
                  <input
                    className="checkbox_class w-[17px] h-[17px] sm:w-[23px]"
                    type="checkbox"
                    name="vehicle1"
                    value="Bike"
                    checked={l?.isChecked}
                    onChange={(e) => handleChecked(e.target.checked, l)}
                  />
                </ul>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center  mt-10">
            <button
              onClick={() => onFinish()}
              type="submit"
              style={
                allChecked() ? { background: "green" } : { background: "grey" }
              }
              className="  border border-transparent text-white text-lg w-[20%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 "
              disabled={allChecked() ? false : true}
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
