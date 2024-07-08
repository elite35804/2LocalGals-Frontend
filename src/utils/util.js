import { Settings } from "../../settings";
export const getAccessToken = async () => {
  const TOKEN_NAME = Settings.appName.toLowerCase() + "-token";
  return JSON.parse(await localStorage.getItem(TOKEN_NAME))?.token;
};
