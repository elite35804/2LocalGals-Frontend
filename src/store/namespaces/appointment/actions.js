import { API } from "@/utils/Api";
import { groupBy } from "lodash";

export const getAppointments = async ({ state, effects, actions }, data) => {
  try {
    const res = await API(
      `Schedule/GetSchedule?startDate=${data?.startDate}&endDate=${data?.endDate}`,
      "get"
    );
    if (res) {
      const data = res?.sort((a, b) => a?.ScheduleDate > b?.ScheduleDate ? 1 : -1);
      state.appointment.appointments = groupBy(data, 'ScheduleDate');
    }
    
    return res;
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

export const getAppointmentById = async ({ state, actions }, id) => {
  try {
    const res = await API(`Schedule/GetAppointment/${id}`, "get");
    state.appointment.appointment = res;
    return res;
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

export const startJob = async ({ state, actions }, id) => {
  try {
    const res = await API(`schedule/StartJob/${id}`, "post", {});
    console.log(res, 'res')
    return res;
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

export const endJob = async ({ state, actions }, id) => {
  try {
    const res = await API(`schedule/endJob/${id}`, "post", {});
    console.log(res, "res");
    return res;
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

export const updateCoordinate = async ({ state, actions }, data) => {
  console.log(data, "data");
  try {
    const res = await API(`Schedule/UpdateCoordinates/${data?.id}`, "post", data);
    console.log(res, "res");
    return res;
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
