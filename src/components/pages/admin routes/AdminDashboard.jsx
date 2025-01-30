// AdminDashboard.js
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // State for statistics
  const [statistics, setStatistics] = useState({
    totalSales: 12400,
    revenue: 8200,
    users: 1254,
    inStock: 75,
    outOfStock: 25,
  });

  // State for Website Content Management
  const [banners, setBanners] = useState({
    title: "Default Banner Title",
    text: "Default Banner Text",
    media: null,
    editing: false,
  });

  // Chart Data
  const salesData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Total Sales ($)",
        data: [1200, 1900, 800, 1400],
        backgroundColor: "#4F46E5",
      },
      {
        label: "Revenue ($)",
        data: [900, 1500, 700, 1200],
        backgroundColor: "#10B981",
      },
    ],
  };

  const inventoryData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        label: "Inventory",
        data: [statistics.inStock, statistics.outOfStock],
        backgroundColor: ["#34D399", "#F43F5E"],
      },
    ],
  };

  const handleBannerUpdate = (e) => {
    e.preventDefault();
    const { title, text, media } = e.target.elements;
    setBanners({
      title: title.value,
      text: text.value,
      media: media.files[0]?.name || banners.media,
      editing: false,
    });
  };

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-3 mb-8">
        <div className="shadow-md p-4 rounded-lg">
          <h3 className="text-base lg:text-lg font-medium">Total Sales</h3>
          <p className="text-lg lg:text-2xl font-bold text-gray-700">
            ${statistics.totalSales}
          </p>
        </div>
        <div className="shadow-md p-4 rounded-lg">
          <h3 className="text-base lg:text-lg font-medium">Revenue</h3>
          <p className="text-lg lg:text-2xl font-bold text-gray-700">
            ${statistics.revenue}
          </p>
        </div>
        <div className="shadow-md p-4 rounded-lg">
          <h3 className="text-base lg:text-lg font-medium">Registered Users</h3>
          <p className="text-lg lg:text-2xl font-bold text-gray-700">{statistics.users}</p>
        </div>
        <div className="shadow-md p-4 rounded-lg">
          <h3 className="text-base lg:text-lg font-medium">Inventory</h3>
          <p className="text-lg lg:text-2xl font-bold text-gray-700">
            {statistics.inStock}% In Stock / {statistics.outOfStock}% Out of
            Stock
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
          <Bar data={salesData} />
        </div>
        <div className="shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Inventory Status</h3>
          <Pie data={inventoryData} />
        </div>
      </div>

      {/* Website Content Management */}
      <div className="shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Website Content Management
        </h2>
        {/* Manage Banners */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium text-lg">Manage Homepage Banners</h3>
          {!banners.editing ? (
            <>
              <p className="text-sm text-gray-600">Title: {banners.title}</p>
              <p className="text-sm text-gray-600">Text: {banners.text}</p>
              <p className="text-sm text-gray-600">
                Media: {banners.media || "No file uploaded"}
              </p>
              <button
                onClick={() => setBanners({ ...banners, editing: true })}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Banner
              </button>
            </>
          ) : (
            <form onSubmit={handleBannerUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={banners.title}
                placeholder="Enter Banner Title"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="text"
                defaultValue={banners.text}
                placeholder="Enter Banner Text"
                className="w-full border p-2 rounded"
              />
              <input
                type="file"
                name="media"
                accept="image/*,video/*"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between items-center">
                <button type="submit" className="buttons">
                  Save Changes
                </button>
                <button
                  type="button" // Use type="button" to prevent form submission
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => setBanners({ ...banners, editing: false })}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
