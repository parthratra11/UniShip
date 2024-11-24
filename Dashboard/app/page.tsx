"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

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
  FaCog,
  FaSignOutAlt,
  FaPaperPlane,
  FaWarehouse,
  FaTruck,
  FaUserTie,
  FaUsers,
  FaPlus,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDockAI, setShowDockAI] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const [messages, setMessages] = useState({
    carrier: [],
    warehouse: [],
    poc: [],
    others: [],
  });
  const [newMessage, setNewMessage] = useState("");
  const [dockAIMessages, setDockAIMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm DockAI, your intelligent shipping assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [newDockAIMessage, setNewDockAIMessage] = useState("");

  const contacts = [
    {
      id: "carrier",
      name: "Carrier Support",
      icon: <FaTruck />,
      lastMessage: "Click to start messaging",
      time: "",
    },
    {
      id: "warehouse",
      name: "Warehouse Manager",
      icon: <FaWarehouse />,
      lastMessage: "Click to start messaging",
      time: "",
    },
    {
      id: "poc",
      name: "Point of Contact",
      icon: <FaUserTie />,
      lastMessage: "Click to start messaging",
      time: "",
    },
    {
      id: "others",
      name: "Others",
      icon: <FaUsers />,
      lastMessage: "Click to start messaging",
      time: "",
    },
  ];

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const newMsg = {
        sender: "user",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg],
      }));

      // Update last message for contact
      const contactIndex = contacts.findIndex((c) => c.id === selectedChat);
      if (contactIndex !== -1) {
        contacts[contactIndex].lastMessage = newMessage;
        contacts[contactIndex].time = newMsg.time;
      }

      setNewMessage("");
    }
  };

  const sendDockAIMessage = (e) => {
    e.preventDefault();
    if (newDockAIMessage.trim()) {
      const userMsg = {
        sender: "user",
        text: newDockAIMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setDockAIMessages((prev) => [...prev, userMsg]);

      // Simulate AI response
      setTimeout(() => {
        const botMsg = {
          sender: "bot",
          text: "I understand your query. Let me help you with that...",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setDockAIMessages((prev) => [...prev, botMsg]);
      }, 1000);

      setNewDockAIMessage("");
    }
  };

  // const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-amazon shadow-lg flex flex-col">
        <Link href="/">
          <div className="p-4 flex items-center space-x-3">
            <FaBox className="text-amazon-orange text-2xl" />
            <h1 className="text-2xl font-bold text-white">UniShip</h1>
          </div>
        </Link>

        <nav className="flex-1 mt-6">
          <div className="px-4 space-y-1">
            <Link href="/create-order">
              <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
                <FaPlus />
                <span>Create Order</span>
              </div>
            </Link>

            <Link href="/pending-orders">
              <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
                <FaBox />
                <span>Pending Orders</span>
              </div>
            </Link>

            <Link href="/returned-orders">
              <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
                <FaExchangeAlt />
                <span>Returned Orders</span>
              </div>
            </Link>

            <Link href="/track-order">
              <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
                <FaShippingFast className="text-gray-200" />
                <span>In Progress</span>
              </div>
            </Link>

            <Link href="/history">
              <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
                <FaHistory />
                <span>History</span>
              </div>
            </Link>

            <Link href="/products">
              <div className="flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded text-gray-200">
                <FaBoxOpen />
                <span>Products</span>
              </div>
            </Link>

            <div
              className={`flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded cursor-pointer ${
                showDockAI ? "bg-amazon-hover" : ""
              }`}
              onClick={() => setShowDockAI(true)}
            >
              <FaRobot
                className={showDockAI ? "text-amazon-orange" : "text-gray-200"}
              />
              <span
                className={showDockAI ? "text-amazon-orange" : "text-gray-200"}
              >
                DockAI
              </span>
            </div>
            <div
              className={`flex items-center space-x-2 p-2 hover:bg-amazon-hover rounded cursor-pointer ${
                showChat ? "text-amazon-orange" : "text-gray-200"
              }`}
              onClick={() => setShowChat(true)}
            >
              <FaComments
                className={showChat ? "text-amazon-orange" : "text-gray-200"}
              />
              <span>Chat</span>
            </div>
          </div>
        </nav>

        {/* Settings and Logout at Bottom */}
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
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-full"
              >
                <IoNotifications className="text-xl text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/user">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amazon-orange flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Smith</p>
                    <p className="text-xs text-gray-500">johnsmith@email.com</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Main Content Area */}
          <div className="flex-1 p-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
                <h3 className="text-amazon text-sm font-medium">
                  Total Shipments
                </h3>
                <div className="flex flex-col items-start my-2">
                  <span className="text-2xl font-bold text-amazon">1,234</span>
                  <span className="text-green-600 text-sm">
                    +9% vs last month
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
                <h3 className="text-amazon text-sm font-medium">Total Cost</h3>
                <div className="flex flex-col items-start my-2">
                  <span className="text-2xl font-bold text-amazon">
                    ₹34,566.23
                  </span>
                  <span className="text-red-600 text-sm">
                    -5% vs last month
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 hover:border-amazon-orange transition-colors">
                <h3 className="text-amazon text-sm font-medium">
                  Avg. Delivery Time
                </h3>
                <div className="flex flex-col items-start my-2">
                  <span className="text-2xl font-bold text-amazon">
                    12 days
                  </span>
                  <span className="text-green-600 text-sm">
                    -2 days vs last month
                  </span>
                </div>
              </div>
            </div>

            {/* Shipment Analytics */}
            <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-amazon">
                  Shipment Analytics
                </h2>
                <button
                  onClick={() => (window.location.href = "/detailed-analytics")}
                  className="text-amazon hover:text-amazon-orange transition-colors font-medium"
                >
                  View Detailed Analytics
                </button>
              </div>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FaChartLine className="text-4xl mx-auto mb-2" />
                  <p>Shipment Analytics Visualization</p>
                </div>
              </div>
            </div>

            {/* Carrier Analytics */}
            <div className="bg-white p-6 rounded-lg shadow-amazon border border-gray-200">
              <h2 className="text-lg font-medium text-amazon mb-4">
                Carrier Performance
              </h2>
              <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FaChartLine className="text-4xl mx-auto mb-2" />
                  <p>Carrier Analytics Chart</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Shipment Updates */}
          <div className="w-80 p-6 bg-white border-l border-gray-200">
            <h2 className="text-lg font-medium text-amazon mb-4">
              Recent Updates
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Shipment #SH12345</p>
                <p className="text-sm text-gray-600">Out for delivery</p>
                <span className="text-xs text-gray-500">5 minutes ago</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Shipment #SH12346</p>
                <p className="text-sm text-gray-600">
                  Arrived at sorting facility
                </p>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Shipment #SH12347</p>
                <p className="text-sm text-gray-600">
                  Customs clearance completed
                </p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Shipment #SH12348</p>
                <p className="text-sm text-gray-600">Package picked up</p>
                <span className="text-xs text-gray-500">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating DockAI Button */}
      <button
        onClick={() => setShowDockAI(!showDockAI)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-amazon-orange rounded-full flex items-center justify-center shadow-lg hover:bg-amazon text-white transition-colors"
      >
        <FaRobot className="text-2xl" />
      </button>

      {/* DockAI Chat Box */}
      {showDockAI && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-amazon overflow-hidden z-50">
          <div className="bg-amazon p-4 flex justify-between items-center">
            <h3 className="text-white font-medium flex items-center">
              <FaRobot className="mr-2" />
              DockAI Assistant
            </h3>
            <button
              onClick={() => setShowDockAI(false)}
              className="text-white hover:text-amazon-orange"
            >
              ×
            </button>
          </div>
          <div className="flex flex-col h-[500px]">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {dockAIMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.sender === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-amazon-orange text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-75">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={sendDockAIMessage}
              className="p-3 bg-white border-t"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newDockAIMessage}
                  onChange={(e) => setNewDockAIMessage(e.target.value)}
                  placeholder="Ask DockAI anything..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                />
                <button
                  type="submit"
                  className="bg-amazon-orange text-white p-2 rounded-full hover:bg-amazon transition-colors"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Style Chat Box */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-[500px] bg-white rounded-lg shadow-amazon overflow-hidden z-50">
          <div className="bg-amazon p-4 flex justify-between items-center">
            <h3 className="text-white font-medium flex items-center">
              <FaComments className="mr-2" />
              {selectedChat
                ? contacts.find((c) => c.id === selectedChat)?.name
                : "Messages"}
            </h3>
            <button
              onClick={() => {
                setShowChat(false);
                setSelectedChat(null);
              }}
              className="text-white hover:text-amazon-orange"
            >
              ×
            </button>
          </div>
          <div className="flex h-[500px]">
            {/* Contacts List */}
            <div
              className={`${
                selectedChat ? "hidden md:block" : ""
              } w-full md:w-1/3 border-r border-gray-200 overflow-y-auto`}
            >
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedChat(contact.id)}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedChat === contact.id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-amazon-orange flex items-center justify-center text-white">
                      {contact.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                    {contact.time && (
                      <span className="text-xs text-gray-400">
                        {contact.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Area */}
            {selectedChat ? (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {messages[selectedChat]?.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <p>
                        Start a conversation with{" "}
                        {contacts.find((c) => c.id === selectedChat)?.name}
                      </p>
                    </div>
                  ) : (
                    messages[selectedChat]?.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${
                          msg.sender === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`inline-block p-3 rounded-lg max-w-[80%] ${
                            msg.sender === "user"
                              ? "bg-amazon-orange text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <span className="text-xs opacity-75">{msg.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <form onSubmit={sendMessage} className="p-3 bg-white border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                    />
                    <button
                      type="submit"
                      className="bg-amazon-orange text-white p-2 rounded-full hover:bg-amazon transition-colors"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
                <p>Select a chat to continue messaging</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications Popup */}
      {showNotifications && (
        <div className="absolute right-4 top-16 w-80 bg-white shadow-amazon rounded-lg p-4 z-50">
          <h3 className="font-semibold mb-2">Notifications</h3>
          <div className="space-y-2">
            <div className="p-2 hover:bg-gray-50 rounded">
              <p className="text-sm font-medium text-red-600">
                Important Policy Update
              </p>
              <p className="text-sm">
                New export regulations for electronics goods
              </p>
              <span className="text-xs text-gray-500">10 minutes ago</span>
            </div>
            <div className="p-2 hover:bg-gray-50 rounded">
              <p className="text-sm">New shipment update available</p>
              <span className="text-xs text-gray-500">5 minutes ago</span>
            </div>
            <div className="p-2 hover:bg-gray-50 rounded">
              <p className="text-sm">Delivery completed for #SH12345</p>
              <span className="text-xs text-gray-500">1 hour ago</span>
            </div>
            <div className="p-2 hover:bg-gray-50 rounded">
              <p className="text-sm font-medium text-amber-600">
                Labelling Requirement Change
              </p>
              <p className="text-sm">
                Updated guidelines for hazardous materials
              </p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="p-2 hover:bg-gray-50 rounded">
              <p className="text-sm font-medium text-blue-600">
                Customs Policy Update
              </p>
              <p className="text-sm">
                New documentation required for EU exports
              </p>
              <span className="text-xs text-gray-500">3 hours ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
