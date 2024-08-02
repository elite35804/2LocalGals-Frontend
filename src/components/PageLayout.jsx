import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppState, useActions } from "@/store";

const PageLayout = () => {
  const location = useLocation();
  const actions = useActions();
  useEffect(() => {
    checkActiveTimer();
  }, [location]);

  const checkActiveTimer = async () => {
    const data = JSON.parse(localStorage.getItem("active_timer"));
    if (data?.appointmentId) {
      await actions.appointment.updateJobDetail({
        id: data?.appointmentId,
        duration: data?.duration,
        pauseTime: new Date(),
      });
      localStorage.removeItem("active_timer");
    }
  };
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default PageLayout;
