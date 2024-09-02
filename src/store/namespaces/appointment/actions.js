import { API } from "@/utils/Api";
import { groupBy } from "lodash";
import moment from "moment";

export const getAppointments = async ({ state, effects, actions }, data) => {
  try {
    const res = await API(
      `Schedule/GetSchedule?startDate=${data?.startDate}&ContractorID=${data?.id}&endDate=${data?.endDate}`,
      "get"
    );
    if (res) {
      const data = res?.sort((a, b) =>
        a?.ScheduleDate < b?.ScheduleDate && a?.startTime < b?.startTime
          ? -1
          : 1
      );
      // data.map(
      //   (d) =>
      //     (d.AproxPay = Math.round(
      //       d.customerRate * d.Hours * 0.92 +
      //         d.ContractorTips +
      //         d.CustomerServiceFee
      //     ))
      // );
      state.appointment.appointments = groupBy(data, "ScheduleDate");
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

export const getNotesAndPhotos = async ({ state, actions }, id) => {
  try {
    const res = await API(`Schedule/GetAppNotesAndAttachment/${id}`, "get");
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

export const startJob = async ({ actions }, id) => {
  try {
    const res = await API(
      `schedule/StartJob/${id}?date=${moment().format("YYYY-MM-DDTHH:mm:ss")}`,
      "post",
      {}
    );
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

export const updateJobDetail = async ({ actions }, data) => {
  try {
    const res = await API(
      `Schedule/Appointment/UpdateDurationTime/${data?.id} `,
      "post",
      data
    );
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

export const endJob = async ({ actions }, id) => {
  try {
    const res = await API(
      `schedule/endJob/${id}?date=${moment().format("YYYY-MM-DDTHH:mm:ss")}`,
      "post",
      {}
    );
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

export const updateCoordinate = async ({ actions }, data) => {
  console.log(data, "data");
  try {
    const res = await API(
      `Schedule/UpdateCoordinates/${data?.id}`,
      "post",
      data
    );
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

export const updateJobLog = async ({ state, actions }, data) => {
  try {
    const res = await API(`schedule/UpdateJobLog`, "post", data);
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

export const deleteImage = async ({ actions }, id) => {
  try {
    const res = await API(`Appointment/Attachment/${id}`, "delete");
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

export const getJobLogs = async ({ state, actions }, data) => {
  try {
    const res = await API(
      `schedule/GetJobLogs?AppointmentId=${data?.AppointmentId}&contractorID=${data?.contractorID}`,
      "get"
    );
    // console.log(res, "res");
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
