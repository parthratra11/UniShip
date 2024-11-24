"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import {
  FaArrowLeft,
  FaBox,
  FaBoxOpen,
  FaCog,
  FaComments,
  FaExchangeAlt,
  FaHistory,
  FaPaperPlane,
  FaPlus,
  FaRobot,
  FaShippingFast,
  FaSignOutAlt,
  FaTruck,
  FaUsers,
  FaUserTie,
  FaWarehouse,
} from "react-icons/fa";
import Link from "next/link";

interface TrackingEvent {
  status: string;
  timestamp: string;
  location: string;
}

interface TrackingData {
  tracking_number: string;
  carrier: string;
  status: string;
  tracking_history: TrackingEvent[];
  recipient: {
    name: string;
    address: string;
  };
  sender: {
    name: string;
    address: string;
  };
  shipment_details: {
    weight: string;
    dimensions: string;
    value: string;
    description: string;
  };
  delivery_confirmation: {
    signature: string;
    signed_at: string;
  };
  carrier_contact: {
    phone: string;
    email: string;
  };
}

export default function TrackingOrders() {
  const [trackingData, setTrackingData] = useState<TrackingData>({
    tracking_number: "DJ20242024",
    carrier: "UniShip",
    status: "ORDER_CREATED",
    tracking_history: [
      {
        status: "ORDER_CREATED",
        timestamp: new Date().toISOString(),
        location: "Mumbai, Maharashtra",
      },
    ],
    recipient: {
      name: "Customer",
      address: "Delivery Address",
    },
    sender: {
      name: "DenimHub",
      address: "Mumbai, Maharashtra",
    },
    shipment_details: {
      weight: "0.8kg",
      dimensions: "40x30x3 cm",
      value: "2000 INR",
      description: "Classic fit denim jeans - DenimHub DJ2024",
    },
    delivery_confirmation: {
      signature: "Pending",
      signed_at: "",
    },
    carrier_contact: {
      phone: "+91 1800 000 0000",
      email: "support@uniship.com",
    },
  });

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

  return (
    <div className="min-h-screen bg-[#EAEDED] flex">
      {/* Sidebar */}
      <div className="w-64 bg-amazon shadow-lg flex flex-col flex-shrink-0">
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
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-[#0F1111]">
            Track Your Shipment
          </h1>
          <Link
            href="/"
            className="flex items-center px-4 py-2 text-sm font-medium text-[#0F1111] bg-[#FFD814] rounded-lg hover:bg-[#F7CA00] border border-[#FCD200]"
          >
            <FaArrowLeft className="mr-2" />
            Back to Homepage
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-[#D5D9D9]">
          {/* Header Section */}
          <div className="border-b border-[#D5D9D9] p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-[#565959]">Tracking Number</p>
                <p className="text-lg font-medium text-[#0F1111]">
                  {trackingData.tracking_number}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#565959]">Carrier</p>
                <p className="text-lg font-medium text-[#0F1111]">
                  {trackingData.carrier.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#565959]">Status</p>
                <p className="text-lg font-medium text-[#007185]">
                  {trackingData.status.replace("_", " ")}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#565959]">Expected Delivery</p>
                <p className="text-lg font-medium text-[#0F1111]">
                  {new Date(
                    new Date().setDate(new Date().getDate() + 3)
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline and Product Info */}
          <div className="p-6 border-b border-[#D5D9D9] grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-medium mb-4 text-[#0F1111]">
                Tracking History
              </h2>
              <div className="space-y-6">
                {trackingData.tracking_history.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-[#FF9900] rounded-full"></div>
                      {index !== trackingData.tracking_history.length - 1 && (
                        <div className="w-0.5 h-16 bg-[#D5D9D9]"></div>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-[#0F1111]">
                        {event.status.replace("_", " ")}
                      </p>
                      <p className="text-sm text-[#565959]">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                      <p className="text-sm text-[#565959]">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4 text-[#0F1111]">
                Product Information
              </h2>
              <div className="bg-[#F7F8F8] rounded-lg p-4">
                <div className="w-full h-48 bg-white rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/jeans-image.jpg"
                    alt="Product"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-[#0F1111] mb-2">
                  {trackingData.shipment_details.description}
                </h3>
                <p className="text-sm text-[#565959] mb-2">
                  Classic fit denim jeans crafted from durable denim fabric.
                  Designed for comfort and style with a variety of color
                  options.
                </p>
                <p className="text-sm text-[#565959]">
                  Value: {trackingData.shipment_details.value}
                </p>
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-4 text-[#0F1111]">
                Shipment Details
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#565959]">Weight</p>
                  <p className="text-[#0F1111]">
                    {trackingData.shipment_details.weight}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#565959]">Dimensions</p>
                  <p className="text-[#0F1111]">
                    {trackingData.shipment_details.dimensions}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#565959]">Value</p>
                  <p className="text-[#0F1111]">
                    {trackingData.shipment_details.value}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#565959]">Description</p>
                  <p className="text-[#0F1111]">
                    {trackingData.shipment_details.description}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4 text-[#0F1111]">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#565959]">Sender</p>
                  <p className="text-[#0F1111]">{trackingData.sender.name}</p>
                  <p className="text-sm text-[#565959]">
                    {trackingData.sender.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#565959]">Recipient</p>
                  <p className="text-[#0F1111]">
                    {trackingData.recipient.name}
                  </p>
                  <p className="text-sm text-[#565959]">
                    {trackingData.recipient.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#565959]">Carrier Contact</p>
                  <p className="text-[#0F1111]">
                    {trackingData.carrier_contact.phone}
                  </p>
                  <p className="text-sm text-[#565959]">
                    {trackingData.carrier_contact.email}
                  </p>
                </div>
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
