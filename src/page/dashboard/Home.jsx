import { useEffect, useState } from "react";
import WeeklyData from "../../components/WeeklyData";
import Schedule from "../../components/Schedule";
import WithDashboardLayout from "@/hoc/WithDashboardLayout";
import { useAppState, useActions } from "@/store";
import moment from "moment";
import usePerfectInterval from "../../hooks/intervalHook.js";
import numeral from "numeral";

const Home = () => {
  const state = useAppState();
  const actions = useActions();
  const [report, setReport] = useState({});
  const [currentAppointment, setCurrentAppointment] = useState({});

  usePerfectInterval(async () => {
    getPayments();
    getAppointments();
  }, 5000);

  useEffect(() => {
    if (state.contractor) {
      getPayments();
      getAppointments();
    }
  }, [state.contractor]);

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

  const getPayments = async () => {
    console.log(
      moment().startOf("isoweek").subtract(1, "days").format("M/D/YYYY"),
      moment().endOf("isoweek").add(6, "days").format("M/D/YYYY")
    );
    await actions.user.getPayments({
      StartDate: moment()
        .startOf("isoweek")
        .subtract(1, "days")
        .format("M/D/YYYY"),
      EndDate: moment().endOf("isoweek").add(6, "days").format("M/D/YYYY"),
      id: state.contractor?.contractorID,
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
      today.pay += p?.Total;
      p.Details.map((d) => {
        today.hours += parseFloat(d?.Hours);
      });
    });
    today.hourlyRate = today.pay / today.hours || 0;
    today.pay = numeral(today.pay).format("0,0.00");
    today.hourlyRate = numeral(today.hourlyRate).format("0,0.00");
    const thisWeek = {
      hours: 0,
      pay: 0,
      hourlyRate: 0,
    };
    const thisWeekPayments = state.user.payments.filter(
      (p) =>
        moment(p?.Date).format("YYYY-MM-DD") >=
          moment()
            .startOf("isoweek")
            .subtract(1, "days")
            .format("YYYY-MM-DD") &&
        moment(p?.Date).format("YYYY-MM-DD") <=
          moment().endOf("isoweek").subtract(1, "days").format("YYYY-MM-DD")
    );
    thisWeekPayments.map((p) => {
      thisWeek.pay += p?.Total;
      p.Details.map((d) => {
        thisWeek.hours += parseFloat(d?.Hours);
      });
    });
    thisWeek.hourlyRate = thisWeek.pay / thisWeek.hours || 0;
    thisWeek.pay = numeral(thisWeek.pay).format("0,0.00");
    thisWeek.hourlyRate = numeral(thisWeek.hourlyRate).format("0,0.00");
    const nextWeek = {
      hours: 0,
      pay: 0,
      hourlyRate: 0,
    };
    const nextWeekPayments = state.user.payments.filter(
      (p) =>
        moment(p?.Date).format("YYYY-MM-DD") >=
          moment().startOf("isoweek").add(6, "days").format("YYYY-MM-DD") &&
        moment(p?.Date).format("YYYY-MM-DD") <=
          moment().endOf("isoweek").add(6, "days").format("YYYY-MM-DD")
    );
    nextWeekPayments.map((p) => {
      nextWeek.pay = p?.Total;
      p.Details.map((d) => {
        nextWeek.hours += parseFloat(d?.Hours);
      });
    });
    nextWeek.hourlyRate = nextWeek.pay / nextWeek.hours || 0;
    nextWeek.pay = numeral(nextWeek.pay).format("0,0.00");
    nextWeek.hourlyRate = numeral(nextWeek.hourlyRate).format("0,0.00");
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
              Good {getTime()} {state.contractor?.firstName}!
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
                      contractor={state.contractor}
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
