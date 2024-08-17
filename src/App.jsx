import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RideRequestDetail from "./pages/RideRequestDetail";
import { Box, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

function App() {
  const [snackbarFlag, setSnackbarFlag] = useState(false);
  const [snackbarType, setSnackbarType] = useState("error");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  return (
    <>
      <AppContext.Provider
        value={{
          snackbarFlag,
          setSnackbarFlag,
          snackbarType,
          setSnackbarType,
          snackbarMessage,
          setSnackbarMessage,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detail" element={<RideRequestDetail />} />
          </Routes>
        </BrowserRouter>

        {/* add snackbar with context flag for user notification */}
        <Snackbar
          open={snackbarFlag}
          message={snackbarMessage || "123"}
          security={snackbarType}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </AppContext.Provider>
    </>
  );
}

export default App;
