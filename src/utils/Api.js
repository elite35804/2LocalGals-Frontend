import axios from "axios";
import { getAccessToken } from "./util";
import { Settings } from "../../settings.js";

// Add a request interceptor
axios.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    console.log(token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const API = async (url, method, params) => {
  try {
    if (method === "get") {
      const res = await axios.get(Settings.api_url + url);
      return res?.data;
    } else if (method === "post") {
      const res = await axios.post(Settings.api_url + url, params);
      return res?.data;
    } else if (method === "delete") {
      const res = await axios.delete(Settings.api_url + url);
      return res?.data;
    }
  } catch (e) {
    if (e?.response?.status === 401) {
      throw new Error("Unauthorized");
    }
  }
};
