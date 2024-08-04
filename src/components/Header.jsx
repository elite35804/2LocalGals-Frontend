import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Link, useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import profile_img from "../assets/profile-2.png";
import HomeIcon from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import { useActions, useAppState } from "@/store";

const Header = () => {
  const state = useAppState();
  const actions = useActions();
  const params = useLocation();
  return (
    <div className="border-b border-dashed border-white  py-3">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link
            to={"/home"}
            className="sm:w-10 w-16 sm:h-10 h-16 rounded-full bg-white flex justify-center items-center"
          >
            {state.contractor?.ContractorPic ? (
              <img
                className="sm:w-10 w-16 object-cover sm:h-10 h-16 rounded-full"
                src={state.contractor?.ContractorPic}
                alt="profile img"
              />
            ) : (
              <Person style={{ fontSize: "45px", color: "gray" }} />
            )}
          </Link>
          <Popover>
            {params.pathname != "/home" ? (
              <Link to={"/home"}>
                {" "}
                <HomeIcon
                  sx={{
                    fontSize: "40px",
                    cursor: "pointer",
                    bgcolor: "#cbe9f7",
                    padding: "5px",
                    borderRadius: "50%",
                    color: "#fda839",
                  }}
                />
              </Link>
            ) : (
              <PopoverTrigger asChild>
                <SettingsIcon
                  sx={{
                    fontSize: "40px",
                    cursor: "pointer",
                    bgcolor: "#cbe9f7",
                    padding: "5px",
                    borderRadius: "50%",
                    color: "#fda839",
                  }}
                />
              </PopoverTrigger>
            )}
            <PopoverContent className="w-[100%] box-shadow">
              <div>
                <h2 className="font-bold text-base">Setting</h2>
                <Link
                  to={"/update_unavailability"}
                  className="shadow p-3 mt-3  flex items-center gap-1 rounded-2xl cursor-pointer"
                >
                  <CalendarMonthIcon sx={{ fontSize: "18px" }} />
                  <h1 className="font-medium text-sm heading ">
                    Update Unavailability
                  </h1>
                </Link>
                <Link
                  to={"/update_profile_picture"}
                  className="shadow p-3 mt-3 flex items-center gap-1 rounded-2xl cursor-pointer"
                >
                  <PersonIcon sx={{ fontSize: "18px" }} />
                  <h1 className="font-medium text-sm heading ">
                    Update Profile Picture
                  </h1>
                </Link>
                <Link
                  to={"/update_address"}
                  className="shadow p-3 mt-3 flex items-center gap-1 rounded-2xl cursor-pointer"
                >
                  <AddLocationIcon sx={{ fontSize: "18px" }} />
                  <h1 className="font-medium text-sm heading ">
                    Update Address
                  </h1>
                </Link>
                <Link
                  to={"/walk_through"}
                  className="shadow p-3 mt-3 flex items-center gap-1 rounded-2xl cursor-pointer"
                >
                  <DirectionsWalkIcon sx={{ fontSize: "18px" }} />
                  <h1 className="font-medium text-sm heading ">
                    Update View App Walkthrough
                  </h1>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
