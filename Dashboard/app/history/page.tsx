"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaBox,
  FaExchangeAlt,
  FaShippingFast,
  FaHistory,
  FaBoxOpen,
  FaRobot,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaTruck,
  FaWarehouse,
  FaUserTie,
  FaUsers,
  FaPaperPlane,
} from "react-icons/fa";

export default function History() {
  const [timeFilter, setTimeFilter] = useState("last30days");

  const shipments = {
    shipments: [
      {
        tracking_number: "1234567890",
        carrier: "fedex",
        status: "DELIVERED",
        tracking_history: [
          {
            status: "PICKED_UP",
            timestamp: "2024-11-20T10:00:00Z",
            location: "New York, NY",
          },
          {
            status: "IN_TRANSIT",
            timestamp: "2024-11-22T15:00:00Z",
            location: "Chicago, IL",
          },
          {
            status: "DELIVERED",
            timestamp: "2024-11-23T14:30:00Z",
            location: "San Francisco, CA",
          },
        ],
        recipient: {
          name: "John Doe",
          address: "789 Delivery St., San Francisco, CA",
        },
        sender: { name: "Jane Smith", address: "123 Sender Rd., New York, NY" },
        shipment_details: {
          weight: "2kg",
          dimensions: "30x20x15 cm",
          value: "$50",
          description: "Laptop",
        },
        delivery_confirmation: {
          signature: "John Doe",
          signed_at: "2024-11-23T14:30:00Z",
        },
        carrier_contact: {
          phone: "+1 800 123 4567",
          email: "support@fedex.com",
        },
      },
      {
        tracking_number: "9876543210",
        carrier: "ups",
        status: "IN_TRANSIT",
        tracking_history: [
          {
            status: "PICKED_UP",
            timestamp: "2024-11-21T11:00:00Z",
            location: "Los Angeles, CA",
          },
          {
            status: "IN_TRANSIT",
            timestamp: "2024-11-23T09:00:00Z",
            location: "Houston, TX",
          },
        ],
        recipient: {
          name: "Alice Cooper",
          address: "456 Customer St., Houston, TX",
        },
        sender: {
          name: "Bob Brown",
          address: "890 Sender Ave., Los Angeles, CA",
        },
        shipment_details: {
          weight: "5kg",
          dimensions: "40x30x20 cm",
          value: "$150",
          description: "Books and Stationery",
        },
        delivery_confirmation: { signature: "N/A", signed_at: "N/A" },
        carrier_contact: { phone: "+1 800 654 3210", email: "support@ups.com" },
      },
      {
        tracking_number: "2468135790",
        carrier: "usps",
        status: "OUT_FOR_DELIVERY",
        tracking_history: [
          {
            status: "PICKED_UP",
            timestamp: "2024-11-19T08:30:00Z",
            location: "Miami, FL",
          },
          {
            status: "IN_TRANSIT",
            timestamp: "2024-11-21T10:00:00Z",
            location: "Atlanta, GA",
          },
          {
            status: "OUT_FOR_DELIVERY",
            timestamp: "2024-11-23T07:00:00Z",
            location: "Tampa, FL",
          },
        ],
        recipient: {
          name: "George Martin",
          address: "123 Customer Blvd, Tampa, FL",
        },
        sender: { name: "Rachel Green", address: "456 Sender Ln, Miami, FL" },
        shipment_details: {
          weight: "1kg",
          dimensions: "20x15x10 cm",
          value: "$25",
          description: "Clothes",
        },
        delivery_confirmation: { signature: "N/A", signed_at: "N/A" },
        carrier_contact: {
          phone: "+1 800 222 1811",
          email: "support@usps.com",
        },
      },
      {
        tracking_number: "1122334455",
        carrier: "dhl",
        status: "DELIVERED",
        tracking_history: [
          {
            status: "PICKED_UP",
            timestamp: "2024-11-19T12:30:00Z",
            location: "Berlin, Germany",
          },
          {
            status: "IN_TRANSIT",
            timestamp: "2024-11-20T15:30:00Z",
            location: "Paris, France",
          },
          {
            status: "DELIVERED",
            timestamp: "2024-11-22T13:00:00Z",
            location: "London, UK",
          },
        ],
        recipient: {
          name: "Liam Brown",
          address: "987 Recipient St., London, UK",
        },
        sender: {
          name: "Eva White",
          address: "123 Sender Rd., Berlin, Germany",
        },
        shipment_details: {
          weight: "3kg",
          dimensions: "50x40x25 cm",
          value: "$100",
          description: "Electronics",
        },
        delivery_confirmation: {
          signature: "Liam Brown",
          signed_at: "2024-11-22T13:05:00Z",
        },
        carrier_contact: {
          phone: "+44 800 800 8000",
          email: "support@dhl.com",
        },
      },
      {
        tracking_number: "5678901234",
        carrier: "fedex",
        status: "PENDING",
        tracking_history: [
          {
            status: "CREATED",
            timestamp: "2024-11-23T10:00:00Z",
            location: "Los Angeles, CA",
          },
        ],
        recipient: {
          name: "Eleanor Rigby",
          address: "123 Main St, San Diego, CA",
        },
        sender: {
          name: "Paul McCartney",
          address: "456 Park Ave, Los Angeles, CA",
        },
        shipment_details: {
          weight: "4kg",
          dimensions: "35x25x20 cm",
          value: "$75",
          description: "Guitar",
        },
        delivery_confirmation: { signature: "N/A", signed_at: "N/A" },
        carrier_contact: {
          phone: "+1 800 123 4567",
          email: "support@fedex.com",
        },
      },
      {
        tracking_number: "1597534862",
        carrier: "ups",
        status: "CANCELLED",
        tracking_history: [
          {
            status: "CANCELLED",
            timestamp: "2024-11-23T12:00:00Z",
            location: "Dallas, TX",
          },
        ],
        recipient: {
          name: "Samantha Black",
          address: "456 Green Ave, Dallas, TX",
        },
        sender: { name: "Tom White", address: "789 Oak Rd, Austin, TX" },
        shipment_details: {
          weight: "8kg",
          dimensions: "60x50x40 cm",
          value: "$200",
          description: "Furniture",
        },
        delivery_confirmation: { signature: "N/A", signed_at: "N/A" },
        carrier_contact: { phone: "+1 800 555 1234", email: "support@ups.com" },
      },
      {
        tracking_number: "8527419630",
        carrier: "fedex",
        status: "DELIVERED",
        tracking_history: [
          {
            status: "PICKED_UP",
            timestamp: "2024-11-21T14:30:00Z",
            location: "Chicago, IL",
          },
          {
            status: "IN_TRANSIT",
            timestamp: "2024-11-22T10:00:00Z",
            location: "Denver, CO",
          },
          {
            status: "DELIVERED",
            timestamp: "2024-11-23T09:30:00Z",
            location: "Seattle, WA",
          },
        ],
        recipient: {
          name: "Sophia Blue",
          address: "789 Water St., Seattle, WA",
        },
        sender: { name: "David Red", address: "123 Pine St., Chicago, IL" },
        shipment_details: {
          weight: "6kg",
          dimensions: "45x35x20 cm",
          value: "$120",
          description: "Toys",
        },
        delivery_confirmation: {
          signature: "Sophia Blue",
          signed_at: "2024-11-23T09:35:00Z",
        },
        carrier_contact: {
          phone: "+1 800 123 4567",
          email: "support@fedex.com",
        },
      },
      {
        tracking_number: "3216549870",
        carrier: "dhl",
        status: "CANCELLED",
        tracking_history: [
          {
            status: "CANCELLED",
            timestamp: "2024-11-22T18:00:00Z",
            location: "Paris, France",
          },
        ],
        recipient: {
          name: "Isabella White",
          address: "456 Moon St., Paris, France",
        },
        sender: { name: "Jack Green", address: "789 Hill Rd, Berlin, Germany" },
        shipment_details: {
          weight: "3kg",
          dimensions: "30x20x15 cm",
          value: "$80",
          description: "Cosmetics",
        },
        delivery_confirmation: { signature: "N/A", signed_at: "N/A" },
        carrier_contact: { phone: "+33 800 100 200", email: "support@dhl.com" },
      },
      {
        tracking_number: "7418529630",
        carrier: "ups",
        status: "IN_TRANSIT",
        tracking_history: [
          {
            status: "PICKED_UP",
            timestamp: "2024-11-23T08:00:00Z",
            location: "San Francisco, CA",
          },
          {
            status: "IN_TRANSIT",
            timestamp: "2024-11-23T13:00:00Z",
            location: "Salt Lake City, UT",
          },
        ],
        recipient: {
          name: "Olivia Red",
          address: "987 Blue St., Salt Lake City, UT",
        },
        sender: {
          name: "Mason Black",
          address: "456 Redwood Ave, San Francisco, CA",
        },
        shipment_details: {
          weight: "7kg",
          dimensions: "55x45x25 cm",
          value: "$160",
          description: "Outdoor Gear",
        },
        delivery_confirmation: { signature: "N/A", signed_at: "N/A" },
        carrier_contact: { phone: "+1 800 987 6543", email: "support@ups.com" },
      },
      {
        tracking_number: "9632587410",
        carrier: "usps",
        status: "DELIVERED",
        tracking_history: [
          {
            status: "PICKED_UP",
            timestamp: "2024-11-20T16:00:00Z",
            location: "Orlando, FL",
          },
          {
            status: "IN_TRANSIT",
            timestamp: "2024-11-21T08:00:00Z",
            location: "Jacksonville, FL",
          },
          {
            status: "DELIVERED",
            timestamp: "2024-11-23T09:00:00Z",
            location: "Tallahassee, FL",
          },
        ],
        recipient: {
          name: "Emma Green",
          address: "123 Green St., Tallahassee, FL",
        },
        sender: {
          name: "Oliver Black",
          address: "456 Sunset Blvd, Orlando, FL",
        },
        shipment_details: {
          weight: "4kg",
          dimensions: "50x35x25 cm",
          value: "$100",
          description: "Office Supplies",
        },
        delivery_confirmation: {
          signature: "Emma Green",
          signed_at: "2024-11-23T09:05:00Z",
        },
        carrier_contact: {
          phone: "+1 800 333 4444",
          email: "support@usps.com",
        },
      },
    ],
  };

  const [showNotifications, setShowNotifications] = useState(false);
  setShowNotifications(showNotifications);
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
    <div className="flex h-screen overflow-hidden">
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

      <div className="flex-1 container mx-auto max-w-7xl py-16 px-4 bg-[#EAEDED] overflow-y-auto">
        <div className="mb-16">
          <h1 className="mb-8 text-3xl font-bold text-[#232F3E]">
            Your Orders
          </h1>

          <div className="min-w-[200px]">
            <label className="block text-sm font-medium text-[#232F3E]">
              Time Period
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-[#D5D9D9] bg-white shadow-sm focus:border-[#FF9900] focus:ring-[#FF9900]"
            >
              <option value="last30days">Last 30 days</option>
              <option value="last3months">Last 3 months</option>
              <option value="last6months">Last 6 months</option>
              <option value="thisyear">This year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shipments.shipments.map((shipment) => (
            <div
              key={shipment.tracking_number}
              className="rounded-lg bg-white p-6 shadow hover:shadow-lg hover:cursor-pointer border border-[#D5D9D9]"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-[#232F3E]">
                      {shipment.tracking_number}
                    </h2>
                    <span className="text-sm font-medium uppercase text-[#565959]">
                      {shipment.carrier}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 text-[#565959]">📅</span>
                      <span className="text-sm text-[#565959]">
                        {new Date(
                          shipment.tracking_history[0].timestamp
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        shipment.status === "DELIVERED"
                          ? "bg-green-100 text-green-800"
                          : shipment.status === "IN_TRANSIT"
                          ? "bg-blue-100 text-blue-800"
                          : shipment.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : shipment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {shipment.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#565959] font-medium">
                    Recipient
                  </p>
                  <p className="text-sm text-[#232F3E]">
                    {shipment.recipient.name}
                  </p>
                  <p className="text-sm text-[#565959]">
                    {shipment.recipient.address}
                  </p>
                </div>
                <div>
                  <hr className="my-3 border-[#D5D9D9]" />
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-[#565959]">
                        Weight: {shipment.shipment_details.weight}
                      </p>
                      <p className="text-[#565959]">
                        Value: {shipment.shipment_details.value}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#565959]">
                        {shipment.shipment_details.description}
                      </p>
                      <p className="text-[#565959]">
                        {shipment.shipment_details.dimensions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                            <span className="text-xs opacity-75">
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <form
                    onSubmit={sendMessage}
                    className="p-3 bg-white border-t"
                  >
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

        {shipments.shipments.length === 0 && (
          <div className="rounded-lg bg-white p-16 text-center shadow border border-[#D5D9D9]">
            <h2 className="text-xl text-[#565959]">
              No orders found for this period
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
