import { API } from "@/utils/Api";

/*
 *
 */
export const updateContractorInfo = async ({ state, actions }, data) => {
  console.log(data, "data");
  try {
    const res = await API(
      "UpdateContractorInfo/" + data?.contractorId,
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
      actions.alert.showError({
        message: "Session expired. Please login again.",
      });
      window.location.href = "/";
    }
    throw new Error(e?.message);
  }
};

export const getContractorInfo = async ({ state, actions }, id) => {
  try {
    const res = await API("GetContractorInfo/" + id, "get");
    console.log(res, "res");
    state.contractor = res;
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

export const addUnavailability = async ({ state, actions }, data) => {
  console.log(data, "data");
  try {
    const res = await API("Schedule/AddUnavailibility", "post", data);
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

export const deleteUnavailability = async ({ state, actions }, id) => {
  try {
    const res = await API(`Schedule/DeleteUnavailibility/${id}`, "delete");
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

export const getUnavailabilities = async ({ state, actions }, data) => {
  try {
    const res = await API(
      `Schedule/GetUnavailibility?FromDate=` +
        data.FromDate +
        `&ToDate=` +
        data.ToDate,
      "get"
    );
    console.log(res, "res");
    state.user.unavailabilities = res;
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

export const getPayments = async ({ state, actions }, data) => {
  try {
    const res = await API(
      `Payment/GetPaymentByDateRange?StartDate=` +
        data.StartDate +
        `&EndDate=` +
        data.EndDate,
      "get"
    );
    console.log(res, "res");
    state.user.payments = res;
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
