import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AllEvents from "./pages/Allevents";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Event from "./pages/Event";
import ApprovedEvents from "./pages/ApprovedEvents";
import AppliedEvents from "./pages/AppliedEvents";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/allEvents" element={<AllEvents />} />
            <Route path="/createEvent" element={<CreateEvent />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/aprovedEvents" element={<ApprovedEvents />} />
            <Route path="/appliedEvents" element={<AppliedEvents />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
