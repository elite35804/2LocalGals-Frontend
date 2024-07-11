import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WithDashboardLayout from "@/hoc/WithDashboardLayout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useActions, useAppState } from "@/store";
import moment from "moment";

const UpdateUnavailability = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const state = useAppState();
  const actions = useActions();
  const recurrences = [
    { id: 0, label: "None" },
    { id: 1, label: "Weekly" },
    { id: 2, label: "Bi-Weekly" }
  ];
  const [recurrence, setRecerrence] = useState(0);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setStartTime("");
    setEndTime("");
    setRecerrence(0);
    const data = state.user.unavailabilities
      ?.filter(
        (d) =>
          moment(d?.dateRequested).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      )
      ?.reverse()?.[0];
    console.log(
      state.user.unavailabilities?.filter(
        (d) =>
          moment(d?.dateRequested).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      )
    );
    if (data) {
      setSelected(data);
      setStartTime(
        moment(
          new Date(data?.startTime).setHours(
            new Date(data?.startTime).getHours() -
              new Date().getTimezoneOffset() / 60
          )
        ).format("HH:mm")
      );
      setEndTime(
        moment(
          new Date(data?.endTime).setHours(
            new Date(data?.endTime).getHours() -
              new Date().getTimezoneOffset() / 60
          )
        ).format("HH:mm")
      );
      setRecerrence(data?.recurrenceType);
    }
  }, [date]);

  const getData = async () => {
    setStartTime("");
    setEndTime("");
    setRecerrence(0);
    await actions.user.getUnavailabilities({
      FromDate: "5/1/2024",
      ToDate: "1/1/2025",
    });

    const data = state.user.unavailabilities
      ?.filter(
        (d) =>
          moment(d?.dateRequested).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      )
      ?.reverse()?.[0];
    if (data) {
      console.log(new Date(data?.startTime + ".000Z"));
      setSelected(data);
      setStartTime(
        moment(
          new Date(data?.startTime).setHours(
            new Date(data?.startTime).getHours() -
              new Date().getTimezoneOffset() / 60
          )
        ).format("HH:mm")
      );
      setEndTime(
        moment(
          new Date(data?.endTime).setHours(
            new Date(data?.endTime).getHours() -
              new Date().getTimezoneOffset() / 60
          )
        ).format("HH:mm")
      );
      setRecerrence(data?.recurrenceType);
    }
  };

  const onDelete = async () => {
    console.log(selected, "selected");
    try {
      const data = state.user.unavailabilities?.filter(
        (d) =>
          moment(d?.dateRequested).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );
      for (let i = 0; i < data?.length; i++) {
        await actions.user.deleteUnavailability(data[i]?.unavailableID);
      }
      await getData();
      actions.alert.showSuccess({ message: "Deleted successfully" });
    } catch (e) {
      console.log(e);
    }
  };

  const onSave = async () => {
    console.log(startTime, endTime, recurrence);

    if (!startTime) {
      actions.alert.showError({ message: "Please input start date!" });
      return false;
    }
    if (!endTime) {
      actions.alert.showError({ message: "Please input end date!" });
      return false;
    }
    const startDate = new Date(date);
    startDate.setHours(startTime?.split(":")?.[0]);
    startDate.setMinutes(startTime?.split(":")?.[1]);

    const endDate = new Date(date);
    endDate.setHours(endTime?.split(":")?.[0]);
    endDate.setMinutes(endTime?.split(":")?.[1]);
    try {
      setLoading(true);
      const res = await actions.user.addUnavailability({
        dateRequested: date,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        recurrenceID: 0,
        recurrenceType: recurrence,
      });
      console.log(res, "res");
      if (res) {
        await getData();
        actions.alert.showSuccess({
          message: res,
        });
        // navigate(-1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
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
              <div className="flex gap-4">
                <div>
                  <h2 className="font-medium text-base heading mt-3  ">
                    Start Time
                  </h2>
                  <input
                    type="time"
                    placeholder="Start date"
                    className="border outline-none px-2 rounded-md py-2 w-full"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="font-medium text-base heading mt-3  ">
                    End Time
                  </h2>
                  <input
                    type="time"
                    placeholder="End date"
                    className="border outline-none px-2 rounded-md py-2 w-full"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full">
                <h2 className="font-medium text-base heading mt-3  ">
                  Recurrence
                </h2>
                <Select
                  className="w-full"
                  value={recurrence}
                  onValueChange={setRecerrence}
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
            <div className="flex items-center justify-center gap-6">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithDashboardLayout(UpdateUnavailability);
