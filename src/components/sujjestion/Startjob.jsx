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
import Button from "@mui/material/Button";
import "./Style.css";
import warning from "../../assets/warning.mp3";

let times = 0;
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
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [phones, setPhones] = useState([]);
  const [isShowPhone, setShowPhone] = useState(false);
  const [isShowSms, setShowSms] = useState(false);
  const circleRef = useRef(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const ref = useRef();

  useEffect(() => {
    times = 0;
  }, []);

  useEffect(() => {
    if (step === 1) {
      document.getElementById("subview").scrollIntoView({ behavior: "smooth" });
    }
  }, [step]);

  useEffect(() => {
    if (state.contractor?.contractorID && times === 0) {
      onInitialize(times);
      times++;
    }
  }, [state.contractor]);

  const onInitialize = async () => {
    for (let i = 0; i < 100000000; i++) {
      getAppointment(i === 0);
      await sleep(5000);
    }
  };

  useEffect(() => {
    if (generalItems?.length > 0 && selected) {
      setSelected([...generalItems]?.find((i) => i?.label === selected?.label));
    }
  }, [generalItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("Clicked outside!");
        // Add your logic here (e.g., close dropdown)
        setShowPhone(false);
        setShowSms(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    onSaveNote();
  }, [notes]);

  const sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

  useEffect(() => {
    try {
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
      }
      // if (
      //   appointment?.AppointmentId &&
      //   !appointment?.JobCompleted &&
      //   timesForSeconds === 0
      // ) {
      //   updateDuration();
      // }
      // if (timesForSeconds === 4) {
      //   timesForSeconds = 0;
      // } else {
      //   timesForSeconds++;
      // }
    } catch (e) {
      console.log(e);
      actions.alert.showError({ message: e });
    }
  }, [seconds]);

  const getPhones = async (appointment) => {
    const list = [];
    if (appointment?.bestPhone?.length > 0) {
      list.push(appointment?.bestPhone);
    }
    if (appointment?.alternatePhoneOne?.length > 0) {
      list.push(appointment?.alternatePhoneOne);
    }
    if (appointment?.alternatePhoneTwo?.length > 0) {
      list.push(appointment?.alternatePhoneTwo);
    }
    setPhones(list);
  };

  const playAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const getAppointment = async (initialized) => {
    if (initialized) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const res = await actions.appointment.getAppointmentById(params?.id);
    console.log(res, "appointment");

    const generalItems = getGeneralItems(res);
    const deepItems = getDeepItems(res);
    const { deep, general } = await getJobLogs();
    if (generalItems?.length > 0 || deepItems?.length > 0) {
      const items = [...generalItems];
      items.map((i) =>
        i.options?.map((o) => {
          if (
            general.find(
              (g) =>
                g?.Checked &&
                g?.Content === i?.label &&
                g?.SubContent === o?.label
            ) ||
            deep.find(
              (g) =>
                g?.Checked &&
                g?.Content === i?.label &&
                g?.SubContent === o?.label
            )
          ) {
            o.isCompleted = true;
          }
        })
      );
      items.map((item) => {
        if (res?.NC_CleaningType === "General Clean") {
          item.isCompleted =
            item.options.filter((o) => o?.isCompleted)?.length ===
            item?.options?.filter((o) => !o?.deep).length;
        } else {
          item.isCompleted =
            item.options.filter((o) => o?.isCompleted)?.length ===
            item?.options?.length;
        }
      });
      const items1 = [...deepItems];
      items1.map((i) => {
        if (
          deep.find(
            (g) => g?.Checked && g?.Content === i?.label && !g?.SubContent
          ) ||
          general.find(
            (g) => g?.Checked && g?.Content === i?.label && !g?.SubContent
          )
        ) {
          i.isCompleted = true;
        }
      });
      setAppointment(res);
      setGeneralItems(items);
      setDeepItems(items1);
    }
    if (initialized) {
      const res1 = await actions.appointment.getNotesAndPhotos(params?.id);
      if (res1?.Notes) setNotes(res1?.Notes);
      if (res1?.attachments?.length > 0) {
        const images = [];
        res1?.attachments?.map((a) =>
          images.push({ id: a?.id, path: Settings.folder_path + a?.ImageURL })
        );
        setImages(images);
      }
    }

    if (res?.AppointmentId) {
      if (initialized) {
        getDuration(res);
      } else {
        getPhones(res);
      }
    }
  };

  const getJobLogs = async () => {
    if (state.currentUser) {
      const res = await actions.appointment.getJobLogs({
        AppointmentId: params?.id,
        contractorID: state.currentUser?.contractorID,
      });
      return {
        deep: res?.filter((r) => !r?.isGeneral),
        general: res?.filter((r) => r?.isGeneral),
      };
    }
  };

  const getDuration = async (appointment) => {
    var ms = moment(appointment?.endTime, "hh:mm A").diff(
      moment(appointment?.startTime, "hh:mm A")
    );
    var d = moment.duration(ms);
    if (!appointment?.jobStartTime) {
      setSeconds(d?.asSeconds());
    } else if (appointment?.jobStartTime && !appointment?.pauseTime) {
      var mms = moment().diff(moment(appointment?.jobStartTime), "seconds");
      setSeconds(d?.asSeconds() - mms);
    } else if (appointment?.jobStartTime && appointment?.Duration > 0) {
      if (
        appointment?.Duration &&
        appointment?.pauseTime &&
        !appointment?.lastStartTime
      ) {
        setSeconds(d?.asSeconds() - appointment?.Duration);
      } else if (
        appointment?.Duration &&
        appointment?.pauseTime &&
        appointment?.lastStartTime &&
        appointment?.lastStartTime > appointment?.pauseTime
      ) {
        const mmms = moment().diff(
          moment(appointment?.lastStartTime),
          "seconds"
        );
        setSeconds(d?.asSeconds() - appointment?.Duration - mmms);
      } else if (
        appointment?.Duration &&
        appointment?.pauseTime &&
        appointment?.lastStartTime &&
        appointment?.lastStartTime <= appointment?.pauseTime
      ) {
        setSeconds(d?.asSeconds() - appointment?.Duration);
      }
    }
    if (
      appointment?.pauseTime &&
      (!appointment?.lastStartTime ||
        appointment?.lastStartTime < appointment?.pauseTime)
    ) {
      const res = await actions.appointment.updateJobDetail({
        id: params?.id,
        duration: appointment?.Duration,
        lastStartTime: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
        ),
      });
      console.log(res, "res");
    }
    if (!appointment?.JobCompleted) {
      setIsActive(true);
    }
    const res = await actions.appointment.getAppointmentById(params?.id);
    setAppointment(res);
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
  const handlePause = async () => {
    setIsActive(false);
    setElapsedTime((seconds - startTime) / 1000);
    updateDuration();
  };

  const updateDuration = async () => {
    var ms = moment(appointment?.endTime, "hh:mm A").diff(
      moment(appointment?.startTime, "hh:mm A")
    );
    var d = moment.duration(ms);

    await actions.appointment.updateJobDetail({
      id: params?.id,
      duration: d.asSeconds() - seconds,
      pauseTime: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
      ),
    });
  };

  // const getStarted = async () => {
  //   const res = await actions.appointment.startJob(params?.id);
  //   if (res) {
  //     actions.alert.showSuccess({ message: "Job started successfully!" });
  //   }
  // };

  // Handle reset button click
  const handleStart = async () => {
    setIsActive(true);
    var ms = moment(appointment?.endTime, "hh:mm A").diff(
      moment(appointment?.startTime, "hh:mm A")
    );
    var d = moment.duration(ms);
    setStartTime(seconds); // adjust start time based on elapsed time
    setElapsedTime(0);

    await actions.appointment.updateJobDetail({
      id: params?.id,
      duration: d.asSeconds() - seconds,
      lastStartTime: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
      ),
    });
    const res = await actions.appointment.getAppointmentById(params?.id);
    setAppointment(res);
  };

  // Handle checkbox toggle
  const handleChecked = async (checked, parent, child, isGeneral) => {
    if (appointment?.JobCompleted) return false;
    actions.appointment.updateJobLog({
      contractorId: state.currentUser?.contractorID,
      customerId: appointment?.CustomerId,
      appointmentId: appointment?.AppointmentId,
      content: parent?.label,
      SubContent: child?.label || "",
      checked,
      checkedBy: state.currentUser?.username,
      isGeneral,
      createdAtStr: moment().format("YYYY-MM-DDThh:mm A"),
    });
    if (child) {
      const items = [...generalItems];
      items
        .find((i) => i.label === parent.label)
        .options.find((o) => o.label === child.label).isCompleted = checked;
      items.map((i) => {
        if (appointment?.NC_CleaningType === "General Clean") {
          i.isCompleted =
            i?.options?.filter((o) => o?.isCompleted)?.length ===
            i?.options?.filter((i) => !i?.deep).length;
        } else {
          i.isCompleted =
            i?.options?.filter((o) => o?.isCompleted)?.length ===
            i?.options?.length;
        }
      });
      // setGeneralItems(items);
      if (!isGeneral && child) {
        const list = [...deepItems];
        list.map((l) => {
          if (l?.label?.includes("Blinds")) {
            l.isCompleted =
              items.filter((i) =>
                i?.options?.find((o) => o?.label === "Blinds")
              )?.length > 0 &&
              items.filter((i) =>
                i?.options?.find((o) => o?.label === "Blinds")
              )?.length ===
                items?.filter((i) =>
                  i?.options?.find(
                    (o) => o?.label === "Blinds" && o?.isCompleted
                  )
                )?.length;
          } else if (l?.label?.includes("Windows")) {
            l.isCompleted =
              items.filter((i) =>
                i?.options?.find((o) => o?.label === "Windows")
              )?.length > 0 &&
              items.filter((i) =>
                i?.options?.find((o) => o?.label === "Windows")
              )?.length ===
                items?.filter((i) =>
                  i?.options?.find(
                    (o) => o?.label === "Windows" && o?.isCompleted
                  )
                )?.length;
          } else if (l?.label?.includes("Walls")) {
            l.isCompleted =
              items.filter((i) =>
                i?.options?.find((o) => o?.label?.includes("Walls ("))
              )?.length > 0 &&
              items.filter((i) =>
                i?.options?.find((o) => o?.label?.includes("Walls ("))
              )?.length ===
                items?.filter((i) =>
                  i?.options?.find(
                    (o) => o?.label?.includes("Walls (") && o?.isCompleted
                  )
                )?.length;
          } else if (l?.label?.includes("Fridge/Freezer")) {
            l.isCompleted =
              items.filter((i) =>
                i?.options?.find((o) => o?.label?.includes("Fridge/Freezer"))
              )?.length > 0 &&
              items.filter((i) =>
                i?.options?.find((o) => o?.label?.includes("Fridge/Freezer"))
              )?.length ===
                items?.filter((i) =>
                  i?.options?.find(
                    (o) =>
                      o?.label?.includes("Fridge/Freezer") && o?.isCompleted
                  )
                )?.length;
          } else if (l?.label?.includes("Ceiling Fans")) {
            l.isCompleted =
              items.filter((i) =>
                i?.options?.find((o) => o?.label?.includes("Ceiling Fans"))
              )?.length > 0 &&
              items.filter((i) =>
                i?.options?.find((o) => o?.label?.includes("Ceiling Fans"))
              )?.length ===
                items?.filter((i) =>
                  i?.options?.find(
                    (o) => o?.label?.includes("Ceiling Fans") && o?.isCompleted
                  )
                )?.length;
          } else if (l?.label !== "Organize" && !l?.name) {
            l.isCompleted =
              items.filter((i) =>
                i?.options?.find((o) => o?.label === l?.label)
              )?.length > 0 &&
              items.filter((i) =>
                i?.options?.find((o) => o?.label === l?.label)
              )?.length ===
                items?.filter((i) =>
                  i?.options?.find(
                    (o) => o?.label === l?.label && o?.isCompleted
                  )
                )?.length;
          }
          if (l?.isCompleted) {
            actions.appointment.updateJobLog({
              contractorId: state.currentUser?.contractorID,
              customerId: appointment?.CustomerId,
              appointmentId: appointment?.AppointmentId,
              content: l?.label,
              SubContent: "",
              checked: l?.isCompleted,
              checkedBy: state.currentUser?.username,
              isGeneral: false,
              createdAtStr: moment().format("YYYY-MM-DDThh:mm A"),
            });
          }
        });
        setDeepItems(list);
      }
    } else {
      const items = isGeneral ? [...generalItems] : [...deepItems];
      items.find((i) => i.label === parent.label).isCompleted = checked;
      items
        .find((i) => i.label === parent.label)
        ?.options?.map((o) => (o.isCompleted = checked));
      // if (isGeneral) {
      //   setGeneralItems(items);
      // } else {
      //   setDeepItems(items);
      // }
    }
  };

  // Format time as HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
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
    let items = [];
    if (!isNaN(parseInt(a?.Bedrooms))) {
      for (let i = 0; i < parseInt(a?.Bedrooms); i++) {
        let options = [];
        if (a?.TakePic) {
          options.push({
            label: "Take Before/After Pictures",
            isCompleted: false,
          });
        }
        options = [
          ...options,
          {
            label: "Dust all furniture (no screens)",
            isCompleted: false,
          },
          {
            label: "Vacuum carpet/shake rugs outside",
            isCompleted: false,
          },
          {
            label: "Sweep/vacuum any hard flooring",
            isCompleted: false,
          },
          {
            label: "Mop any hard flooring",
            isCompleted: false,
          },
          {
            label: "Remove all cobwebs",
            isCompleted: false,
          },
          {
            label: "Dust picture frames carefully",
            isCompleted: false,
          },
          {
            label: "Dust window sills/ledges",
            isCompleted: false,
          },
          {
            label: "Dust louvered doors, if needed",
            isCompleted: false,
          },
          {
            label: "Dust lampshades, if needed",
            isCompleted: false,
          },
          {
            label: "Make bed(s), if present",
            isCompleted: false,
          },
          {
            label: "Empty garbage and replace liner",
            isCompleted: false,
          },
        ];
        if (a?.DC_Blinds)
          options.push({ label: `Blinds`, isCompleted: false, deep: true });
        if (a?.DC_Windows)
          options.push({ label: `Windows`, isCompleted: false, deep: true });
        if (a?.DC_WindowsSills)
          options.push({
            label: `Tracks & Sills`,
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_Walls)
          options.push({
            label: `Walls (${a?.DC_WallsDetail})`,
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_CeilingFans)
          options.push({
            label: `Ceiling Fans`,
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_Baseboards)
          options.push({ label: "Baseboards", isCompleted: false, deep: true });
        if (a?.DC_DoorFrames)
          options.push({
            label: "Doors/door Frames",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_LightFixtures)
          options.push({
            label: "Light Fixtures",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_LightSwitches)
          options.push({
            label: "Light Switches",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_VentCovers)
          options.push({
            label: "Vent Covers",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_InsideVents)
          options.push({
            label: "Inside Vents",
            isCompleted: false,
            deep: true,
          });
        if (a?.NC_ChangeBed)
          options.push({ label: `Change Bed Linens`, isCompleted: false });
        // if (a?.DC_Pantry)
        //   items.push({ label: "Clean Pantry", isCompleted: false });
        // if (a?.DC_LaundryRoom)
        //   items.push({ label: "Clean Laundry Room", isCompleted: false });
        items.push({
          label: i === 0 ? "Master Bedroom" : `Bedroom ${i + 1}`,
          isCompleted: false,
          options,
        });
      }
    }

    if (!isNaN(parseInt(a?.Bathrooms))) {
      for (let i = 0; i < parseInt(a?.Bathrooms); i++) {
        let options = [];
        if (a?.TakePic) {
          options.push({
            label: "Take Before/After Pictures",
            isCompleted: false,
          });
        }
        options = [
          ...options,
          {
            label: "General dusting",
            isCompleted: false,
          },
          {
            label: "Tile Walls/Bathtubs/Showers cleaned",
            isCompleted: false,
          },
          {
            label: "Mirrors/Chrome fixtures Shined",
            isCompleted: false,
          },
          {
            label: "Floors washed and disinfected",
            isCompleted: false,
          },
          {
            label: "Carpets vacuumed",
            isCompleted: false,
          },

          {
            label: "Shake rugs outside",
            isCompleted: false,
          },
          {
            label: "Toilet cleaned/disinfected inside/out",
            isCompleted: false,
          },
          {
            label: "Empty garbage and replace liner",
            isCompleted: false,
          },
          {
            label: "Tidy towels",
            isCompleted: false,
          },
          {
            label: "Clean window sills",
            isCompleted: false,
          },
          {
            label: "Clean baseboards",
            isCompleted: false,
          },
        ];
        if (a?.DC_Blinds)
          options.push({ label: `Blinds`, isCompleted: false, deep: true });
        if (a?.DC_Windows)
          options.push({ label: `Windows`, isCompleted: false, deep: true });
        if (a?.DC_WindowsSills)
          options.push({
            label: `Tracks & Sills`,
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_Walls)
          options.push({
            label: `Walls (${a?.DC_WallsDetail})`,
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_Baseboards)
          options.push({ label: "Baseboards", isCompleted: false, deep: true });
        if (a?.DC_DoorFrames)
          options.push({
            label: "Doors/door Frames",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_LightFixtures)
          options.push({
            label: "Light Fixtures",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_LightSwitches)
          options.push({
            label: "Light Switches",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_VentCovers)
          options.push({
            label: "Vent Covers",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_InsideVents)
          options.push({
            label: "Inside Vents",
            isCompleted: false,
            deep: true,
          });
        if (a?.DC_BathroomCuboards)
          options.push({
            label: `Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`,
            isCompleted: false,
            deep: true,
          });
        // if (a?.DC_Pantry)
        //   items.push({ label: "Clean Pantry", isCompleted: false });
        // if (a?.DC_LaundryRoom)
        //   items.push({ label: "Clean Laundry Room", isCompleted: false });
        items.push({
          label: i === 0 ? "Master Bathroom" : `Bathroom ${i + 1}`,
          isCompleted: false,
          options,
        });
      }
    }

    // Kitchen
    let options = [];
    if (a?.TakePic) {
      options.push({
        label: "Take Before/After Pictures",
        isCompleted: false,
      });
    }
    options = [
      ...options,
      {
        label: "General dusting and remove cobwebs",
        isCompleted: false,
      },
      {
        label: "Damp wipe countertops & cloth dry",
        isCompleted: false,
      },
      {
        label: "Clean outsides of range hood",
        isCompleted: false,
      },
      {
        label: "Clean top/front of range and fridge",
        isCompleted: false,
      },
      {
        label: "Clean top/front of all appliances",
        isCompleted: false,
      },
      {
        label: "Wipe out Microwave",
        isCompleted: false,
      },
      // {
      //   label: "Do any dishes or place in dishwasher",
      //   isCompleted: false,
      // },
      {
        label: "Clean/disinfect sink",
        isCompleted: false,
      },
      {
        label: "Dry/polish fixtures",
        isCompleted: false,
      },
      {
        label: "Empty garbage and replace liner",
        isCompleted: false,
      },
      {
        label: "Sweep/vacuum any hard flooring",
        isCompleted: false,
      },
      {
        label: "Mop any hard flooring",
        isCompleted: false,
      },
    ];
    if (a?.DC_Blinds)
      options.push({ label: `Blinds`, isCompleted: false, deep: true });
    if (a?.DC_Windows)
      options.push({ label: `Windows`, isCompleted: false, deep: true });
    if (a?.DC_WindowsSills)
      options.push({ label: `Tracks & Sills`, isCompleted: false, deep: true });
    if (a?.DC_Walls)
      options.push({
        label: `Walls (${a?.DC_WallsDetail})`,
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_Baseboards)
      options.push({ label: "Baseboards", isCompleted: false, deep: true });
    if (a?.DC_DoorFrames)
      options.push({
        label: "Doors/door Frames",
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_LightFixtures)
      options.push({ label: "Light Fixtures", isCompleted: false, deep: true });
    if (a?.DC_LightSwitches)
      options.push({ label: "Light Switches", isCompleted: false, deep: true });
    if (a?.DC_VentCovers)
      options.push({ label: "Vent Covers", isCompleted: false, deep: true });
    if (a?.DC_InsideVents)
      options.push({ label: "Inside Vents", isCompleted: false, deep: true });
    // if (a?.DC_BathroomCuboards)
    //   options.push({
    //     label: `Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`,
    //     isCompleted: false,
    //     deep: true,
    //   });
    if (a?.DC_KitchenCuboards)
      options.push({
        label: `Kitchen Cupboards (${a?.DC_KitchenCuboardsDetail})`,
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_Pantry)
      options.push({ label: "Clean Pantry", isCompleted: false, deep: true });
    if (a?.DC_Oven)
      options.push({ label: "Inside Oven", isCompleted: false, deep: true });
    if (a?.DC_Refrigerator)
      options.push({
        label: "Inside Fridge/Freezer",
        isCompleted: false,
        deep: true,
      });
    if (a?.NC_DoDishes)
      options.push({ label: "Do Dishes", isCompleted: false });

    const kitchen = {
      label: `Kitchen`,
      isCompleted: false,
      options,
    };
    items.push(kitchen);

    // Other rooms/areas
    let options1 = [];
    if (a?.TakePic) {
      options1.push({
        label: "Take Before/After Pictures",
        isCompleted: false,
      });
    }
    options1 = [
      ...options1,
      {
        label: "Dust all furniture (no screens)",
        isCompleted: false,
      },
      {
        label: "Vacuum carpet/shake rugs outside",
        isCompleted: false,
      },
      {
        label: "Sweep/vacuum any hard flooring",
        isCompleted: false,
      },
      {
        label: "Mop any hard flooring",
        isCompleted: false,
      },
      {
        label: "Remove all cobwebs",
        isCompleted: false,
      },
      {
        label: "Dust picture frames carefully",
        isCompleted: false,
      },
      {
        label: "Dust window sills/ledges",
        isCompleted: false,
      },
      {
        label: "Dust louvered doors, if needed",
        isCompleted: false,
      },
      {
        label: "Dust lampshades, if needed",
        isCompleted: false,
      },
      {
        label: "Make bed(s), if present",
        isCompleted: false,
      },
      {
        label: "Empty garbage and replace liner",
        isCompleted: false,
      },
    ];
    if (a?.DC_Blinds)
      options1.push({ label: `Blinds`, isCompleted: false, deep: true });
    if (a?.DC_Windows)
      options1.push({ label: `Windows`, isCompleted: false, deep: true });
    if (a?.DC_WindowsSills)
      options1.push({
        label: `Tracks & Sills`,
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_Walls)
      options1.push({
        label: `Walls (${a?.DC_WallsDetail})`,
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_CeilingFans)
      options1.push({ label: `Ceiling Fans`, isCompleted: false, deep: true });
    if (a?.DC_Baseboards)
      options1.push({ label: "Baseboards", isCompleted: false, deep: true });
    if (a?.DC_DoorFrames)
      options1.push({
        label: "Doors/door Frames",
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_LightFixtures)
      options1.push({
        label: "Light Fixtures",
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_LightSwitches)
      options1.push({
        label: "Light Switches",
        isCompleted: false,
        deep: true,
      });
    if (a?.DC_VentCovers)
      options1.push({ label: "Vent Covers", isCompleted: false, deep: true });
    if (a?.DC_InsideVents)
      options1.push({ label: "Inside Vents", isCompleted: false, deep: true });
    // if (a?.DC_BathroomCuboards)
    //   options1.push({
    //     label: `Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`,
    //     isCompleted: false,
    //     deep: true,
    //   });
    // if (a?.DC_KitchenCuboards)
    //   options1.push({
    //     label: `Kitchen Cupboards (${a?.DC_KitchenCuboardsDetail})`,
    //     isCompleted: false,
    //     deep: true,
    //   });
    // if (a?.DC_Pantry)
    //   options1.push({ label: "Clean Pantry", isCompleted: false, deep: true });
    // if (a?.DC_Oven)
    //   options1.push({ label: "Inside Oven", isCompleted: false, deep: true });
    // if (a?.DC_Refrigerator)
    //   options1.push({
    //     label: "Inside Fridge/Freezer",
    //     isCompleted: false,
    //     deep: true,
    //   });
    if (a?.DC_LaundryRoom)
      options1.push({
        label: "Clean Laundry Room",
        isCompleted: false,
        deep: true,
      });

    const otherRoom = {
      label: `Other Rooms/Areas`,
      isCompleted: false,
      options: options1,
    };
    items.push(otherRoom);
    if (items.find((i) => i?.label === "Master Bathroom")) {
      const element = items.splice(
        items.findIndex((i) => i?.label === "Master Bathroom"),
        1
      )[0];
      items.splice(0, 0, element);
    }
    return items;
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
      items.push({ label: "Doors/door Frames", isCompleted: false });
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
    if (a?.DC_OtherOne)
      items.push({
        label: a?.DC_OtherOne,
        name: "Other 1",
        isCompleted: false,
      });
    if (a?.DC_OtherTwo)
      items.push({
        label: a?.DC_OtherTwo,
        name: "Other 2",
        isCompleted: false,
      });
    return items;
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
    Object.values(e.target.files)?.map((f) => {
      items.push({ id: null, path: window.URL.createObjectURL(f), file: f });
    });
    setImages(items);
  };

  const onUploadFiles = async () => {
    document.getElementById("upload-files").click();
  };

  const onRemove = async (e, i) => {
    e.stopPropagation();
    const items = [...images];
    const item = items[i];
    items.splice(i, 1);
    setImages(items);
    if (item?.id) {
      await actions.appointment.deleteImage(item?.id);
    }
  };

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  const onSaveNote = async () => {
    if (
      moment(appointment.ScheduleDate).format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD") &&
      !appointment?.JobCompleted
    ) {
      const formData = new FormData();
      if (!appointment?.JobCompleted) {
        formData.append("notes", notes);
      }
      await axios.post(
        Settings.api_url + "schedule/UpdateAppointment/" + params?.id,
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }
  };

  const onSave = async () => {
    if (
      moment(appointment.ScheduleDate).format("YYYY-MM-DD") !==
      moment().format("YYYY-MM-DD")
    ) {
      actions.alert.showError({
        message: "You are not allowed to upload pictures in this contract.",
      });
      return false;
    }
    if (appointment?.TakePic && images?.length === 0) {
      actions.alert.showError({ message: "Please upload images" });
      return false;
    }
    try {
      setLoading(true);
      const items = images.filter((i) => i?.file);
      const chunkedArray = chunkArray(items, 3);
      let res = null;
      for (let i = 0; i < chunkedArray?.length; i++) {
        const formData = new FormData();
        chunkedArray[i].map((f) => formData.append("files", f?.file));
        // if (!appointment?.JobCompleted) {
        //   formData.append("notes", notes);
        // }
        res = await axios.post(
          Settings.api_url + "schedule/UpdateAppointment/" + params?.id,
          formData,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
      }

      const res1 = await actions.appointment.getNotesAndPhotos(params?.id);
      if (res1?.Notes) setNotes(res1?.Notes);
      if (res1?.attachments?.length > 0) {
        const images = [];
        res1?.attachments?.map((a) =>
          images.push({ id: a?.id, path: Settings.folder_path + a?.ImageURL })
        );
        setImages(images);
      }
      if (res?.data?.Message) {
        actions.alert.showSuccess({ message: res?.data?.Message });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (appointment?.jobStartTime) {
      return "Continue";
    } else {
      return "Start";
    }
  };

  const onNext = async () => {
    if (
      moment(appointment.ScheduleDate).format("YYYY-MM-DD") !==
      moment().format("YYYY-MM-DD")
    ) {
      actions.alert.showError({
        message: "You are not allowed to go ahead in this contract.",
      });
      return false;
    }
    if (
      !(
        isGeneralItemsCompleted() &&
        (appointment?.NC_CleaningType !== "General Clean"
          ? isDeepItemsCompleted()
          : true)
      )
    ) {
      setOpen(true);
      return false;
    }
    var ms = moment(appointment?.endTime, "hh:mm A").diff(
      moment(appointment?.startTime, "hh:mm A")
    );
    var d = moment.duration(ms);
    await actions.appointment.updateJobDetail({
      id: params?.id,
      duration: d.asSeconds() - seconds,
      pauseTime: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
      ),
    });
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
                (appointment?.NC_CleaningType !== "General Clean"
                  ? isDeepItemsCompleted()
                  : true) && isGeneralItemsCompleted()
                  ? "text-green-600"
                  : "text-red-600"
              } text-end font-medium text-lg`}
            >
              {appointment.JobCompleted ||
              ((appointment?.NC_CleaningType !== "General Clean"
                ? isDeepItemsCompleted()
                : true) &&
                isGeneralItemsCompleted())
                ? "Completed"
                : "Not Completed"}
            </p>
          </div>
          <div className="Brad_allen_section mt-8">
            <div className="flex justify-between ">
              <p className="font-semibold text-lg">
                {appointment?.CustomerName}
              </p>
              <div className="space-x-3 flex items-center">
                <div className="relative">
                  <a
                    onClick={(e) => {
                      setShowPhone(!isShowPhone);
                    }}
                    className="cursor-pointer"
                  >
                    <AddIcCallIcon sx={{ color: "#478e00" }}></AddIcCallIcon>
                  </a>
                  {isShowPhone ? (
                    <div
                      ref={ref}
                      className="absolute right-0 w-40 mt-2 bg-white shadow-xl border divide-y"
                    >
                      {phones.map((phone, index) => (
                        <a
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `tel:${phone.replace(/[^0-9]/g, "")}`,
                              "_blank"
                            );
                            setShowPhone(false);
                          }}
                          className="flex items-center px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
                        >
                          <p className="text-sm">{phone}</p>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="relative">
                  <a
                    onClick={(e) => {
                      setShowSms(!isShowSms);
                    }}
                    className="cursor-pointer"
                  >
                    <InsertCommentIcon
                      sx={{ color: "#6fc1e9" }}
                    ></InsertCommentIcon>
                  </a>
                  {isShowSms ? (
                    <div
                      ref={ref}
                      className="absolute right-0 w-40 mt-2 bg-white shadow-xl border divide-y"
                    >
                      {phones.map((phone, index) => (
                        <a
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(
                              `sms:${phone.replace(/[^0-9]/g, "")}`,
                              "_blank"
                            );
                            setShowSms(false);
                          }}
                          className="flex items-center px-2 py-1.5 hover:bg-gray-100 cursor-pointer"
                        >
                          <p className="text-sm">{phone}</p>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
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
                {!appointment?.JobCompleted && (
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
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="subview" className="bg-white p-3 mt-5 rounded-xl mx-auto">
          <div className=" lg:w-full mx-auto mt-8">
            {step === 1 ? (
              <div className="flex items-start justify-between md:block mb-20">
                <div className="w-full ">
                  <button onClick={() => setStep(0)}>
                    <KeyboardBackspaceIcon
                      sx={{
                        fontSize: "30px",
                        cursor: "pointer",
                        color: "#fda839",
                      }}
                    />
                  </button>
                  <div className="flex justify-between items-center mt-4">
                    <h4 className="font-medium sm:text-sm text-lg">
                      {selected?.label}
                    </h4>
                    <h4
                      className={
                        ("font-medium  sm:text-sm text-lg",
                        selected?.options?.filter((o) => !o?.deep)?.length ===
                        selected?.options?.filter(
                          (o) => !o?.deep && o?.isCompleted
                        )?.length
                          ? "text-green-600"
                          : "text-red-600")
                      }
                    >
                      {selected?.options?.filter((o) => !o?.deep)?.length ===
                      selected?.options?.filter(
                        (o) => !o?.deep && o?.isCompleted
                      )?.length
                        ? "Completed"
                        : "Not Completed"}
                    </h4>
                  </div>
                  {selected?.options
                    ?.filter((o) => !o?.deep)
                    ?.map((o) => (
                      <ul
                        key={o?.label}
                        className="list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between"
                      >
                        <li className="text-grey-500 font-semibold sm:text-sm">
                          {o?.label}
                        </li>
                        <input
                          className="checkbox_class w-[17px] h-[17px] leading-tight text-red-600 flex flex-shrink-0"
                          type="checkbox"
                          id="vehicle2"
                          name="vehicle1"
                          checked={o?.isCompleted}
                          onChange={(e) =>
                            handleChecked(e?.target?.checked, selected, o, true)
                          }
                        />
                      </ul>
                    ))}
                  {selected?.options?.filter((o) => o?.deep)?.length > 0 &&
                    appointment?.NC_CleaningType !== "General Clean" && (
                      <div>
                        <div className="flex justify-between items-center mt-4">
                          <h4 className="font-medium sm:text-sm text-lg">
                            Deep Clean Items
                          </h4>
                          <h4
                            className={
                              ("font-medium  sm:text-sm text-lg",
                              selected?.options?.filter(
                                (o) => o?.deep && o?.isCompleted
                              )?.length ===
                              selected?.options?.filter((o) => o?.deep)?.length
                                ? "text-green-600"
                                : "text-red-600")
                            }
                          >
                            {selected?.options?.filter(
                              (o) => o?.deep && o?.isCompleted
                            )?.length ===
                            selected?.options?.filter((o) => o?.deep)?.length
                              ? "Completed"
                              : "Not Completed"}
                          </h4>
                        </div>
                        {selected?.options
                          ?.filter((o) => o?.deep)
                          ?.map((o) => (
                            <ul
                              key={o?.label}
                              className="list-disc once_list mt-2 bg-[#fafafa] p-4 rounded-xl flex items-center justify-between"
                            >
                              <li className="text-grey-500 font-semibold sm:text-sm">
                                {o?.label}
                              </li>
                              <input
                                className="checkbox_class  w-[17px] h-[17px] leading-tight text-red-600 flex flex-shrink-0"
                                type="checkbox"
                                id="vehicle2"
                                name="vehicle1"
                                checked={o?.isCompleted}
                                onChange={(e) =>
                                  handleChecked(
                                    e?.target?.checked,
                                    selected,
                                    o,
                                    false
                                  )
                                }
                              />
                            </ul>
                          ))}
                      </div>
                    )}
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
                      General Clean Items
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
                        <div className="bg-[#fafafa] p-4 flex items-center rounded-xl">
                          <input
                            className="checkbox_class flex flex-shrink-0 w-[17px] h-[17px]"
                            type="checkbox"
                            id="vehicle2"
                            name="vehicle1"
                            checked={i?.isCompleted}
                            readOnly
                            // onChange={(e) =>
                            //   handleChecked(e.target.checked, i, null, true)
                            // }
                          />
                          <AddBoxIcon
                            sx={{
                              color: "#6fc1e9",
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
                  {deepItems?.length > 0 &&
                  appointment?.NC_CleaningType !== "General Clean" ? (
                    <div className="w-full ">
                      <div className="flex justify-between items-center mt-10">
                        <h4 className="font-medium sm:text-sm text-lg">
                          Deep Clean Items
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
                            className="checkbox_class flex flex-shrink-0 w-[17px] h-[17px] leading-tight text-red-600"
                            type="checkbox"
                            id="vehicle2"
                            name="vehicle1"
                            checked={di?.isCompleted}
                            onChange={(e) =>
                              di?.label !== "Organize" &&
                              di?.name !== "Other 1" &&
                              di?.name !== "Other 2"
                                ? {}
                                : handleChecked(
                                    e.target.checked,
                                    di,
                                    null,
                                    false
                                  )
                            }
                            readOnly={
                              di?.label !== "Organize" &&
                              di?.name !== "Other 1" &&
                              di?.name !== "Other 2"
                            }
                          />
                        </ul>
                      ))}
                    </div>
                  ) : null}
                </div>

                <hr className="border-dashed mt-4" />

                <div>
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
                        disabled={appointment?.JobCompleted}
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
                            <img
                              src={img?.path}
                              className="w-16 h-16 object-cover"
                            />
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
                    {!appointment?.JobCompleted && (
                      <button
                        onClick={() => onNext()}
                        // disabled={appointment.TakePic && images?.length === 0}
                        className={`border border-transparent text-white text-lg w-[20%] lg:w-[70%] font-semibold px-12 py-2 rounded-lg transition-all delay-150 ${
                          (appointment?.NC_CleaningType !== "General Clean"
                            ? isDeepItemsCompleted()
                            : true) && isGeneralItemsCompleted()
                            ? "bg-green-400"
                            : "bg-gray-400"
                        }`}
                      >
                        Next
                      </button>
                    )}
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
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All of the cleaning items are not completed. Are you sure you want
              to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={async () => {
                setOpen(false);
                var ms = moment(appointment?.endTime, "hh:mm A").diff(
                  moment(appointment?.startTime, "hh:mm A")
                );
                var d = moment.duration(ms);
                await actions.appointment.updateJobDetail({
                  id: params?.id,
                  duration: d.asSeconds() - seconds,
                  pauseTime: new Date(
                    new Date().getTime() -
                      new Date().getTimezoneOffset() * 60 * 1000
                  ),
                });
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
