import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import SendIcon from "@mui/icons-material/Send";
import TodayIcon from "@mui/icons-material/Today";
import { useEffect, useState } from "react";
import { useActions, useAppState } from "@/store";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

const Subpage = () => {
  const params = useParams();
  const state = useAppState();
  const actions = useActions();
  const [appointment, setAppointment] = useState({});
  const [show, setshow] = useState(false);
  const [check, setcheked] = useState(false);
  const [phones, setPhones] = useState([]);
  const [isShowPhone, setShowPhone] = useState(false);
  const [isShowSms, setShowSms] = useState(false);
  const [isOpenHour, setOpenHour] = useState(false);
  const [isOpenLocation, setOpenLocation] = useState(false);
  const [isOpenGeofence, setOpenGeofence] = useState(false);
  const [location, setLocation] = useState({});
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [loc, setLoc] = useState({});
  const [partners, setPartners] = useState([]);
  const GOOGLE_MAP_KEY = "AIzaSyDfEYZOxYfhwqXUK-yXDZP8vnbf_79lpuk";

  useEffect(() => {
    getAppointment();
  }, []);

  useEffect(() => {
    if (location && loc) {
      if (location?.latitude && location?.longitude && loc?.lat && loc?.lng) {
        const distance = haversineDistance(
          { latitude: loc?.lat, longitude: loc?.lng },
          location
        );
        console.log(distance, "distance");
        setIsValidLocation(distance <= 100);
      }
    }
  }, [location, loc]);

  const getAppointment = async () => {
    const res = await actions.appointment.getAppointmentById(params?.id);
    console.log(res, "res");
    getLocation(res);
    getPhones(res);
    setAppointment(res);
    getPosition(res);
    getPartners(res);
    return res;
  };

  const getPartners = async (appointment) => {
    if (appointment?.AppointmentId) {
      const users = [];
      appointment?.Partners?.map((p) => {
        const phones = [];
        if (p?.PhoneNumber) phones.push(p?.PhoneNumber);
        if (p?.AlternatePhone) phones.push(p?.AlternatePhone);
        users.push({
          name: `${p?.Firstname} ${p?.Lastname}`,
          phones,
          isShowPhone: false,
          isShowSms: false,
        });
      });
      setPartners(users);
    }
  };

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
    console.log(list, "list");
    setPhones(list);
  };
  const handleCheckboxChange = () => {
    setshow(!show);
  };
  const handelcheck = () => {
    setcheked(!check);
  };
  const getPosition = (job) => {
    try {
      if (navigator?.geolocation) {
        navigator?.geolocation?.getCurrentPosition(success, error, {
          enableHighAccuracy: true,
          timeout: 20000,
        });
      } else {
        console.log("Geolocation not supported");
        actions.alert.showError({ message: "Geolocation not supported" });
      }

      function success(position) {
        actions.alert.showError({ message: JSON.stringify(position) });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        actions.alert.showSuccess({
          message: `latitude:${latitude}, longitude:${longitude}`,
        });
        setLocation({ latitude, longitude });
        updateCoords({ latitude, longitude });
        getLocForContractor(job);
      }

      function error(error) {
        actions.alert.showError({ message: error });
        switch (error.code) {
          case error.PERMISSION_DENIED:
            actions.alert.showError({
              message: "User denied the request for Geolocation.",
            });
            break;
          case error.POSITION_UNAVAILABLE:
            actions.alert.showError({
              message: "Location information is unavailable.",
            });
            break;
          case error.TIMEOUT:
            actions.alert.showError({
              message: "The request to get user location timed out.",
            });
            break;
          case error.UNKNOWN_ERROR:
            actions.alert.showError({ message: "An unknown error occurred." });
            break;
        }
      }
    } catch (e) {
      console.log(e);
      actions.alert.showError({ message: e });
    }
  };

  const updateCoords = async (data) => {
    const res = await actions.appointment.updateCoordinate({
      id: params?.id,
      ...data,
    });
  };
  const navigate = useNavigate();

  const getBuildingInformation = (a) => {
    let text = [];
    if (a?.SquareFootage) {
      text.push(`SF(${a?.SquareFootage})`);
    }
    if (a?.PetsCount !== "None")
      text.push(`Pets${a?.PetsCount ? "(" + a?.PetsCount + ")" : ""}`);
    if (a?.CleanRating !== "N/A")
      text.push(
        `Clean Rating${a?.CleanRating ? "(" + a?.CleanRating + ")" : ""}`
      );
    if (a?.NC_Vacuum) text.push(`Take Vaccum`);
    text.push(a?.Bedrooms ? `Bedrooms(${a?.Bedrooms})` : `Bedrooms`);
    text.push(a?.Bathrooms ? `Bathrooms(${a?.Bathrooms})` : `Bathrooms`);
    const floors = [];
    if (a?.NC_FlooringCarpet) floors.push("Carpet");
    if (a?.NC_FlooringHardwood) floors.push("Hardwood");
    if (a?.NC_FlooringLinoleum) floors.push("Linoleum");
    if (a?.NC_FlooringMarble) floors.push("Marble");
    if (a?.NC_FlooringSlate) floors.push("Slate");
    if (a?.NC_FlooringTile) floors.push("Tile");
    text.push(
      floors?.length > 0 ? `Flooring(${floors.join(", ")})` : `Flooring`
    );
    if (a?.NC_DoDishes) text.push(`Do Dishes`);
    if (a?.NC_ChangeBed) text.push(`Change Bed Lines`);
    if (a?.NC_RequestEcoCleaners) text.push("Eco Cleaners Requested");

    return text.join(", ");
  };

  const getDeepItems = (a) => {
    const items = [];
    if (a?.DC_Blinds)
      items.push(`Blinds ${a?.DC_BlindsAmount} (${a?.DC_BlindsCondition})`);
    if (a?.DC_Windows) items.push(`Windows (${a?.DC_WindowsAmount})`);
    if (a?.DC_WindowsSills) items.push(`Tracks & Sills`);
    if (a?.DC_Walls) items.push(`Walls (${a?.DC_WallsDetail})`);
    if (a?.DC_CeilingFans)
      items.push(`Ceiling Fans(${a?.DC_CeilingFansAmount})`);
    if (a?.DC_Baseboards) items.push("Baseboards");
    if (a?.DC_DoorFrames) items.push("Doors/Door Frames");
    if (a?.DC_LightFixtures) items.push("Light Fixtures");
    if (a?.DC_LightSwitches) items.push("Light Switches");
    if (a?.DC_VentCovers) items.push("Vent Covers");
    if (a?.DC_InsideVents) items.push("Inside Vents");
    if (a?.DC_Pantry) items.push("Clean Pantry");
    if (a?.DC_LaundryRoom) items.push("Clean Laundry Room");
    if (a?.DC_KitchenCuboards)
      items.push(`Kitchen Cupboards (${a?.DC_KitchenCuboardsDetail})`);
    if (a?.DC_BathroomCuboards)
      items.push(`Bathroom Cupboards (${a?.DC_BathroomCuboardsDetail})`);
    if (a?.DC_Oven) items.push("Inside Oven");
    if (a?.DC_Refrigerator) items.push("Fridge/Freezer");
    return items;
  };

  const getLocation = (a) => {
    let text = [];
    if (a?.locationAddress) text.push(a?.locationAddress);
    if (a?.locationCity) text.push(a?.locationCity);
    if (a?.locationState) text.push(a?.locationState);
    if (a?.locationZip) text.push(a?.locationZip);
    return text.join(", ");
  };

  const onClickLocation = () => {
    window.open(
      `https://maps.apple.com?q=${getLocation(appointment)}`,
      "_blank"
    );
  };

  const getLocForContractor = async (job) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${getLocation(
      job
    )}&key=${GOOGLE_MAP_KEY}`;
    let res = await fetch(url);
    res = await res.json();
    const item = res?.results?.[0]?.geometry?.location;
    setLoc(item);
    return item;
  };

  function haversineDistance(coord1, coord2) {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371e3; // Earth radius in meters
    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);
    const deltaLat = toRad(coord2.latitude - coord1.latitude);
    const deltaLon = toRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  const onStart = async () => {
    if (
      moment(appointment.ScheduleDate).format("YYYY-MM-DD") !==
      moment().format("YYYY-MM-DD")
    ) {
      actions.alert.showError({
        message: "You are not allowed to start this job.",
      });
      return false;
    }
    let job = JSON.parse(localStorage.getItem("current_appointment"));
    if (!job?.AppointmentId) {
      localStorage.setItem("current_appointment", JSON.stringify(appointment));
      job = appointment;
    }
    if (job?.AppointmentId === parseInt(params?.id)) {
      if (!location?.latitude) {
        setOpenLocation(true);
        return false;
      }
      const distance = haversineDistance(
        { latitude: loc?.lat, longitude: loc?.lng },
        location
      );
      console.log(distance, "distance");

      if (distance >= 100) {
        setOpenGeofence(true);
        return false;
      }
      const startTime = new Date(
        moment(job?.ScheduleDate).format("YYYY-MM-DD") + " " + job?.startTime
      );
      var duration = moment.duration(moment(startTime).diff(new Date()));
      var minutes = duration.asMinutes();
      if (minutes < 10) {
        setOpenHour(true);
        return false;
      }
      navigate(`/Startjob/${params?.id}`);
    } else {
      actions.alert.showError({
        message: "Please complete previous job to start new job",
      });
    }
  };

  const handlePartners = (key, type) => {
    const items = [...partners];
    items[key][type === "phone" ? "isShowPhone" : "isShowSms"] =
      !items[key][type === "phone" ? "isShowPhone" : "isShowSms"];
    setPartners(items);
  };

  return (
    <div className="min-h-screen">
      {params.pathname == "/walk_through" ? null : <Header />}
      <div className="container max-w-3xl">
        <div className="bg-white p-4 mt-5 rounded-xl">
          <div>
            <div className="status">
              <p className="text-red-600 text-end  font-medium text-lg">
                Not Completed
              </p>
            </div>
            <div className="Brad_allen_section mt-8">
              <div className="flex justify-between">
                <p className=" font-semibold text-lg">
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
                      <div className="absolute right-0 w-40 mt-2 z-50 bg-white shadow-xl border divide-y">
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
                      <div className="absolute right-0 w-40 mt-2 bg-white shadow-xl border divide-y">
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
              <div className="flex flex-col items-start w-full mt-7">
                <div>
                  <p className="text-grey-500 space-x-2 flex items-center">
                    <TodayIcon sx={{ color: "grey" }}></TodayIcon>
                    <span>
                      {moment(appointment?.ScheduleDate).format("MMM D")}
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-grey-500 space-x-2 items-center flex">
                    <WatchLaterIcon sx={{ color: "#fda839" }}></WatchLaterIcon>
                    <span>
                      {appointment?.startTime} to {appointment?.endTime}
                    </span>
                  </p>
                </div>
                <div className="w-full mt-5">
                  <div className="flex items-center gap-5 justify-between w-full">
                    <p className="font-medium space-x-2">
                      <span className="text-lg">Address:</span>
                      <span className="text-grey-500 font-normal">
                        {getLocation(appointment)}
                      </span>
                    </p>
                    <SendIcon
                      sx={{
                        bgcolor: "#2ab2eb",
                        color: "#fff",
                        borderRadius: "100%",
                        width: "30px",
                        lineHeight: "30px",
                        height: "30px",
                        padding: "7px",
                      }}
                      className="cursor-pointer"
                      onClick={onClickLocation}
                    />
                  </div>
                </div>
                {/* partner */}
                <div className="w-full">
                  <div className="flex space-x-2 mt-5">
                    <p className="font-medium space-x-2">
                      <span className="text-lg">Partner(s):</span>
                    </p>
                    <div className="space-y-2 w-full">
                      {partners?.map((p, i) => (
                        <div
                          key={p?.name}
                          className="flex justify-between items-center w-full"
                        >
                          <span className="text-grey-500">{p.name}</span>
                          <p className="flex items-center space-x-3">
                            <div className="relative">
                              <a
                                onClick={(e) =>
                                  p?.phones?.length === 1
                                    ? window.open(
                                        `tel:${p.phones?.[0].replace(
                                          /[^0-9]/g,
                                          ""
                                        )}`,
                                        "_blank"
                                      )
                                    : handlePartners(i, "phone")
                                }
                                className="cursor-pointer"
                              >
                                <AddIcCallIcon sx={{ color: "#478e00" }} />
                              </a>
                              {p.isShowPhone ? (
                                <div className="absolute right-0 w-40 z-50 mt-2 bg-white shadow-xl border divide-y">
                                  {p.phones.map((phone, index) => (
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
                                onClick={(e) =>
                                  p?.phones?.length === 1
                                    ? window.open(
                                        `sms:${p.phones?.[0].replace(
                                          /[^0-9]/g,
                                          ""
                                        )}`,
                                        "_blank"
                                      )
                                    : handlePartners(i, "sms")
                                }
                                className="cursor-pointer"
                              >
                                <InsertCommentIcon
                                  sx={{ color: "#6fc1e9" }}
                                ></InsertCommentIcon>
                              </a>
                              {p.isShowSms ? (
                                <div className="absolute right-0 w-40 mt-2 z-50 bg-white shadow-xl border divide-y">
                                  {p.phones.map((phone, index) => (
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
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="space-x-2">
                    <span className="text-lg  font-medium">Approx.Pay:</span>
                    <span className="text-red-600">
                      $
                      {Math.round(
                        appointment.customerRate * appointment.Hours * 0.92 +
                          appointment.ContractorTips +
                          appointment.CustomerServiceFee
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-dashed mt-5" />
            {/* buildinginformation */}
            <div className="building mt-4 flex flex-col space-y-4 justify-between">
              <div className="space-y-1">
                <p className=" font-medium text-lg space-x-2">
                  <span>Building Information:</span>
                  {appointment?.Keys ? (
                    <span className="text-[#5e72f7]  font-medium">
                      (Take Keys)
                    </span>
                  ) : null}
                </p>
                <p className="text-grey-500 text-sm">
                  {getBuildingInformation(appointment)}
                </p>
              </div>
              <div className="space-y-1">
                <p className=" font-medium text-lg">Cleaning Types:</p>
                <p className="text-grey-500 text-sm">
                  {appointment?.NC_CleaningType}
                </p>
              </div>
              <div className="space-y-1">
                <p className=" font-medium text-lg">Deep Cleaning Items</p>
                <ol className="list-decimal px-4 text-grey-500 text-sm space-y-1">
                  {/* <li>Kitch Cupboards (Outsides Only)</li>
                  <li>Bath Cupboards (Outsides Only)</li>
                  <li>Oven</li>
                  <li>Refrigerator</li> */}
                  {getDeepItems(appointment)?.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ol>
              </div>
            </div>
            <hr className="border-dashed mt-5" />
            <div className="Details flex flex-col space-y-4 justify-between mt-4">
              <div className="space-y-1">
                <p className=" font-medium text-lg">Details:</p>
                <p className="text-grey-500 text-sm">
                  {/* SF(2000), Beds(2), Baths(2), Take Vaccum Pets(+3), Clean
                  Rating(5), Flooring(Carpet, Hardwood) */}
                  {appointment?.Details}
                </p>
              </div>
              <div className="space-y-1">
                <p className=" font-medium text-lg">Payment Type:</p>
                <p className="text-[#a1d6f1] text-sm">
                  <u>{appointment?.paymentType}</u>
                </p>
              </div>
              <div>
                <p className=" font-medium text-lg">
                  Before/After Pics Required:
                </p>
                <p className="text-[#a1d6f1] text-sm underline">
                  {appointment?.TakePic ? "Yes" : "No"}
                </p>
              </div>
            </div>
            {/* not complete */}
            {/* <hr className="border-dashed mt-5" />
            <div className="notcomplete flex justify-between mt-5 items-center">
              <div className="flex gap-5 Details">
                <p>
                  <AddIcCallIcon sx={{ color: "#478e00" }}></AddIcCallIcon>{" "}
                  <InsertCommentIcon
                    sx={{ color: "#6fc1e9" }}
                  ></InsertCommentIcon>{" "}
                </p>
                <p className="text-grey-500   ">
                  Call/Text Client or partner(s)
                </p>
              </div>
              <div>
                <div className="flex gap-5 Details complete_space items-center">
                  <p className=" font-medium text-red-600 text-lg ">
                    Not Complete
                  </p>
                  <p className="text-grey-500   ">Shows the job status</p>
                </div>
              </div>
              <div>
                <div className="flex gap-5 items-center Details complete_space">
                  <p>
                    <SendIcon
                      sx={{
                        bgcolor: "#2ab2eb",
                        color: "#fff",
                        borderRadius: "100%",
                        width: "35px",
                        lineHeight: "30px",
                        height: "35px",
                        padding: "7px",
                      }}
                    ></SendIcon>
                  </p>
                  <p className="text-grey-500   ">
                    Click to navigate to client
                  </p>
                </div>
              </div>
              <div>
                <div className="flex gap-5 Details complete_space">
                  <p className="text-red-600  font-medium text-lg">$60.70</p>
                  <p className="text-grey-500   ">
                    Approximate pay for the job
                  </p>
                </div>
              </div>
            </div> */}
            {/* takekeys */}
            {/* <hr className="border-dashed mt-5" />
            <div className="take_keys notcomplete flex justify-between mt-10">
              <div>
                <p className="text-[#5e72f7]  font-medium text-lg">
                  (Take Keys)
                </p>
                <p className="text-grey-500   ">
                  Be sure to see if you need keys
                </p>
              </div>
              <div>
                <p className=" font-medium complete_space text-lg">Details:</p>
                <p className="text-grey-500   ">
                  Cleaning details.{" "}
                  <span className="text-red-600">Read each time!</span>
                </p>
              </div>
              <div>
                <p className=" text-[#a1d6f1]  font-medium complete_space text-lg">
                  <u>Check (Collect $170)</u>
                </p>
                <p className="text-grey-500   ">
                  Collect payment if it is cash or check
                </p>
              </div>
              <div>
                <p className=" font-medium complete_space text-lg">
                  Before/After Pics Required:{" "}
                  <span className="text-[#a1d6f1]">
                    <u>Yes</u>
                  </span>
                </p>
                <p className="text-grey-500   ">
                  Tells you if before/After pictures are required of each area.
                </p>
              </div>
            </div> */}
          </div>
          <hr className="border-dashed mt-5" />

          <div className="flex flex-col sm:block md:block text-grey-500    mt-5">
            <div className="flex items-center justify-between gap-4 mt-4 bg-[#fafafa] p-6 sm:gap-0 sm:p-4 rounded-xl">
              <p>All needed supplies have been brought into the property</p>{" "}
              <input
                className="checkbox_class w-[17px] h-[17px] flex flex-shrink-0 border-red-500 border-0"
                type="checkbox"
                id="vehicle2"
                name="vehicle1"
                value="Bike"
                checked={show}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="flex items-center justify-between gap-4 mt-4 bg-[#fafafa] p-6 sm:gap-0 sm:p-4 rounded-xl">
              <p>All details have been read</p>
              <input
                className="checkbox_class checkbox_border flex flex-shrink-0 w-[17px] h-[17px]"
                type="checkbox"
                id="vehicle2"
                name="vehicle1"
                value="Bike"
                checked={check}
                onChange={handelcheck}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => onStart()}
              type="submit"
              style={
                show && check && isValidLocation
                  ? { background: "green" }
                  : { background: "grey" }
              }
              className="border border-transparent text-white text-lg sm:w-full w-64 py-2 rounded-lg transition-all delay-150 whitespace-nowrap "
              disabled={show && check ? false : true}
            >
              Start Job
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpenHour}
        onClose={() => setOpenHour(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you have authorization to start the job early?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenHour(false);
              navigate(`/Startjob/${params?.id}`);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setOpenHour(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpenLocation}
        onClose={() => setOpenLocation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Location Sharing is not turned on. Turn on now to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenLocation(false);
              getPosition(appointment);
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpenGeofence}
        onClose={() => setOpenGeofence(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It appears you are not at the address yet. Are you sure you wish to
            start the job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenGeofence(false);
              const job = JSON.parse(
                localStorage.getItem("current_appointment")
              );
              const startTime = new Date(
                moment(job?.ScheduleDate).format("YYYY-MM-DD") +
                  " " +
                  job?.startTime
              );
              var duration = moment.duration(
                moment(startTime).diff(new Date())
              );
              var minutes = duration.asMinutes();
              if (minutes < 10) {
                setOpenHour(true);
                return false;
              }
              navigate(`/Startjob/${params?.id}`);
            }}
          >
            Continue
          </Button>
          <Button onClick={() => setOpenGeofence(false)} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Subpage;
