import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState, useRef } from "react";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

import AddBoxIcon from "@mui/icons-material/AddBox";
import TodayIcon from "@mui/icons-material/Today";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Close } from "@mui/icons-material";
import { useActions, useAppState } from "@/store";
import { Settings } from "../../../settings";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import axios from "axios";
import "./Style.css";

const Startjob = () => {
  const params = useParams();
  const state = useAppState();
  const actions = useActions();
  const navigate = useNavigate();
  const initialDuration = 5400;
  const [seconds, setSeconds] = useState(0); // 1.5 hours in seconds
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [appointment, setAppointment] = useState({});
  const [step, setStep] = useState(0);
  const [generalItems, setGeneralItems] = useState([]);
  const [deepItems, setDeepItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const circleRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    getAppointment();
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timers =
        JSON.parse(localStorage.getItem("2localgals-timers")) || [];
      const timer = timers?.find((t) => t.appointmentId === params?.id);
      if (timer) {
        timer.time = seconds;
      } else {
        timers.push({ appointmentId: params?.id, time: seconds });
      }
      localStorage.setItem("2localgals-timers", JSON.stringify(timers));
    }
  }, [seconds]);

  useEffect(() => {
    if (appointment) {
      getDuration();
    }
  }, [appointment]);

  const getAppointment = async () => {
    const res = await actions.appointment.getAppointmentById(params?.id);
    console.log(res, "res");
    setAppointment(res);
    getGeneralItems(res);
    getDeepItems(res);
  };

  const getDuration = () => {
    const timers = JSON.parse(localStorage.getItem("2localgals-timers")) || [];
    const timer = timers?.find((t) => t?.appointmentId === params?.id);
    if (timer) {
      setSeconds(timer.time);
    } else {
      var ms = moment(appointment?.endTime, "hh:mm A").diff(
        moment(appointment?.startTime, "hh:mm A")
      );
      var d = moment.duration(ms);
      setSeconds(d?.asSeconds());
    }
  };

  // Handle navigation back
  const handleBack = () => {
    if (step === 0) {
      navigate(-1);
    } else {
      setStep(0);
    }
  };

  // Handle pause button click
  const handlePause = () => {
    setIsActive(false);
    setElapsedTime((seconds - startTime) / 1000);
  };

  const updateCoords = async (data) => {
    const res = await actions.appointment.updateCoordinate({
      id: params?.id,
      ...data,
    });
  };
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      updateCoords({ latitude, longitude });
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  };
  const getStarted = async () => {
    const res = await actions.appointment.startJob(params?.id);
    getPosition();
    if (res) {
      actions.alert.showSuccess({ message: "Job started successfully!" });
    }
  };

  // Handle reset button click
  const handleStart = () => {
    setIsActive(true);
    var ms = moment(appointment?.endTime, "hh:mm A").diff(
      moment(appointment?.startTime, "hh:mm A")
    );
    var d = moment.duration(ms);

    if (seconds === d?.asSeconds()) {
      console.log("-=-=-=-=-");
      getStarted();
    }
    if (seconds === 0) {
      // setSeconds(initialDuration);
    }
    setStartTime(seconds); // adjust start time based on elapsed time
    setElapsedTime(0);
    // No need to reset seconds here, as it's already managed by isActive state
  };

  // Handle checkbox toggle
  const handleChecked = (checked, parent, child, isGeneral) => {
    if (child) {
      const items = [...generalItems];
      items
        .find((i) => i.label === parent.label)
        .options.find((o) => o.label === child.label).isCompleted = checked;
      console.log(items);
      items.map(
        (i) =>
          (i.isCompleted =
            i?.options?.filter((o) => o?.isCompleted)?.length ===
            i?.options?.length)
      );
      console.log(items, "items");
      setGeneralItems(items);
    } else {
      const items = isGeneral ? [...generalItems] : [...deepItems];
      items.find((i) => i.label === parent.label).isCompleted = checked;
      items
        .find((i) => i.label === parent.label)
        ?.options?.map((o) => (o.isCompleted = checked));
      console.log(items);
      if (isGeneral) {
        setGeneralItems(items);
      } else {
        setDeepItems(items);
      }
    }
    // setAllChecked(!allChecked);
    // Implement logic for individual checkboxes if needed
  };

  // Format time as HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secondss = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secondss).padStart(2, "0")}`;
  };

  // Calculate circle style based on remaining time

  // Effect for countdown timer
  useEffect(() => {
    if (isActive) {
      setStartTime(Date.now() - elapsedTime * 1000); // adjust start time based on elapsed time
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
      if (circleRef.current) {
        const remainingTime = initialDuration - elapsedTime;
        circleRef.current.style.animation = `circletimer ${remainingTime}s linear`;
        circleRef.current.style.animationPlayState = "running";
      }
    } else {
      clearInterval(intervalRef.current);
      if (circleRef.current) {
        const computedStyle = window.getComputedStyle(circleRef.current);
        const animationPlayState = computedStyle.getPropertyValue(
          "animation-play-state"
        );
        if (animationPlayState === "running") {
          const animationDuration =
            parseFloat(computedStyle.getPropertyValue("animation-duration")) *
            1000; // in ms
          const animationElapsed = Date.now() - startTime;
          const animationRemaining = animationDuration - animationElapsed;
          circleRef.current.style.animation = `circletimer ${
            animationRemaining / 1000
          }s linear`;
          circleRef.current.style.animationPlayState = "paused";
        }
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, elapsedTime]);

  // Determine the class name based on the remaining time
  const getSvgClassName = () => {
    if (seconds === 0) {
      return "custom_svg red";
    } else if (seconds < 600) {
      return "custom_svg yellow";
    } else {
      return "custom_svg green";
    }
  };

  const getGeneralItems = (a) => {
    const items = [];
    if (!isNaN(parseInt(a?.Bedrooms))) {
      const item = {
        label: `Bedrooms(${a?.Bedrooms})`,
        isCompleted: false,
        options: [],
      };
      for (let i = 1; i <= parseInt(a?.Bedrooms); i++) {
        item.options.push({
          label: `Bedroom ${i}`,
          isCompleted: false,
        });
      }
      items.push(item);
    }

    if (!isNaN(parseInt(a?.Bathrooms))) {
      const item = {
        label: `Bathrooms(${a?.Bathrooms})`,
        isCompleted: false,
        options: [],
      };
      for (let i = 1; i <= parseInt(a?.Bathrooms); i++) {
        item.options.push({
          label: `Bathroom ${i}`,
          isCompleted: false,
        });
      }
      items.push(item);
    }

    const item = {
      label: `Floor`,
      isCompleted: false,
      options: [],
    };
    if (a?.NC_FlooringCarpet)
      item.options.push({ label: "Carpet", isCompleted: false });
    if (a?.NC_FlooringHardwood)
      item.options.push({ label: "Hardwood", isCompleted: false });
    if (a?.NC_FlooringLinoleum)
      item.options.push({ label: "Linoleum", isCompleted: false });
    if (a?.NC_FlooringMarble)
      item.options.push({ label: "Marble", isCompleted: false });
    if (a?.NC_FlooringSlate)
      item.options.push({ label: "Slate", isCompleted: false });
    if (a?.NC_FlooringTile)
      item.options.push({ label: "Tile", isCompleted: false });
    items.push(item);
    // if (a?.NC_DoDishes) text.push(`Do Dishes`);
    // if (a?.NC_ChangeBed) text.push(`Change Bed Lines`);
    // if (a?.NC_RequestEcoCleaners) text.push("Eco Cleaners Requested");
    console.log(items, "items");
    setGeneralItems(items);
  };

  const getDeepItems = (a) => {
    const items = [];
    if (!isNaN(parseInt(a?.DC_BlindsAmount))) {
      const item = {
        label: `Blinds (${a?.DC_BlindsAmount})`,
        isCompleted: false,
      };
      items.push(item);
    }
    if (!isNaN(parseInt(a?.DC_WindowsAmount))) {
      const item = {
        label: `Windows (${a?.DC_WindowsAmount})`,
        isCompleted: false,
      };
      items.push(item);
    }
    if (a?.DC_Walls)
      items.push({ label: `Walls (${a?.DC_WallsDetail})`, isCompleted: false });
    if (a?.DC_CeilingFans)
      items.push({
        label: `Ceiling Fans (${a?.DC_CeilingFansAmount})`,
        isCompleted: false,
      });
    if (a?.DC_Baseboards)
      items.push({ label: "Baseboards", isCompleted: false });

    if (a?.DC_DoorFrames)
      items.push({ label: "Door Frames", isCompleted: false });
    if (a?.DC_LightFixtures)
      items.push({ label: "Light Fixtures", isCompleted: false });
    if (a?.DC_LightSwitches)
      items.push({ label: "Light Switches", isCompleted: false });
    if (a?.DC_VentCovers)
      items.push({ label: "Vent Covers", isCompleted: false });
    if (a?.DC_InsideVents)
      items.push({ label: "Inside Vents", isCompleted: false });
    if (a?.DC_Pantry) items.push({ label: "Clean Pantry", isCompleted: false });
    if (a?.DC_LaundryRoom)
      items.push({ label: "Clean Laundry Room", isCompleted: false });
    if (a?.DC_KitchenCuboards)
      items.push({
        label: `Kitchen Cupboards (${a?.DC_KitchenCuboardsDetail})`,
        isCompleted: false,
      });
    if (a?.DC_BathroomCuboards)
      items.push({
        label: `Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`,
        isCompleted: false,
      });
    if (a?.DC_Oven) items.push({ label: "Oven", isCompleted: false });
    if (a?.DC_Refrigerator)
      items.push({ label: "Refrigerator", isCompleted: false });
    setDeepItems(items);
  };

  const isDeepItemsCompleted = () => {
    return (
      deepItems?.filter((i) => i?.isCompleted)?.length === deepItems?.length
    );
  };

  const isGeneralItemsCompleted = () => {
    return (
      generalItems?.filter((i) => i?.isCompleted)?.length ===
      generalItems?.length
    );
  };

  const onUpload = (e) => {
    e.preventDefault();
    const items = [...images];
    const data = [...files];
    Object.values(e.target.files)?.map((f) => {
      items.push(window.URL.createObjectURL(f));
      data.push(f);
    });
    setImages(items);
    setFiles(data);
  };

  const onUploadFiles = async () => {
    document.getElementById("upload-files").click();
  };

  const onRemove = (e, i) => {
    e.stopPropagation();
    const items = [...images];
    const data = [...files];
    items.splice(i, 1);
    data.splice(i, 1);
    setImages(items);
    setFiles(data);
  };

  const onSave = async () => {
    if (!isGeneralItemsCompleted() || !isDeepItemsCompleted()) {
      actions.alert.showError({
        message: "Please complete all the required options before go ahead",
      });
      return false;
    }
    if (!notes) {
      actions.alert.showError({ message: "Please input the notes" });
      return false;
    }
    if (files?.length === 0) {
      actions.alert.showError({ message: "Please upload images" });
      return false;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("files", files);
      formData.append("notes", notes);
      const res = await axios.post(
        Settings.api_url + "schedule/UpdateAppointment/" + params?.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res?.data?.Message) {
        actions.alert.showSuccess({ message: res?.data?.Message });
        setCompleted(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container max-w-3xl">
        <div className="bg-white p-4 mt-5 rounded-xl">
          <div className="status flex items-center justify-between">
            <p>
              <button onClick={handleBack}>
                <KeyboardBackspaceIcon
                  sx={{
                    fontSize: "40px",
                    cursor: "pointer",
                    padding: "5px",
                    marginLeft: "0px",
                    marginTop: "15px",
                    borderRadius: "50%",
                    color: "#fda839",
                  }}
                />
              </button>
            </p>
            <p
              className={`${
                completed ? "text-green-600" : "text-red-600"
              } text-end font-medium text-lg`}
            >
              {completed ? "Completed" : "Not Completed"}
            </p>
          </div>
          <div className="Brad_allen_section mt-8">
            <div className="flex justify-between ">
              <p className="font-semibold text-lg">
                {appointment?.CustomerName}
              </p>
              <p className="space-x-2">
                <AddIcCallIcon sx={{ color: "#478e00" }}></AddIcCallIcon>{" "}
                <InsertCommentIcon
                  sx={{ color: "#6fc1e9" }}
                ></InsertCommentIcon>{" "}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 justify-between mt-5 march_date">
              <div>
                <p className="text-grey-500 font-semibold space-x-2">
                  <TodayIcon sx={{ color: "grey" }}></TodayIcon>
                  <span>
                    {moment(appointment?.ScheduleDate).format("MMM D")}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-grey-500 font-semibold space-x-2 items-center flex">
                  <WatchLaterIcon sx={{ color: "#fda839" }}></WatchLaterIcon>{" "}
                  <span>
                    {appointment?.startTime} to {appointment?.endTime}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center justify-center mt-10">
                <div
                  className={`flex items-center justify-center w-40 h-40 rounded-full relative ${getSvgClassName()}`}
                >
                  <div>
                    <svg width="200" height="200">
                      <circle
                        ref={circleRef}
                        className="circle"
                        cx="100"
                        cy="100"
                        r="80"
                      />
                    </svg>
                  </div>
                  <span
                    className={
                      seconds === 0
                        ? "text-2xl font-medium text-white"
                        : "text-2xl font-medium timer"
                    }
                  >
                    {formatTime(seconds)}
                  </span>
                </div>
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={handlePause}
                    className={`px-10 py-2 rounded-lg font-semibold ${
                      !isActive
                        ? "bg-gray-300 text-gray-500"
                        : "bg-transparent border-2 text-black"
                    }`}
                    disabled={!isActive}
                  >
                    Pause
                  </button>
                  <button
                    onClick={handleStart}
                    className={`px-10 py-2 rounded-lg font-semibold ${
                      !isActive
                        ? "bg-transparent border-2 text-black"
                        : "bg-gray-300 text-gray-500"
                    }`}
                    disabled={isActive}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 mt-5 rounded-xl mx-auto">
          <div className=" lg:w-full mx-auto mt-8">
            {step === 1 ? (
              <div className="flex items-start justify-between md:block mb-20">
                <div className="w-full ">
                  <div className="flex justify-between items-center mt-10">
                    <h4 className="font-medium sm:text-sm text-lg">
                      {selected?.label}
                    </h4>
                    <h4
                      className={
                        ("font-medium  sm:text-sm text-lg",
                        selected?.isCompleted
                          ? "text-green-600"
                          : "text-red-600")
                      }
                    >
                      {selected?.isCompleted ? "Completed" : "Not Completed"}
                    </h4>
                  </div>
                  {selected?.options?.map((o) => (
                    <ul
                      key={o?.label}
                      className="list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between"
                    >
                      <li className="text-grey-500 font-semibold sm:text-sm">
                        {o?.label}
                      </li>
                      <input
                        className="checkbox_class w-[17px] h-[17px] leading-tight text-red-600"
                        type="checkbox"
                        id="vehicle2"
                        name="vehicle1"
                        checked={o?.isCompleted}
                        onChange={(e) =>
                          handleChecked(e?.target?.checked, selected, o)
                        }
                      />
                    </ul>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h4 className="text-lg font-medium  ">Details: </h4>
                  <p className="text-grey-500 font-semibold  mt-4">
                    {appointment?.Details}
                  </p>
                </div>

                <div className="flex flex-col justify-between  items-start md:block">
                  <div className="flex justify-between w-full items-center mt-10">
                    <div className="font-medium text-start text-lg sm:text-sm">
                      General clean items
                    </div>
                    <h4
                      className={
                        (" font-semibold  text-lg",
                        isGeneralItemsCompleted()
                          ? "text-green-600"
                          : "text-red-600")
                      }
                    >
                      {isGeneralItemsCompleted()
                        ? "Completed"
                        : "Not Completed"}
                    </h4>
                  </div>
                  <div className="space-y-2 w-full mt-4">
                    {generalItems?.map((i) => (
                      <div
                        key={i?.label}
                        className="flex justify-between items-center space-x-1"
                      >
                        <ul className="list-disc once_list bg-[#fafafa] p-4 rounded-xl flex flex-1">
                          <li className="text-grey-500 font-semibold">
                            {i?.label}
                          </li>
                        </ul>
                        <div className="bg-[#fafafa] p-4 inline-block rounded-xl">
                          <input
                            className="checkbox_class w-[17px] h-[17px]"
                            type="checkbox"
                            id="vehicle2"
                            name="vehicle1"
                            checked={i?.isCompleted}
                            onChange={(e) =>
                              handleChecked(e.target.checked, i, null, true)
                            }
                          />
                          <AddBoxIcon
                            sx={{
                              color: "#6fc1e9",
                              marginTop: "-10px",
                              marginLeft: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setStep(1);
                              setSelected(i);
                            }}
                          ></AddBoxIcon>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full ">
                    <div className="flex justify-between items-center mt-10">
                      <h4 className="font-medium sm:text-sm text-lg">
                        Deep clean items
                      </h4>
                      <h4
                        className={
                          (" font-semibold  text-lg",
                          isDeepItemsCompleted()
                            ? "text-green-600"
                            : "text-red-600")
                        }
                      >
                        {isDeepItemsCompleted() ? "Completed" : "Not Completed"}
                      </h4>
                    </div>

                    {deepItems?.map((di) => (
                      <ul
                        key={di?.label}
                        className="list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between"
                      >
                        <li className="text-grey-500 font-semibold sm:text-sm">
                          {di?.label}
                        </li>
                        <input
                          className="checkbox_class w-[17px] h-[17px] leading-tight text-red-600"
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle1"
                          checked={di?.isCompleted}
                          onChange={(e) => handleChecked(e.target.checked, di)}
                        />
                      </ul>
                    ))}
                    {/* <div>
                      <ul className="list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between">
                        <li className="text-grey-500 font-semibold sm:text-sm">
                          Bath Cupboards(Outside only){" "}
                        </li>
                        <input
                          className="checkbox_class w-[17px] h-[17px] leading-tight text-red-600"
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle1"
                          value="Bike"
                          onChange={handleChecked}
                        />
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between">
                        <li className="text-grey-500 font-semibold sm:text-sm">
                          Inside Oven{" "}
                        </li>
                        <input
                          className="checkbox_class w-[17px] h-[17px] leading-tight text-red-600"
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle1"
                          value="Bike"
                          onChange={handleChecked}
                        />
                      </ul>
                    </div>
                    <div>
                      <ul className="list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between">
                        <li className="text-grey-500 font-semibold sm:text-sm">
                          Fridge/Freezer{" "}
                        </li>
                        <input
                          className="checkbox_class w-[17px] h-[17px] leading-tight text-red-600"
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle1"
                          value="Bike"
                          onChange={handleChecked}
                        />
                      </ul>
                    </div> */}
                  </div>
                </div>

                <hr className="border-dashed mt-4" />

                <div className="container">
                  <div className="flex flex-col justify-between lg:block">
                    <div className="mt-12">
                      <h4 className="font-medium text-lg">Notes</h4>
                      <textarea
                        id="w3review"
                        name="w3review"
                        rows="4"
                        cols="50"
                        placeholder="Type here...."
                        className="custom_textarea w-full"
                        value={notes}
                        onChange={(e) => setNotes(e?.target?.value)}
                      ></textarea>
                    </div>

                    <div className="mt-12">
                      <h4 className="font-medium text-lg">Upload Pictures</h4>
                      <div
                        onClick={onUploadFiles}
                        className="cursor-pointer min-h-[100px] w-full gap-2 border-2 border-dashed mt-4 border-grey-500 rounded-2xl p-5 flex flex-wrap items-center justify-center"
                      >
                        {images?.map((img, i) => (
                          <div key={i} className="relative">
                            <img src={img} className="w-16 h-16 object-cover" />
                            <a
                              onClick={(e) => onRemove(e, i)}
                              className="absolute -right-1 -top-1 bg-gray-400 w-4 h-4 rounded-full z-10 flex justify-center items-center"
                            >
                              <Close style={{ fontSize: 10, color: "white" }} />
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-5 flex justify-center items-center">
                        <button
                          onClick={onSave}
                          className="bg-[#fda839] w-[150px] px-4 py-2 text-white flex justify-center items-center rounded-lg text-lg"
                        >
                          {!loading ? (
                            <span className="">Upload</span>
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
                  <div className="flex items-center justify-center  mt-10">
                    <button
                      onClick={() =>
                        completed ? navigate("/finish/" + params?.id) : {}
                      }
                      className={`border border-transparent text-white text-lg w-[20%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 ${
                        completed ? "bg-green-400" : "bg-gray-400"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id="upload-files"
          multiple="multiple"
          onChange={onUpload}
        />
      </div>
    </div>
  );
};

export default Startjob;
