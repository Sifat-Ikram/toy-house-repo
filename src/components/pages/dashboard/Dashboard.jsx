import { Outlet } from "react-router-dom";
import DashboardNavbar from "../../shared/DashboardNavbar";

const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div className="w-full sm:w-[300px] z-50">
        <DashboardNavbar />
      </div>

      {/* Main Content */}
      <div className="w-full sm:flex-1 z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
