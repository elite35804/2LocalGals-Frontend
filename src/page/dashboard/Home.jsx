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

  useEffect(() => {
    getPosition();
    getPayments();
    getAppointments();
  }, []);

  useEffect(() => {
    updateCoords();
  }, [location]);

  const getAppointments = async () => {
    await actions.appointment.getAppointments({
      startDate: moment().format("M/D/YYYY"),
      endDate: moment().endOf("week").add("days", 7).format("M/D/YYYY"),
    });
    console.log(state.appointment.appointments, "appointments");
  };

  const updateCoords = async (data) => {
    if (state.currentUser?.contractorID) {
      await updateCoords({
        latitude: data.latitude,
        longitude: data.longitude,
      });
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
      today.pay += p?.Total;
      today.hourlyRate += p?.AveragePayRate;
    });
    today.hourlyRate = today.hourlyRate / payments.length || 0;
    today.hours = today.pay / today.hourlyRate || 0;
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
      thisWeek.pay += p?.Total;
      thisWeek.hourlyRate += p?.AveragePayRate;
    });
    thisWeek.hourlyRate = thisWeek.hourlyRate / thisWeekPayments.length || 0;
    thisWeek.hours = thisWeek.pay / thisWeek.hourlyRate || 0;
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
      nextWeek.pay += p?.Total;
      nextWeek.hourlyRate += p?.AveragePayRate;
    });
    nextWeek.hourlyRate = nextWeek.hourlyRate / nextWeekPayments.length || 0;
    nextWeek.hours = nextWeek.pay / nextWeek.hourlyRate || 0;
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

  console.log(Object.values(state.appointment?.appointments || {}));

  return (
    <div className="login_page min-h-screen">
      <div className="container">
        <div className="py-4">
          <div className="flex items-center">
            <h2 className="font-bold text-white text-base heading mt-3 w-1/2 ">
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
