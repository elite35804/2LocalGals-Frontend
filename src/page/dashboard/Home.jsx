import React, { useEffect, useState } from "react";
import WeeklyData from "../../components/WeeklyData";
import Schedule from "../../components/Schedule";
import WithDashboardLayout from "@/hoc/WithDashboardLayout";
import { useAppState, useActions } from "@/store";
import moment from "moment";

const Home = () => {
  const state = useAppState();
  const actions = useActions();
  const [report, setReport] = useState({});
  const [location, setLocation] = useState({});
  const [currentAppointment, setCurrentAppointment] = useState({});

  useEffect(() => {
    // getPosition();
    getPayments();
  }, []);

  useEffect(() => {
    updateCoords();
  }, [location]);

  const sleep = (waitTimeInMs) =>
    new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

  useEffect(() => {
    if (state.contractor) {
      getAppointments();
      onReload();
    }
  }, [state.contractor]);

  const onReload = async () => {
    // while (true) {
    //   await sleep(5000);
    //   await getAppointments();
    // }
  };

  const getAppointments = async () => {
    await actions.appointment.getAppointments({
      id: state.contractor?.contractorID,
      startDate: moment().format("M/D/YYYY"),
      endDate: moment().endOf("week").add("days", 7).format("M/D/YYYY"),
    });
    console.log(state.appointment.appointments, "appointments");
    const appointment = state.appointment.appointments[
      Object.keys(state.appointment.appointments).find(
        (k) => moment(k).format("M/D/YYYY") === moment().format("M/D/YYYY")
      )
    ]?.filter((a) => !a?.JobCompleted)?.[0];
    if (appointment) {
      localStorage.setItem("current_appointment", JSON.stringify(appointment));
      setCurrentAppointment(appointment);
    } else {
      localStorage.removeItem("current_appointment");
    }
  };

  const updateCoords = async (data) => {
    if (state.currentUser?.contractorID) {
      await updateCoords(data);
    }
  };

  const getPosition = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setLocation({
        latitude,
        longitude,
      });
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  };

  const getPayments = async () => {
    await actions.user.getPayments({
      StartDate: moment()
        .startOf("isoweek")
        .subtract(1, "days")
        .format("M/D/YYYY"),
      EndDate: moment().endOf("isoweek").add(8, "days").format("M/D/YYYY"),
    });
    console.log(state.user.payments, "payments");
    const today = {
      hours: 0,
      pay: 0,
      hourlyRate: 0,
    };
    const payments = state.user.payments.filter(
      (p) =>
        moment(p?.Date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
    );
    payments.map((p) => {
      p.Details.map((d) => {
        today.pay += Math.round(
          d.HourRate * parseInt(d?.Hours) * 0.92 + d.ServiceFee + d.Tips
        );
        today.hours += parseInt(d?.Hours);
      });
    });
    today.hourlyRate = Math.round(today.pay / today.hours || 0);
    Object.keys(today).map((key) => (today[key] = Math.round(today[key])));
    const thisWeek = {
      hours: 0,
      pay: 0,
      hourlyRate: 0,
    };
    const thisWeekPayments = state.user.payments.filter(
      (p) =>
        moment(p?.Date).format("YYYY-MM-DD") >=
          moment().startOf("isoweek").format("YYYY-MM-DD") &&
        moment(p?.Date).format("YYYY-MM-DD") <=
          moment().endOf("isoweek").format("YYYY-MM-DD")
    );
    thisWeekPayments.map((p) => {
      p.Details.map((d) => {
        thisWeek.pay += Math.round(
          d.HourRate * parseInt(d?.Hours) * 0.92 + d.ServiceFee + d.Tips
        );
        thisWeek.hours += parseInt(d?.Hours);
      });
    });
    thisWeek.hourlyRate = Math.round(thisWeek.pay / thisWeek.hours || 0);
    Object.keys(thisWeek).map(
      (key) => (thisWeek[key] = Math.round(thisWeek[key]))
    );
    const nextWeek = {
      hours: 0,
      pay: 0,
      hourlyRate: 0,
    };
    const nextWeekPayments = state.user.payments.filter(
      (p) =>
        moment(p?.Date).format("YYYY-MM-DD") >=
          moment().startOf("isoweek").add(7, "days").format("YYYY-MM-DD") &&
        moment(p?.Date).format("YYYY-MM-DD") <=
          moment().endOf("isoweek").add(7, "days").format("YYYY-MM-DD")
    );
    nextWeekPayments.map((p) => {
      p.Details.map((d) => {
        nextWeek.pay += Math.round(
          d.HourRate * parseInt(d?.Hours) * 0.92 + d.ServiceFee + d.Tips
        );
        nextWeek.hours += parseInt(d?.Hours);
      });
    });
    nextWeek.hourlyRate = Math.round(nextWeek.pay / nextWeek.hours || 0);
    Object.keys(nextWeek).map(
      (key) => (nextWeek[key] = Math.round(nextWeek[key]))
    );
    const reports = {
      today: today,
      thisWeek: thisWeek,
      nextWeek: nextWeek,
    };
    setReport(reports);
  };

  const getTime = () => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 18) {
      return "Afternoon";
    } else if (hour >= 18 && hour < 21) {
      return "Evening";
    } else if (hour >= 6 && hour < 12) {
      return "Morning";
    } else {
      return "Night";
    }
  };

  return (
    <div className="login_page min-h-screen">
      <div className="px-7 max-w-[1440px] mx-auto">
        <div className="py-4">
          <div className="flex items-center">
            <h2 className="font-bold text-white text-base heading mt-3 ">
              Good {getTime()} {state.currentUser?.username}!
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <WeeklyData report={report} />
            <h2 className="font-bold text-white text-base heading mt-3 mb-3">
              Schedules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-5 -mt-5">
              {Object.keys(state.appointment?.appointments || {})?.map(
                (key) => {
                  return (
                    <Schedule
                      key={key}
                      date={key}
                      appointments={state.appointment?.appointments?.[key]}
                      currentAppointment={currentAppointment}
                      location={location}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithDashboardLayout(Home);
