// "use client";
// import { FaShippingFast, FaBox, FaHistory, FaChartLine, FaRobot, FaComments, FaUser, FaBoxOpen, FaExchangeAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
// import { IoNotifications } from 'react-icons/io5';
// import { useState } from 'react';

// export default function Dashboard() {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showDockAI, setShowDockAI] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Left Sidebar */}
//       <div className="w-64 bg-amazon shadow-lg flex flex-col">
//         <div className="p-4 flex items-center space-x-3">
//           <FaBox className="text-amazon-orange text-2xl" />
//           <h1 className="text-2xl font-bold text-white">UniShip</h1>
//         </div>

//         <nav className="flex-1 mt-6">
//           <div className="px-4 space-y-1">
//             <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
//               <FaBox />
//               <span>Pending Orders</span>
//             </div>
//             <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
//               <FaExchangeAlt />
//               <span>Returned Orders</span>
//             </div>
//             <div className="flex items-center space-x-2 p-2 bg-amazon-hover rounded text-amazon-orange">
//               <FaShippingFast />
//               <span>In Progress</span>
//             </div>
//             <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
//               <FaHistory />
//               <span>History</span>
//             </div>
//             <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
//               <FaBoxOpen />
//               <span>Products</span>
//             </div>
//             <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
//               <FaRobot />
//               <span>DockAI</span>
//             </div>
//             <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
//               <FaComments />
//               <span>Chat</span>
//             </div>
//           </div>
//         </nav>

//         {/* Settings and Logout at Bottom */}
//         <div className="p-4 border-t border-amazon-hover">
//           <div className="flex justify-between">
//             <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
//               <FaCog />
//               <span>Settings</span>
//             </button>
//             <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
//               <FaSignOutAlt />
//               <span>Sign Out</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <header className="bg-white shadow-amazon">
//           <div className="flex items-center justify-between p-4">
//             <div className="w-96">
//               <input
//                 type="search"
//                 placeholder="Track shipment..."
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amazon-orange focus:border-amazon-orange"
//               />
//             </div>
//             <div className="flex items-center space-x-6">
//               <button
//                 onClick={() => setShowNotifications(!showNotifications)}
//                 className="relative p-2 hover:bg-gray-100 rounded-full"
//               >
//                 <IoNotifications className="text-xl text-gray-600" />
//                 <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
//               </button>
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-full bg-amazon-orange flex items-center justify-center">
//                   <FaUser className="text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">John Smith</p>
//                   <p className="text-xs text-gray-500">johnsmith@email.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="flex">
//           {/* Main Content Area */}
//           <div className="flex-1 p-6">
//             {/* Analytics Cards */}
//             <div className="grid grid-cols-3 gap-6 mb-6">
//               <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
//                 <h3 className="text-amazon text-sm font-medium">Total Shipments</h3>
//                 <div className="flex items-end space-x-2">
//                   <span className="text-2xl font-bold text-amazon">1,234</span>
//                   <span className="text-green-600 text-sm">+9% vs last month</span>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
//                 <h3 className="text-amazon text-sm font-medium">Total Cost</h3>
//                 <div className="flex items-end space-x-2">
//                   <span className="text-2xl font-bold text-amazon">₹34,566.23</span>
//                   <span className="text-red-600 text-sm">-5% vs last month</span>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
//                 <h3 className="text-amazon text-sm font-medium">Avg. Delivery Time</h3>
//                 <div className="flex items-end space-x-2">
//                   <span className="text-2xl font-bold text-amazon">12 days</span>
//                   <span className="text-green-600 text-sm">-2 days vs last month</span>
//                 </div>
//               </div>
//             </div>

//             {/* Shipment Analytics */}
//             <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 mb-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-medium text-amazon">Shipment Analytics</h2>
//                 <button
//                   onClick={() => window.location.href = '/detailed-analytics'}
//                   className="text-amazon hover:text-amazon-orange transition-colors font-medium"
//                 >
//                   View Detailed Analytics
//                 </button>
//               </div>
//               <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
//                 <div className="text-center text-gray-500">
//                   <FaChartLine className="text-4xl mx-auto mb-2" />
//                   <p>Shipment Analytics Visualization</p>
//                 </div>
//               </div>
//             </div>

//             {/* Carrier Analytics */}
//             <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200">
//               <h2 className="text-lg font-medium text-amazon mb-4">Carrier Performance</h2>
//               <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
//                 <div className="text-center text-gray-500">
//                   <FaChartLine className="text-4xl mx-auto mb-2" />
//                   <p>Carrier Analytics Chart</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar - Shipment Updates */}
//           <div className="w-80 p-6 bg-white border-l border-gray-200">
//             <h2 className="text-lg font-medium text-amazon mb-4">Recent Updates</h2>
//             <div className="space-y-4">
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm font-medium">Shipment #SH12345</p>
//                 <p className="text-sm text-gray-600">Out for delivery</p>
//                 <span className="text-xs text-gray-500">5 minutes ago</span>
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm font-medium">Shipment #SH12346</p>
//                 <p className="text-sm text-gray-600">Arrived at sorting facility</p>
//                 <span className="text-xs text-gray-500">1 hour ago</span>
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm font-medium">Shipment #SH12347</p>
//                 <p className="text-sm text-gray-600">Customs clearance completed</p>
//                 <span className="text-xs text-gray-500">2 hours ago</span>
//               </div>
//               <div className="p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm font-medium">Shipment #SH12348</p>
//                 <p className="text-sm text-gray-600">Package picked up</p>
//                 <span className="text-xs text-gray-500">3 hours ago</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating DockAI Button */}
//       <button
//         onClick={() => setShowDockAI(!showDockAI)}
//         className="fixed bottom-6 right-6 w-14 h-14 bg-amazon-orange rounded-full flex items-center justify-center shadow-lg hover:bg-amazon text-white transition-colors"
//       >
//         <FaRobot className="text-2xl" />
//       </button>

//       {/* Notifications Popup */}
//       {showNotifications && (
//         <div className="absolute right-4 top-16 w-80 bg-white shadow-amazon rounded-lg p-4 z-50">
//           <h3 className="font-semibold mb-2">Notifications</h3>
//           <div className="space-y-2">
//             <div className="p-2 hover:bg-gray-50 rounded">
//               <p className="text-sm font-medium text-red-600">Important Policy Update</p>
//               <p className="text-sm">New export regulations for electronics goods</p>
//               <span className="text-xs text-gray-500">10 minutes ago</span>
//             </div>
//             <div className="p-2 hover:bg-gray-50 rounded">
//               <p className="text-sm">New shipment update available</p>
//               <span className="text-xs text-gray-500">5 minutes ago</span>
//             </div>
//             <div className="p-2 hover:bg-gray-50 rounded">
//               <p className="text-sm">Delivery completed for #SH12345</p>
//               <span className="text-xs text-gray-500">1 hour ago</span>
//             </div>
//             <div className="p-2 hover:bg-gray-50 rounded">
//               <p className="text-sm font-medium text-amber-600">Labelling Requirement Change</p>
//               <p className="text-sm">Updated guidelines for hazardous materials</p>
//               <span className="text-xs text-gray-500">2 hours ago</span>
//             </div>
//             <div className="p-2 hover:bg-gray-50 rounded">
//               <p className="text-sm font-medium text-blue-600">Customs Policy Update</p>
//               <p className="text-sm">New documentation required for EU exports</p>
//               <span className="text-xs text-gray-500">3 hours ago</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// "use client";
// import React, { useState } from "react";
// import { FaBox, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loginMethod, setLoginMethod] = useState('email');

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-2">
//             <FaBox className="text-amazon-orange text-3xl" />
//             <h1 className="text-3xl font-bold text-amazon">UniShip</h1>
//           </div>
//           <p className="text-gray-600">Shipping Management Solution</p>
//         </div>

//         <div className="bg-white p-8 rounded-lg shadow-amazon">
//           <div className="flex justify-center mb-6">
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className={`px-4 py-2 font-medium ${
//                   isLogin ? 'text-amazon border-b-2 border-amazon-orange' : 'text-gray-500'
//                 }`}
//               >
//                 Sign In
//               </button>
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className={`px-4 py-2 font-medium ${
//                   !isLogin ? 'text-amazon border-b-2 border-amazon-orange' : 'text-gray-500'
//                 }`}
//               >
//                 Create Account
//               </button>
//             </div>
//           </div>

//           <div className="mb-6">
//             <form className="space-y-4">
//               {isLogin && (
//                 <div className="flex justify-center mb-4">
//                   <div className="flex space-x-4">
//                     <button
//                       type="button"
//                       onClick={() => setLoginMethod('email')}
//                       className={`px-4 py-2 font-medium ${
//                         loginMethod === 'email' ? 'text-amazon border-b-2 border-amazon-orange' : 'text-gray-500'
//                       }`}
//                     >
//                       <div className="flex items-center space-x-2">
//                         <FaEnvelope />
//                         <span>Email</span>
//                       </div>
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setLoginMethod('phone')}
//                       className={`px-4 py-2 font-medium ${
//                         loginMethod === 'phone' ? 'text-amazon border-b-2 border-amazon-orange' : 'text-gray-500'
//                       }`}
//                     >
//                       <div className="flex items-center space-x-2">
//                         <FaPhone />
//                         <span>Phone</span>
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {(loginMethod === 'email' || !isLogin) && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     type="email"
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//               )}

//               {(loginMethod === 'phone' || !isLogin) && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
//                     placeholder="Enter your phone number"
//                     required
//                   />
//                 </div>
//               )}

//               {!isLogin && (
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     className="w-2/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
//                     placeholder="Enter verification code"
//                   />
//                   <button
//                     type="button"
//                     className="w-1/3 bg-amazon hover:bg-amazon-dark text-white py-2 rounded transition-colors"
//                   >
//                     Verify
//                   </button>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <input
//                   type="password"
//                   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
//                   placeholder="Enter your password"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-amazon-orange hover:bg-amazon text-white py-2 rounded transition-colors"
//               >
//                 {isLogin ? 'Sign In' : 'Create Account'}
//               </button>
//             </form>
//           </div>

//           {isLogin && (
//             <div className="text-center">
//               <a href="#" className="text-amazon hover:text-amazon-orange text-sm">
//                 Forgot your password?
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
"use client";
import {
  FaShippingFast,
  FaBox,
  FaHistory,
  FaChartLine,
  FaRobot,
  FaComments,
  // FaUser,
  FaBoxOpen,
  FaExchangeAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";

export default function CarrierAnalytics() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Same as main dashboard */}
      <div className="w-64 bg-amazon shadow-lg flex flex-col">
        <div className="p-4 flex items-center space-x-3">
          <FaBox className="text-amazon-orange text-2xl" />
          <h1 className="text-2xl font-bold text-white">UniShip</h1>
        </div>

        <nav className="flex-1 mt-6">
          <div className="px-4 space-y-1">
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaBox />
              <span>Pending Orders</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaExchangeAlt />
              <span>Returned Orders</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
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
            <div className="flex items-center space-x-2 p-2 bg-amazon-hover rounded text-amazon-orange">
              <FaChartLine />
              <span>Carrier Analytics</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaRobot />
              <span>DockAI</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
              <FaComments />
              <span>Chat</span>
            </div>
          </div>
        </nav>

        {/* Settings and Logout */}
        <div className="p-4 border-t border-amazon-hover">
          <div className="flex justify-between">
            <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
              <FaCog />
              <span>Settings</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm">
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 px-16">
        <h1 className="text-2xl font-bold text-amazon mb-6">
          Carrier Performance Analytics
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-10 rounded-lg shadow-amazon col-span-2">
            <h2 className="text-lg font-medium text-amazon mb-4">
              Carrier Ranking
            </h2>
            <div className="aspect-[2/1] relative bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/images/carrier-analytics/carrier-ranking.jpg"
                alt="Cost Comparison Graph"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {/* Carrier Ranking Graph */}
          <div className="bg-white p-6 rounded-lg shadow-amazon">
            <h2 className="text-lg font-medium text-amazon mb-4">
              Cost per Unit Weight Comparison
            </h2>
            <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/images/carrier-analytics/cost-comparison.jpg"
                alt="Carrier Ranking Graph"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {/* On-Time Delivery */}
          <div className="bg-white p-6 rounded-lg shadow-amazon">
            <h2 className="text-lg font-medium text-amazon mb-4">
              On-Time Delivery Performance
            </h2>
            <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/images/carrier-analytics/on-time-delivery.jpg"
                alt="On-Time Delivery Graph"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {/* Average Delivery Time */}
          <div className="bg-white p-6 rounded-lg shadow-amazon">
            <h2 className="text-lg font-medium text-amazon mb-4">
              Average Delivery Time
            </h2>
            <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/images/carrier-analytics/avg-delivery-time.jpg"
                alt="Average Delivery Time Graph"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {/* Cost Efficiency */}
          <div className="bg-white p-6 rounded-lg shadow-amazon">
            <h2 className="text-lg font-medium text-amazon mb-4">
              Cost Efficiency
            </h2>
            <div className="aspect-video relative bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src="/images/carrier-analytics/cost-efficiency.jpg"
                alt="Cost Efficiency Graph"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
