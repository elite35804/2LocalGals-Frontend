import React, { useEffect, useState } from "react";
import WithDashboardLayout from "@/hoc/WithDashboardLayout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Person from "@mui/icons-material/Person";
import axios from "axios";
import { useAppState, useActions } from "@/store";
import { Settings } from "../../../settings";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import plusIcon from "../../assets/plus-icon.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";

const UpdateProfilePicture = () => {
  const state = useAppState();
  const actions = useActions();
  const [date, setDate] = useState(new Date());
  const [avatar, setAvatar] = useState(state.contractor?.ContractorPic);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

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
    setOpen(true);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        avatar,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
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
          maxBodyLength: Infinity,
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
              <div className="w-36 mx-auto h-36 flex justify-center items-center bg-gray-100 border-2 border-[#6FC1E9] rounded-md relative">
                <img
                  className="w-full mx-auto h-full rounded cursor-pointer object-cover"
                  src={!avatar ? logo : avatar}
                  alt=""
                />
                <div
                  className="absolute cursor-pointer right-5 top-12"
                  onClick={onUploadFile}
                >
                  <img src={plusIcon} alt="" />
                </div>
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
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="lg"
        wrapperStyle={{ backgroundColor: "white" }}
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <div className="w-80 h-96 mt-4">
            <Cropper
              image={avatar}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{
                containerStyle: {
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "50px",
                  marginTop: "50px",
                },
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              const image = await getCroppedImg(
                avatar,
                croppedAreaPixels,
                rotation
              );
              setAvatar(image);
              const base64Response = await fetch(`${image}`);
              const blob = await base64Response.blob();
              setFile(new File([blob], file.name, { type: "image/jpeg" }));
              setCrop({ x: 0, y: 0 });
              setZoom(1);
              setOpen(false);
            }}
          >
            Ok
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WithDashboardLayout(UpdateProfilePicture);
