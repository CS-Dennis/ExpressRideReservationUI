import "./App.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RideRequestDetail from "./pages/RideRequestDetail";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail" element={<RideRequestDetail />} />
        </Routes>
      </BrowserRouter>

      {/* add snackbar with context flag for user notification */}
    </>
  );
}

export default App;
