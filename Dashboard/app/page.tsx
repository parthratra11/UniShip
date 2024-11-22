// import "./globals.css";

// export default function Home() {
//   return (
//     <>
//       <div>Home Page</div>
//     </>
//   );
// }

"use client";
import {
  FaShippingFast,
  FaBox,
  FaHistory,
  FaChartLine,
  FaRobot,
  FaComments,
  FaUser,
  FaBoxOpen,
  FaExchangeAlt,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { useState } from "react";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-amazon shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white">UniShip</h1>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-1">
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaBox />
              <span>Pending Orders</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaExchangeAlt />
              <span>Returned Orders</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-amazon-hover rounded text-amazon-orange">
              <FaShippingFast />
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaHistory />
              <span>History</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaBoxOpen />
              <span>Products</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaRobot />
              <span>DockAI Assistant</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaComments />
              <span>Chat Support</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaUser />
              <span>User Profile</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-amazon">
          <div className="flex items-center justify-between p-4">
            <div className="w-96">
              <input
                type="search"
                placeholder="Track shipment..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <IoNotifications className="text-xl text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-4 top-16 w-80 bg-white shadow-amazon rounded-lg p-4 z-50">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <div className="p-2 hover:bg-gray-50 rounded">
                      <p className="text-sm">New shipment update available</p>
                      <span className="text-xs text-gray-500">
                        5 minutes ago
                      </span>
                    </div>
                    <div className="p-2 hover:bg-gray-50 rounded">
                      <p className="text-sm">Delivery completed for #SH12345</p>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
              <h3 className="text-amazon text-sm font-medium">
                Total Shipments
              </h3>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-amazon">1,234</span>
                <span className="text-green-600 text-sm">
                  +9% vs last month
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
              <h3 className="text-amazon text-sm font-medium">Average Cost</h3>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-amazon">₹1,432</span>
                <span className="text-red-600 text-sm">-5% vs last month</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
              <h3 className="text-amazon text-sm font-medium">Delivery Time</h3>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-amazon">12 days</span>
                <span className="text-green-600 text-sm">
                  -2 days vs last month
                </span>
              </div>
            </div>
          </div>

          {/* Main Analytics Section */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-amazon border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-amazon">
                  Shipment Analytics
                </h2>
                <button
                  onClick={() => (window.location.href = "/detailed-analytics")}
                  className="text-amazon hover:text-amazon-orange transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                Shipment Analytics Chart
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200">
              <h2 className="text-lg font-medium text-amazon mb-4">
                Carrier Performance
              </h2>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                Carrier Analytics Chart
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
