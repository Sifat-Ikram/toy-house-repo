import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../shared/DashboardNavbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 md:w-1/5 z-50">
        <DashboardNavbar />
      </div>

      {/* Main Content */}
      <div className="w-full sm:w-3/4 md:w-4/5 z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
