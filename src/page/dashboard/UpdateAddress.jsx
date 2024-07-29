import React, { useEffect, useState } from "react";
import WithDashboardLayout from "@/hoc/WithDashboardLayout";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import city_img from "../../assets/city.png";
import map_img from "../../assets/ZIP.png";
import zip_img from "../../assets/zips.png";
import { useAppState, useActions } from "@/store";
import axios from "axios";
import { Settings } from "../../../settings";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { upperFirst } from "lodash";

const UpdateAddress = () => {
  const state = useAppState();
  const actions = useActions();
  const [address, setAddress] = useState(state.contractor?.address || "");
  const [city, setCity] = useState(state.contractor?.city || "");
  const [zip, setZip] = useState(state.contractor?.zip || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const abbreviations = {
    street: "St.",
    avenue: "Ave.",
    road: "Rd.",
    drive: "Dr.",
    boulevard: "Blvd",
    apartment: "Apt.",
    "post office": "Po.",
  };

  function expandAbbreviations(address) {
    return address
      .split(" ")
      .map((word) => abbreviations[word] || upperFirst(word))
      .join(" ");
  }

  function normalizeAddress(address) {
    address = address.toLowerCase();
    // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    return expandAbbreviations(address);
  }

  useEffect(() => {
    if (state.contractor) {
      setAddress(state.contractor?.address || "");
      setCity(state.contractor?.city || "");
      setZip(state.contractor?.zip || "");
    }
  }, [state.contractor]);

  const onSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("address", normalizeAddress(address));
      formData.append("city", normalizeAddress(city));
      formData.append("zip", zip);
      formData.append("state", state.contractor?.state);
      //   formData.append("businessName", "test");
      formData.append("franchiseMask", state.contractor.franchiseMask);
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
            <h2 className="font-medium text-base mt-3 ">Update Address</h2>
            <div className="max-w-[320px] w-full mx-auto mt-3">
              <div className="mt-2 shadow rounded-md flex gap-2 pl-2 items-center">
                <img className="w-5" src={map_img} alt="" />
                <input
                  type="text"
                  className="outline-none w-full py-3 rounded-md capitalize"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mt-2 shadow rounded-md flex gap-2 pl-2 items-center">
                <img className="w-5" src={city_img} alt="" />
                <input
                  type="text"
                  className="outline-none w-full py-3 rounded-md capitalize"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mt-2 shadow rounded-md flex gap-2 pl-2 items-center">
                <img className="w-5 h-4 object-contain" src={zip_img} alt="" />
                <input
                  type="text"
                  className="outline-none w-full py-3 rounded-md"
                  placeholder="ZIP"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <div className="w-full">
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
        </div>
      </div>
    </>
  );
};

export default WithDashboardLayout(UpdateAddress);
