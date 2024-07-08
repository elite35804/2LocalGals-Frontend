import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Logo from "../../assets/logo.png";

import { useAppState, useActions, useEffects, useReaction } from "@/store";

const Login = (props) => {
  const [open, setOpen] = React.useState(false);
  const state = useAppState();
  const actions = useActions();
  const reaction = useReaction();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  //   console.log(state, actions, "props");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      actions.alert.showError({ message: "Please input email or username" });
      return false;
    }
    if (!password) {
      actions.alert.showError({ message: "Please input password" });
      return false;
    }
    setLoading(true);
    try {
      const data = await actions.login({
        Username: username,
        Password: password,
      });
      console.log(data, "data");
      if (data?.Token) {
        actions.alert.showSuccess({
          message: "Logged in successfully!",
        });
        const res = localStorage.getItem("walk_through_checked");
        console.log(res, "res");
        if (res === "true") {
          navigate("/home");
        } else {
          navigate("/walk_through");
        }
      }
    } catch (e) {
      console.log(e);
      actions.alert.showError({ message: "Login failed. Please try again" });
    } finally {
      setLoading(false);
    }
    // handleOpen();
  };
  return (
    <div className="login_page h-screen">
      <div className="2xl:max-w-[350px] w-full max-w-[330px] mx-auto h-full justify-center flex flex-col gap-2 px-2">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              className="rounded-full border-2 w-28 h-28"
              src={Logo}
              alt=""
            />
          </div>
          <h2 className="font-bold text-white text-2xl heading mt-3">
            Welcome
          </h2>
        </div>
        <h2 className="font-bold text-white text-base heading mt-8">
          Log In to your account
        </h2>
        {/* <h4 className="2xl:text-base font-semibold text-xs">Welcome back!</h4>
                <p className="text-[12px] 2xl:text-base text-input-placeholder">Please enter your Unique password to sign in</p> */}
        <form className="flex flex-col mt-2" onSubmit={onSubmit}>
          <div className="2xl:p-4 focus:border bg-white border-input-placeholder focus:border-[#000E2F70] flex items-center gap-x-2 rounded-xl px-4 py-3 relative mt-2">
            <EmailIcon sx={{ fontSize: "15px", color: "#747474" }} />
            <input
              placeholder="Email"
              className="w-full bg-transparent outline-none text-md text-input-placeholder"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="2xl:p-4 bg-white border-input-placeholder items-center flex gap-x-2 rounded-xl px-4 py-3 relative mt-4">
            <KeyIcon sx={{ fontSize: "15px", color: "#747474" }} />
            <input
              placeholder="Password"
              className="w-full outline-none bg-transparent text-md text-input-placeholder"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityOffIcon
                sx={{ fontSize: "15px", color: "#747474", cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityIcon
                sx={{ fontSize: "15px", color: "#747474", cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          {/* <p className="text-[11px] my-2 mr-2 text-input-placeholder w-max ml-auto" >Forgot Password ?</p> */}
          <button
            type="submit"
            className="border border-transparent main_btn text-center mt-10 bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg"
          >
            <div className="flex items-center justify-center">
              {!loading ? (
                <span className="">Sign In</span>
              ) : (
                <RotatingLines
                  visible={true}
                  height="20"
                  width="20"
                  color="white"
                  strokeWidth="5"
                  strokeColor="white"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
