import { Settings } from "../../settings";
import store from "store/dist/store.modern";
import { json } from "overmind";
import { API } from "@/utils/Api";
const TOKEN_NAME = Settings.appName.toLowerCase() + "-token";

/*
 *
 */
export const setStoredAuthToken = async ({ state }) => {
  return store.set(TOKEN_NAME, {
    token: state.authToken,
    userId: state.userId,
  });
};

/*
 *
 */
export const getStoredAuthToken = async () => {
  try {
    if (!store.get(TOKEN_NAME)) return store.set(TOKEN_NAME, { token: null });
    return store.get(TOKEN_NAME);
  } catch (e) {
    console.log(e);
  }
};

/*
 *
 */
export const removeStoredAuthToken = async () => {
  return store.remove(TOKEN_NAME);
};

/*
 *
 */
export const logout = async ({ state, actions }) => {
  console.log("Logout");
  state.currentUser = null;
  state.isLoggedIn = false;
  state.authToken = null;
  await localStorage.removeItem("2localgals-frontend-token");
  // await localStorage.removeItem("chewbox_currentCart");
  // await localStorage.removeItem("chewbox_order");
  // await localStorage.removeItem("chewbox_user");
  await actions?.removeStoredAuthToken();
  return true;
};

/*
 *
 */
export const login = async ({ effects, state, actions }, data) => {
  console.log(data, "data");
  try {
    const res = await API("user/login", "post", data);
    console.log(res, "res");
    if (res?.Token) {
      state.authToken = res.Token;
      state.userId = data?.Username;
      await actions.setStoredAuthToken();
      await actions.getUser();
      await actions.user.getContractorInfo(state.currentUser?.contractorID);
      return res;
    }
    return res;
  } catch (e) {
    throw new Error(e?.message);
  }
};

export const getUser = async ({ state, actions }) => {
  try {
    const user = await API("users/" + state.userId, "get");
    state.currentUser = user;
    state.isLoggedIn = true;
    return user;
  } catch (e) {
    if (e?.message === "Unauthorized") {
      actions.logout();
      actions.alert.showError({
        message: "Session expired. Please login again.",
      });
      window.location.href = "/";
    }
    throw new Error(e?.message);
  }
};

const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));
export const recursiveContractor = async ({ state, actions }) => {
  while (true) {
    if (!state.contractor?.active) {
      actions.logout();
      window.location.href = "/";
      break;
    } else {
      await sleep(5000);
      await actions.user.getContractorInfo(state.currentUser?.contractorID);
    }
  }
};

export const initialize = async ({ state, actions }) => {
  try {
    const token = await getStoredAuthToken();
    state.authToken = token.token;
    state.userId = token.userId;
    if (state.authToken) {
      await actions.getUser();
      await actions.user.getContractorInfo(state.currentUser?.contractorID);
      actions.recursiveContractor();
    }
  } catch (e) {
    if (e?.message === "Unauthorized") {
      actions.logout();
      actions.alert.showError({
        message: "Session expired. Please login again.",
      });
      window.location.href = "/";
    }
    throw new Error(e?.message);
  }
};
