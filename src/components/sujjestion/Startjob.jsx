import { useNavigate, useParams } from "react-router-dom";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import "./Style.css";
import warning from "../../assets/warning.mp3";

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
  const [isOpen, setOpen] = useState(false);
  const circleRef = useRef(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    getAppointment();
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      if (
        seconds === 600 ||
        seconds === 540 ||
        seconds === 480 ||
        seconds === 420 ||
        seconds === 360 ||
        seconds === 300 ||
        seconds === 240 ||
        seconds === 180 ||
        seconds === 120 ||
        seconds === 60 ||
        seconds === 0
      ) {
        playAudio();
      }
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

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem(`checked-items-${params?.id}`)) || [];
    if (data) {
      if (generalItems?.length > 0 || deepItems?.length > 0) {
        localStorage.setItem(
          `checked-items-${params?.id}`,
          JSON.stringify({ generalItems, deepItems })
        );
      }
    } else {
      if (generalItems?.length > 0 || deepItems?.length > 0) {
        localStorage.setItem(
          `checked-items-${params?.id}`,
          JSON.stringify({ generalItems, deepItems })
        );
      }
    }
  }, [generalItems, deepItems]);

  const playAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const getAppointment = async () => {
    const res = await actions.appointment.getAppointmentById(params?.id);
    console.log(res, "res");
    setAppointment(res);
    const data =
      JSON.parse(localStorage.getItem(`checked-items-${params?.id}`)) || {};
    if (data?.generalItems?.length > 0 || data?.deepItems?.length > 0) {
      setGeneralItems(data.generalItems);
      setDeepItems(data.deepItems);
    } else {
      getGeneralItems(res);
      getDeepItems(res);
    }
    getJobLogs();
  };

  const getJobLogs = async () => {
    console.log(state.currentUser, "state.currentUser");
    if (state.currentUser) {
      const res = await actions.appointment.getJobLogs({
        AppointmentId: params?.id,
        contractorID: state.currentUser?.contractorID,
        isGeneral: false,
      });
      console.log(res, "res");
    }
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
  const handleChecked = async (checked, parent, child, isGeneral) => {
    if (child) {
      const items = [...generalItems];
      items
        .find((i) => i.label === parent.label)
        .options.find((o) => o.label === child.label).isCompleted = checked;
      items.map(
        (i) =>
          (i.isCompleted =
            i?.options?.filter((o) => o?.isCompleted)?.length ===
            i?.options?.length)
      );
      setGeneralItems(items);
    } else {
      const items = isGeneral ? [...generalItems] : [...deepItems];
      items.find((i) => i.label === parent.label).isCompleted = checked;
      items
        .find((i) => i.label === parent.label)
        ?.options?.map((o) => (o.isCompleted = checked));
      if (isGeneral) {
        setGeneralItems(items);
      } else {
        setDeepItems(items);
      }
      await actions.appointment.updateJobLog({
        contractorId: state.currentUser?.contractorID,
        customerId: appointment?.CustomerId,
        appointmentId: appointment?.AppointmentId,
        content: parent?.label,
        checked,
        checkedBy: state.currentUser?.username,
        isGeneral,
      });
    }
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
      for (let i = 0; i < parseInt(a?.Bedrooms); i++) {
        const options = [];
        if (a?.TakePic) {
          options.push({
            label: "Take Before/After Pictures",
            isCompleted: false,
          });
        }
        if (a?.DC_Blinds) options.push({ label: `Blinds`, isCompleted: false });
        if (a?.DC_Windows)
          options.push({ label: `Windows`, isCompleted: false });
        if (a?.DC_WindowsSills)
          options.push({ label: `Tracks & Sills`, isCompleted: false });
        if (a?.DC_Walls) options.push({ label: `Walls`, isCompleted: false });
        if (a?.DC_CeilingFans)
          options.push({ label: `Ceiling Fans`, isCompleted: false });
        if (a?.DC_Baseboards)
          options.push({ label: "Baseboards", isCompleted: false });
        if (a?.DC_DoorFrames)
          options.push({ label: "Doors/Door Frames", isCompleted: false });
        if (a?.DC_LightFixtures)
          options.push({ label: "Light Fixtures", isCompleted: false });
        if (a?.DC_LightSwitches)
          options.push({ label: "Light Switches", isCompleted: false });
        if (a?.DC_VentCovers)
          options.push({ label: "Vent Covers", isCompleted: false });
        if (a?.DC_InsideVents)
          options.push({ label: "Inside Vents", isCompleted: false });
        if (a?.NC_ChangeBed)
          options.push({ label: `Change Bed Lines`, isCompleted: false });
        // if (a?.DC_Pantry)
        //   items.push({ label: "Clean Pantry", isCompleted: false });
        // if (a?.DC_LaundryRoom)
        //   items.push({ label: "Clean Laundry Room", isCompleted: false });
        items.push({
          label: i === 0 ? "Master Bedroom" : `Bedroom ${i}`,
          isCompleted: false,
          options,
        });
      }
    }

    if (!isNaN(parseInt(a?.Bathrooms))) {
      for (let i = 0; i < parseInt(a?.Bathrooms); i++) {
        const options = [];
        if (a?.TakePic) {
          options.push({
            label: "Take Before/After Pictures",
            isCompleted: false,
          });
        }
        if (a?.DC_Blinds) options.push({ label: `Blinds`, isCompleted: false });
        if (a?.DC_Windows)
          options.push({ label: `Windows`, isCompleted: false });
        if (a?.DC_WindowsSills)
          options.push({ label: `Tracks & Sills`, isCompleted: false });
        if (a?.DC_Walls) options.push({ label: `Walls`, isCompleted: false });
        if (a?.DC_Baseboards)
          options.push({ label: "Baseboards", isCompleted: false });
        if (a?.DC_DoorFrames)
          options.push({ label: "Doors/Door Frames", isCompleted: false });
        if (a?.DC_LightFixtures)
          options.push({ label: "Light Fixtures", isCompleted: false });
        if (a?.DC_LightSwitches)
          options.push({ label: "Light Switches", isCompleted: false });
        if (a?.DC_VentCovers)
          options.push({ label: "Vent Covers", isCompleted: false });
        if (a?.DC_InsideVents)
          options.push({ label: "Inside Vents", isCompleted: false });
        if (a?.DC_BathroomCuboards)
          options.push({
            label: `Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`,
            isCompleted: false,
          });
        // if (a?.DC_Pantry)
        //   items.push({ label: "Clean Pantry", isCompleted: false });
        // if (a?.DC_LaundryRoom)
        //   items.push({ label: "Clean Laundry Room", isCompleted: false });
        items.push({
          label: i === 0 ? "Master Bashroom" : `Bashroom ${i}`,
          isCompleted: false,
          options,
        });
      }
    }

    // Kitchen
    const options = [];
    if (a?.TakePic) {
      options.push({
        label: "Take Before/After Pictures",
        isCompleted: false,
      });
    }
    if (a?.DC_Blinds) options.push({ label: `Blinds`, isCompleted: false });
    if (a?.DC_Windows) options.push({ label: `Windows`, isCompleted: false });
    if (a?.DC_WindowsSills)
      options.push({ label: `Tracks & Sills`, isCompleted: false });
    if (a?.DC_Walls) options.push({ label: `Walls`, isCompleted: false });
    if (a?.DC_Baseboards)
      options.push({ label: "Baseboards", isCompleted: false });
    if (a?.DC_DoorFrames)
      options.push({ label: "Doors/Door Frames", isCompleted: false });
    if (a?.DC_LightFixtures)
      options.push({ label: "Light Fixtures", isCompleted: false });
    if (a?.DC_LightSwitches)
      options.push({ label: "Light Switches", isCompleted: false });
    if (a?.DC_VentCovers)
      options.push({ label: "Vent Covers", isCompleted: false });
    if (a?.DC_InsideVents)
      options.push({ label: "Inside Vents", isCompleted: false });
    if (a?.DC_BathroomCuboards)
      options.push({
        label: `Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`,
        isCompleted: false,
      });
    if (a?.DC_KitchenCuboards)
      options.push({
        label: `Kitchen Cupboards (${a?.DC_KitchenCuboardsDetail})`,
        isCompleted: false,
      });
    if (a?.DC_Pantry)
      options.push({ label: "Clean Pantry", isCompleted: false });
    if (a?.DC_Oven) options.push({ label: "Inside Oven", isCompleted: false });
    if (a?.DC_Refrigerator)
      options.push({ label: "Inside Fridge/Freezer", isCompleted: false });
    if (a?.NC_DoDishes)
      options.push({ label: "Do Dishes", isCompleted: false });

    const kitchen = {
      label: `Kitchen`,
      isCompleted: false,
      options,
    };
    items.push(kitchen);

    // Other rooms/areas
    const options1 = [];
    if (a?.TakePic) {
      options.push({
        label: "Take Before/After Pictures",
        isCompleted: false,
      });
    }
    if (a?.DC_Blinds) options1.push({ label: `Blinds`, isCompleted: false });
    if (a?.DC_Windows) options1.push({ label: `Windows`, isCompleted: false });
    if (a?.DC_WindowsSills)
      options1.push({ label: `Tracks & Sills`, isCompleted: false });
    if (a?.DC_Walls) options1.push({ label: `Walls`, isCompleted: false });
    if (a?.DC_CeilingFans)
      options1.push({ label: `Ceiling Fans`, isCompleted: false });
    if (a?.DC_Baseboards)
      options1.push({ label: "Baseboards", isCompleted: false });
    if (a?.DC_DoorFrames)
      options1.push({ label: "Doors/Door Frames", isCompleted: false });
    if (a?.DC_LightFixtures)
      options1.push({ label: "Light Fixtures", isCompleted: false });
    if (a?.DC_LightSwitches)
      options1.push({ label: "Light Switches", isCompleted: false });
    if (a?.DC_VentCovers)
      options1.push({ label: "Vent Covers", isCompleted: false });
    if (a?.DC_InsideVents)
      options1.push({ label: "Inside Vents", isCompleted: false });
    if (a?.DC_BathroomCuboards)
      options1.push({
        label: `Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`,
        isCompleted: false,
      });
    if (a?.DC_KitchenCuboards)
      options1.push({
        label: `Kitchen Cupboards (${a?.DC_KitchenCuboardsDetail})`,
        isCompleted: false,
      });
    if (a?.DC_Pantry)
      options1.push({ label: "Clean Pantry", isCompleted: false });
    if (a?.DC_Oven) options1.push({ label: "Inside Oven", isCompleted: false });
    if (a?.DC_Refrigerator)
      options1.push({ label: "Inside Fridge/Freezer", isCompleted: false });
    if (a?.DC_LaundryRoom)
      options1.push({ label: "Clean Laundry Room", isCompleted: false });

    const otherRoom = {
      label: `Othre Rooms/Areas`,
      isCompleted: false,
      options: options1,
    };
    items.push(otherRoom);

    // const item = {
    //   label: `Floor`,
    //   isCompleted: false,
    //   options: [],
    // };
    // if (a?.NC_FlooringCarpet)
    //   item.options.push({ label: "Carpet", isCompleted: false });
    // if (a?.NC_FlooringHardwood)
    //   item.options.push({ label: "Hardwood", isCompleted: false });
    // if (a?.NC_FlooringLinoleum)
    //   item.options.push({ label: "Linoleum", isCompleted: false });
    // if (a?.NC_FlooringMarble)
    //   item.options.push({ label: "Marble", isCompleted: false });
    // if (a?.NC_FlooringSlate)
    //   item.options.push({ label: "Slate", isCompleted: false });
    // if (a?.NC_FlooringTile)
    //   item.options.push({ label: "Tile", isCompleted: false });
    // items.push(item);

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
    if (a?.DC_WindowsSills)
      items.push({ label: `Tracks & Sills`, isCompleted: false });
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
      items.push({ label: "Doors/Door Frames", isCompleted: false });
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
    if (a?.DC_Oven) items.push({ label: "Inside Oven", isCompleted: false });
    if (a?.DC_Refrigerator)
      items.push({ label: "Fridge/Freezer", isCompleted: false });
    if (a?.NC_Organize) items.push({ label: "Organize", isCompleted: false });
    if (a?.DC_OtherOne) items.push({ label: "Other 1", isCompleted: false });
    if (a?.DC_OtherTwo) items.push({ label: "Other 2", isCompleted: false });
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
    // if (!notes) {
    //   actions.alert.showError({ message: "Please input the notes" });
    //   return false;
    // }
    if (a?.TakePic && files?.length === 0) {
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
        // setCompleted(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    const timers = JSON.parse(localStorage.getItem("2localgals-timers")) || [];
    const timer = timers?.find((t) => t.appointmentId === params?.id);
    var ms = moment(appointment?.endTime, "hh:mm A").diff(
      moment(appointment?.startTime, "hh:mm A")
    );
    var d = moment.duration(ms);
    if (timer?.time && timer?.time !== d?.asSeconds()) {
      return "Continue";
    } else {
      return "Start";
    }
  };

  const onNext = () => {
    if (!isGeneralItemsCompleted() || !isDeepItemsCompleted()) {
      setOpen(true);
      return false;
    }
    navigate("/finish/" + params?.id);
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
                <AddIcCallIcon sx={{ color: "#478e00" }} />
                <InsertCommentIcon sx={{ color: "#6fc1e9" }} />
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
                    {getButtonText()}
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
                      Before/After Pics Required:
                    </div>
                  </div>
                  <p className="text-[#a1d6f1] text-lg underline">
                    {appointment?.TakePic ? "Yes" : "No"}
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
                  {deepItems?.length > 0 ? (
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
                          {isDeepItemsCompleted()
                            ? "Completed"
                            : "Not Completed"}
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
                            onChange={(e) =>
                              handleChecked(e.target.checked, di)
                            }
                          />
                        </ul>
                      ))}
                    </div>
                  ) : null}
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
                      onClick={() => onNext()}
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
          <audio ref={audioRef} controls className="hidden">
            <source src={warning} type="audio/mpeg" />
          </audio>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id="upload-files"
          multiple="multiple"
          onChange={onUpload}
        />
        <Dialog
          open={isOpen}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All of the cleaning items are not completed. Are you sure you want
              to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                navigate("/finish/" + params?.id);
              }}
            >
              Continue
            </Button>
            <Button onClick={() => setOpen(false)} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Startjob;
