import { useEffect, useState } from "react";
import "./App.css";
import Routing from "./route/Routing";
import Snackbar from "@mui/joy/Snackbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Close } from "@mui/icons-material";
import { useActions, useAppState } from "./store";

function App() {
  const state = useAppState();
  const actions = useActions();
  useEffect(() => {
    if (state.alert.visible) {
      setTimeout(() => {
        actions.alert.hide();
      }, 3000);
    }
  }, [state.alert.visible]);

  useEffect(() => {
    onInitialize();
  }, []);

  const onInitialize = async () => {
    try {
      await actions.initialize();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Routing />
      <Snackbar
        style={{
          background: state.alert.type === "success" ? "#C4FFD5" : "red",
          color: state.alert.type === "success" ? "white" : "white",
        }}
        open={state.alert.visible}
        autoHideDuration={3000} // Optional: Adjust duration as needed
        onClose={() => actions.alert.hide()}
        message="Snackbar message"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {state.alert?.message}
        {state.alert.type === "success" ? (
          <CheckCircleIcon
            style={{ color: "white", fontSize: "2rem" }}
            className="ms-auto"
          />
        ) : (
          <Close
            style={{ color: "white", fontSize: "2rem" }}
            className="ms-auto"
          />
        )}
      </Snackbar>
    </>
  );
}

export default App;
