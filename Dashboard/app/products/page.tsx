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
  FaUsers,
  FaUserTie,
  FaWarehouse,
  FaTruck,
  FaPlus,
  FaPaperPlane,
} from "react-icons/fa";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock data - replace with actual API call
  const products = [
    {
      id: "1",
      name: "Cotton T-Shirt",
      sku: "TS1001",
      price: 1000,
      stock: 100,
      category: "Apparel",
      status: "In Stock",
      lastUpdated: "2024-01-01",
      brand: "StyleWear",
      description:
        "A comfortable and stylish 100% cotton T-shirt available in multiple colors and sizes. Perfect for casual wear.",
    },
    {
      id: "2",
      name: "Denim Jeans",
      sku: "DJ2024",
      price: 2000,
      stock: 50,
      category: "Apparel",
      status: "In Stock",
      lastUpdated: "2024-02-15",
      brand: "DenimHub",
      description:
        "Classic fit denim jeans crafted from durable denim fabric. Designed for comfort and style with a variety of color options.",
    },
    {
      id: "3",
      name: "Baseball Cap",
      sku: "BC500",
      price: 500,
      stock: 200,
      category: "Accessories",
      status: "In Stock",
      lastUpdated: "2024-03-10",
      brand: "CapMasters",
      description:
        "A trendy cotton baseball cap to complement your casual look. Available in various colors with an adjustable fit.",
    },
    {
      id: "4",
      name: "Wooden Table",
      sku: "WT2024",
      price: 5000,
      stock: 10,
      category: "Furniture",
      status: "Low Stock",
      lastUpdated: "2024-03-01",
      brand: "HomeDeco",
      description:
        "A premium wooden table designed for your home or office, offering durability and style with fine craftsmanship.",
    },
    {
      id: "5",
      name: "Office Chair",
      sku: "OC303",
      price: 3000,
      stock: 0,
      category: "Furniture",
      status: "Out of Stock",
      lastUpdated: "2024-04-01",
      brand: "WorkEase",
      description:
        "An ergonomic office chair designed for comfort and productivity with adjustable features and durable materials.",
    },
  ];

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
    <div className="flex min-h-screen bg-[#EAEDED]">
      {/* Left Sidebar */}
      <div className="w-48 bg-amazon shadow-lg flex flex-col">
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

      <div className="flex-1">
        <div className="mx-auto max-w-[1500px] px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-medium text-[#232F3E]">
              Your Products
            </h1>
            <button className="rounded-lg bg-[#FFD814] px-6 py-2 text-sm font-medium text-[#0F1111] hover:bg-[#F7CA00] shadow-sm">
              Add New Product
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow-sm border border-[#D5D9D9]">
              <p className="text-sm text-[#565959]">Total Products</p>
              <p className="text-2xl font-medium text-[#0F1111]">
                {products.length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm border border-[#D5D9D9]">
              <p className="text-sm text-[#565959]">Low Stock Items</p>
              <p className="text-2xl font-medium text-[#0F1111]">
                {products.filter((p) => p.status === "Low Stock").length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm border border-[#D5D9D9]">
              <p className="text-sm text-[#565959]">Out of Stock</p>
              <p className="text-2xl font-medium text-[#0F1111]">
                {products.filter((p) => p.status === "Out of Stock").length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm border border-[#D5D9D9]">
              <p className="text-sm text-[#565959]">Categories</p>
              <p className="text-2xl font-medium text-[#0F1111]">
                {new Set(products.map((p) => p.category)).size}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-sm border border-[#D5D9D9]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F7F8F8]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[20%]">
                      PRODUCT NAME
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[10%]">
                      SKU
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[10%]">
                      PRICE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[8%]">
                      STOCK
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[12%]">
                      CATEGORY
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[15%]">
                      STATUS
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[10%]">
                      LAST UPDATED
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#565959] w-[15%]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D5D9D9]">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-[#F7FAFA]">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-[#F7F8F8]"></div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#0F1111]">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0F1111]">
                        {product.sku}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0F1111]">
                        ₹{product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0F1111]">
                        {product.stock}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0F1111]">
                        {product.category}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${
                            product.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : product.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#0F1111]">
                        {new Date(product.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button className="text-[#007185] hover:text-[#C7511F] hover:underline">
                          Edit
                        </button>
                        <span className="mx-2 text-[#D5D9D9]">|</span>
                        <button className="text-[#007185] hover:text-[#C7511F] hover:underline">
                          Delete
                        </button>
                        <span className="mx-2 text-[#D5D9D9]">|</span>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-[#007185] hover:text-[#C7511F] hover:underline"
                        >
                          View Customs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {products.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm border border-[#D5D9D9]">
              <h2 className="text-lg text-[#565959]">No products found</h2>
            </div>
          )}

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

          {/* Customs Requirement Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-[#232F3E]">
                    Customs Requirements for {selectedProduct.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-[#565959] hover:text-[#232F3E]"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#565959]">Product Details</p>
                    <p className="text-sm">SKU: {selectedProduct.sku}</p>
                    <p className="text-sm">
                      Category: {selectedProduct.category}
                    </p>
                    <p className="text-sm">Brand: {selectedProduct.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#565959]">Required Documents</p>
                    <ul className="list-disc list-inside text-sm">
                      <li>Commercial Invoice</li>
                      <li>Packing List</li>
                      <li>Certificate of Origin</li>
                      <li>Bill of Lading</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-[#565959]">
                      Import Duties & Taxes
                    </p>
                    <p className="text-sm">• Basic Customs Duty (BCD): 18%</p>
                    <p className="text-sm">
                      • Goods and Services Tax (GST): 12%
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="bg-[#FFD814] px-6 py-2 rounded-lg text-sm font-medium text-[#0F1111] hover:bg-[#F7CA00]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
