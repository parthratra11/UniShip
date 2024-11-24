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
  FaUsers,
  FaUserTie,
  FaWarehouse,
  FaTruck,
  FaPaperPlane,
} from "react-icons/fa";

export default function ReturnedOrders() {
  // Filter cancelled orders from shipments data
  const returnedOrders = [
    {
      id: "1597534862",
      returnDate: "2024-11-23T12:00:00Z",
      orderDate: "2024-11-23T12:00:00Z",
      status: "Returned",
      refundAmount: 200,
      reason: "Order Cancelled",
      items: [
        {
          name: "Furniture",
          quantity: 1,
          price: 200,
          returnStatus: "Cancelled at Dallas, TX",
        },
      ],
    },
    {
      id: "3216549870",
      returnDate: "2024-11-22T18:00:00Z",
      orderDate: "2024-11-22T18:00:00Z",
      status: "Returned",
      refundAmount: 80,
      reason: "Order Cancelled",
      items: [
        {
          name: "Cosmetics",
          quantity: 1,
          price: 80,
          returnStatus: "Cancelled at Paris, France",
        },
      ],
    },
  ];

  const [showNotifications, setShowNotifications] = useState(false);
  setShowNotifications(false);
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
    <div className="flex h-screen">
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
      <div className="flex-1 min-h-screen bg-[#EAEDED] overflow-auto">
        <div className="mx-auto max-w-[1500px] px-4 py-8">
          <h1 className="mb-6 text-2xl font-medium text-[#232F3E]">
            Returned Orders
          </h1>

          {returnedOrders.map((order) => (
            <div
              key={order.id}
              className="mb-6 rounded-lg bg-white p-6 shadow-sm border border-[#D5D9D9] hover:border-[#007185]"
            >
              <div className="border-b border-[#D5D9D9] pb-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-[#565959]">RETURN DATE</p>
                    <p className="text-sm text-[#0F1111]">
                      {new Date(order.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#565959]">REFUND AMOUNT</p>
                    <p className="text-sm text-[#0F1111]">
                      ${order.refundAmount.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#565959]">RETURN REASON</p>
                    <p className="text-sm text-[#0F1111]">{order.reason}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#565959]">ORDER # {order.id}</p>
                    <button className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                      View return details
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-lg font-medium text-[#007185]">
                  {order.status}
                </h2>
                <p className="mt-1 text-sm text-[#565959]">
                  Original order date:{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>

                <div className="mt-4 space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="h-24 w-24 flex-shrink-0 bg-[#F7F8F8]"></div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-[#0F1111]">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-[#565959]">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm text-[#565959]">
                          Status: {item.returnStatus}
                        </p>
                        <button className="mt-2 text-sm text-[#007185] hover:text-[#C7511F] hover:underline">
                          Buy again
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#0F1111]">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="rounded-lg bg-[#FFD814] px-6 py-2 text-sm font-medium text-[#0F1111] hover:bg-[#F7CA00] shadow-sm">
                    Track return
                  </button>
                  <button className="rounded-lg border border-[#D5D9D9] px-6 py-2 text-sm font-medium text-[#0F1111] hover:bg-[#F7FAFA] shadow-sm">
                    Contact support
                  </button>
                </div>
              </div>
            </div>
          ))}

          {returnedOrders.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm border border-[#D5D9D9]">
              <h2 className="text-lg text-[#565959]">No returned orders</h2>
            </div>
          )}
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
