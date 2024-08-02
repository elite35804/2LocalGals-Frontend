import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WithDashboardLayout from "@/hoc/WithDashboardLayout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Close, Check } from "@mui/icons-material";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useActions, useAppState } from "@/store";
import moment from "moment";

const UpdateUnavailability = () => {
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const state = useAppState();
  const actions = useActions();
  const recurrences = [
    { id: 0, label: "None" },
    { id: 2, label: "Weekly" },
    { id: 3, label: "Bi-Weekly" },
  ];
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getListByDate(date);
  }, [date]);

  const getListByDate = (selected) => {
    const data = state.user.unavailabilities?.filter(
      (d) =>
        moment(d?.dateRequested).format("YYYY-MM-DD") ===
        moment(selected).format("YYYY-MM-DD")
    );
    if (data?.length > 0) {
      const items = [];
      data?.map((d) => {
        items.push({
          id: d?.unavailableID,
          startTime: moment(
            new Date(d?.startTime).setHours(
              new Date(d?.startTime).getHours() -
                new Date().getTimezoneOffset() / 60
            )
          ).format("HH:mm"),
          endTime: moment(
            new Date(d?.endTime).setHours(
              new Date(d?.endTime).getHours() -
                new Date().getTimezoneOffset() / 60
            )
          ).format("HH:mm"),
          recurrence: d?.recurrenceType,
        });
      });
      setList(items?.sort((a, b) => (a.startTime > b.startTime ? 1 : -1)));
    } else {
      const items = [];
      items.push({
        id: null,
        startTime: "06:00",
        endTime: "21:00",
        recurrence: 0,
      });
      setList(items);
    }
  };

  const getData = async () => {
    await actions.user.getUnavailabilities({
      FromDate: "5/1/2024",
      ToDate: "1/1/2025",
    });
    getListByDate(date);
  };

  const handleChange = (key, value, index) => {
    const items = [...list];
    items[index][key] = value;
    setList(items);
  };

  const onDeleteById = async (id) => {
    try {
      if (id) {
        await actions.user.deleteUnavailability(id);
        await getData();
        actions.alert.showSuccess({ message: "Deleted successfully" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSaveById = async (id) => {
    try {
      if (id) {
        await actions.user.deleteUnavailability(id);
      }
      const item = list.find((d) => d?.id === id);
      const startDate = new Date(date);
      startDate.setHours(item?.startTime?.split(":")?.[0]);
      startDate.setMinutes(item?.startTime?.split(":")?.[1]);
      const endDate = new Date(date);
      endDate.setHours(item?.endTime?.split(":")?.[0]);
      endDate.setMinutes(item?.endTime?.split(":")?.[1]);
      await actions.user.addUnavailability({
        dateRequested: date,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        recurrenceID: 0,
        recurrenceType: item?.recurrence,
      });
      await getData();
      actions.alert.showSuccess({ message: "Edited successfully" });
    } catch (e) {
      console.log(e);
    }
  };

  const onAdd = () => {
    const items = [...list];
    items.push({
      id: null,
      startTime: "06:00",
      endTime: "21:00",
      recurrence: 0,
    });
    setList(items);
  };

  return (
    <>
      <div className="login_page min-h-screen">
        <div className="container">
          <div className="bg-white p-3 mt-3 w-full mx-auto rounded-lg sm:w-full">
            <KeyboardBackspaceIcon
              sx={{
                fontSize: "40px",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "50%",
                color: "#fda839",
              }}
              onClick={() => navigate(-1)}
            />
            <h2 className="font-medium text-base heading mt-3  ">
              Update Unavailability
            </h2>
            <div className="grid grid-cols-3 md:justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md mt-5 w-full"
                dates={state.user.unavailabilities}
              />
              <div className="w-full col-span-2 space-y-2">
                <div className="flex justify-end items-end">
                  <button
                    onClick={onAdd}
                    className="main_btn border border-transparent text-center mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg flex justify-center items-center"
                  >
                    <span className="">Add New Unavailability</span>
                  </button>
                </div>
                {list?.map((l, id) => (
                  <div
                    key={l?.id}
                    className="flex items-center flex-1 w-full space-x-4"
                  >
                    <div className="flex sm:flex-col flex-row sm:space-x-0 space-x-4 flex-1">
                      <div className="flex-1">
                        <h2 className="font-medium text-base heading mt-3  ">
                          Start Time
                        </h2>
                        <input
                          type="time"
                          placeholder="Start date"
                          className="border outline-none px-2 rounded-md py-2 w-full"
                          value={l?.startTime}
                          onChange={(e) =>
                            handleChange("startTime", e.target.value, id)
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-medium text-base heading mt-3  ">
                          End Time
                        </h2>
                        <input
                          type="time"
                          placeholder="End date"
                          className="border outline-none px-2 rounded-md py-2 w-full"
                          value={l?.endTime}
                          onChange={(e) =>
                            handleChange("endTime", e.target.value, id)
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-medium text-base heading mt-3  ">
                          Recurrence
                        </h2>
                        <Select
                          className="w-full"
                          value={l?.recurrence}
                          onValueChange={(e) =>
                            handleChange("recurrence", e, id)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {recurrences?.map((r) => (
                                <SelectItem value={r?.id} key={r?.id}>
                                  {r?.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <a className="mt-8">
                        <Check
                          sx={{
                            fontSize: "30px",
                            cursor: "pointer",
                            padding: "2px",
                            color: "green",
                          }}
                          onClick={() => onSaveById(l?.id)}
                        />
                      </a>
                      <a className="mt-8">
                        <Close
                          sx={{
                            fontSize: "30px",
                            cursor: "pointer",
                            padding: "2px",
                            color: "red",
                          }}
                          onClick={() => onDeleteById(l?.id)}
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="flex items-center justify-center gap-6">
              <button
                onClick={onDelete}
                className="hover:bg-yellow-900 hover:text-white transition-all text-center mt-10 border border-yellow-900 text-xs font-semibold px-12 py-3 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={onSave}
                className="main_btn border border-transparent text-center mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg flex justify-center items-center"
              >
                {!loading ? (
                  <span className="">Save</span>
                ) : (
                  <RotatingLines
                    visible={true}
                    height="20"
                    width="20"
                    color="white"
                    strokeWidth="5"
                    strokeColor="gray"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                )}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WithDashboardLayout(UpdateUnavailability);
