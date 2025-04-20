import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import EmployeeDashBoard from "./components/EmployeeDashBoard";
import Logo from "./components/Logo";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import Messages from "./components/Messages";
import ContentHeader from "./components/ContentHeader";
function App() {
  return (
    <div className="container-fluid g-0 min-vh-100">
      <ContentHeader />

      <div className="row g-0 flex-nowrap min-vh-100">
        
        <div className={`col-12 col-md-3 col-lg-2 border-end`}>

          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 ">
          <div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeDashBoard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/messages" element={<Messages />} />
              {/* Add other routes here */}
            </Routes>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
