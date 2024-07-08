import React, { useEffect, useState } from "react";
import WithDashboardLayout from "@/hoc/WithDashboardLayout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Person from "@mui/icons-material/Person";
import axios from "axios";
import { useAppState, useActions } from "@/store";
import { Settings } from "../../../settings";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const UpdateProfilePicture = () => {
  const state = useAppState();
  const actions = useActions();
  const [date, setDate] = useState(new Date());
  const [avatar, setAvatar] = useState(state.contractor?.ContractorPic);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAvatar(state.contractor?.ContractorPic);
  }, [state.contractor]);
  const onUploadFile = async () => {
    document.getElementById("upload-file").click();
  };
  console.log(state.currentUser);
  const onUpload = (e) => {
    console.log(e.target.files[0]);
    setAvatar(window.URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const onSave = async () => {
    console.log(state.currentUser, file);
    if (!file) {
      actions.alert.showError({ message: "Please select an avatar" });
      return false;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("address", state.contractor?.address);
      formData.append("city", state.contractor?.city);
      formData.append("zip", state.contractor?.zip);
      formData.append("state", state.contractor?.state);
      formData.append("ContractorPic", file);
      const res = await axios.post(
        Settings.api_url +
          "UpdateContractorInfo/" +
          state.currentUser?.contractorID,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      await actions.user.getContractorInfo(state.currentUser?.contractorID);
      actions.alert.showSuccess({ message: res?.data?.status });
      navigate(-1);
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
          <div className="bg-white p-3 pb-5 mt-3 rounded-lg sm:w-full">
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
            <h2 className="font-medium text-base mt-3 ">
              Update Profile Picture
            </h2>
            <div className="mt-10">
              <div
                onClick={onUploadFile}
                className="w-[120px] mx-auto h-[120px] cursor-pointer flex justify-center items-center bg-gray-100"
              >
                {!avatar ? (
                  <Person style={{ fontSize: "120px", color: "gray" }} />
                ) : (
                  <img
                    className="w-[120px] mx-auto h-[120px] cursor-pointer object-cover"
                    src={avatar}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className="w-[300px] mx-auto">
              <button
                onClick={onSave}
                className="main_btn border border-transparent text-center w-full mt-10 flex justify-center items-center bg-yellow-900 text-white text-xs font-semibold px-12 py-3 rounded-lg"
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
        <input
          type="file"
          className="hidden"
          accept="image/*"
          id="upload-file"
          onChange={onUpload}
        />
      </div>
    </>
  );
};

export default WithDashboardLayout(UpdateProfilePicture);
