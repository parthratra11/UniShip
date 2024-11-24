"use client";

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
  FaTruck,
  FaStar,
  FaTimes,
  FaChartLine,
  FaBalanceScale,
  FaPlus,
  FaWarehouse,
  FaUserTie,
  FaUsers,
  FaPaperPlane,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateShipment() {
  const router = useRouter();
  const [rates, setRates] = useState([
    {
      carrier: "DHL",
      service: "Standard",
      rate: 8279.18,
      delivery_time: "3 to 5 business days",
      recommended: false,
      details: {
        rating: 3.5,
        totalShipments: 15243,
        onTimeDelivery: "40%",
        customerSatisfaction: "65%",
        recentReviews: [
          {
            user: "John D.",
            rating: 3,
            comment: "Frequent delays but good tracking",
          },
          {
            user: "Sarah M.",
            rating: 4,
            comment: "Service could be better",
          },
        ],
        analytics: {
          lastMonth: {
            deliveredOnTime: 40,
            delayed: 60,
            avgDeliveryTime: 4.6,
            expectedDeliveryTime: 4.0,
            timeDifference: 0.6,
          },
        },
      },
    },
    {
      carrier: "DHL",
      service: "Economy",
      rate: 6820.09,
      delivery_time: "6 to 10 business days",
      recommended: false,
      details: {
        rating: 3.0,
        totalShipments: 12567,
        onTimeDelivery: "20%",
        customerSatisfaction: "55%",
        recentReviews: [
          { user: "Mike R.", rating: 2, comment: "Frequent delays" },
          {
            user: "Lisa K.",
            rating: 3,
            comment: "Good tracking but slow delivery",
          },
        ],
        analytics: {
          lastMonth: {
            deliveredOnTime: 20,
            delayed: 80,
            avgDeliveryTime: 8.0,
            expectedDeliveryTime: 8.0,
            timeDifference: 0.0,
          },
        },
      },
    },
    {
      carrier: "DHL",
      service: "Express",
      rate: 6334.09,
      delivery_time: "3 business days (by 11:59 PM)",
      recommended: true,
      details: {
        rating: 4.5,
        totalShipments: 18432,
        onTimeDelivery: "75%",
        customerSatisfaction: "88%",
        recentReviews: [
          { user: "James B.", rating: 5, comment: "Fast and reliable service" },
          { user: "Emma T.", rating: 4, comment: "Consistent delivery times" },
        ],
        analytics: {
          lastMonth: {
            deliveredOnTime: 75,
            delayed: 25,
            avgDeliveryTime: 3.0,
            expectedDeliveryTime: 3.0,
            timeDifference: 0.0,
          },
        },
      },
    },
  ]);
  setRates(rates);

  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  setActiveChatIndex(null);
  const [carrierMessages, setCarrierMessages] = useState<{
    [key: number]: { text: string; sender: string }[];
  }>({});
  const [activeCarrierDetails, setActiveCarrierDetails] = useState<
    number | null
  >(null);
  const [hoveredCarrier, setHoveredCarrier] = useState<number | null>(null);
  const [showDockAINegotiation, setShowDockAINegotiation] = useState(false);
  const [negotiatingRateIndex, setNegotiatingRateIndex] = useState<
    number | null
  >(null);

  const handleRateSelection = (index: number) => {
    setSelectedRate(index);
  };

  const toggleChat = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNegotiatingRateIndex(index);
    setShowDockAINegotiation(true);

    // Calculate suggested discount based on performance metrics
    const rate = rates[index];
    const performanceScore =
      (Number(rate.details.onTimeDelivery.replace("%", "")) +
        Number(rate.details.customerSatisfaction.replace("%", ""))) /
      200; // Normalize to 0-1

    const suggestedDiscount = performanceScore > 0.8 ? 5 : 10; // Higher discount for lower performance
    const discountedRate = rate.rate * (1 - suggestedDiscount / 100);

    const initialAIMessage = {
      sender: "bot",
      text: `Based on my analysis of current market rates and ${
        rate.carrier
      }'s performance metrics:

- On-time Delivery: ${rate.details.onTimeDelivery}
- Customer Satisfaction: ${rate.details.customerSatisfaction}
- Recent Performance Score: ${(performanceScore * 100).toFixed(1)}%

I suggest negotiating for a ${suggestedDiscount}% discount, bringing the rate to ₹${discountedRate.toFixed(
        2
      )}.

Would you like me to help draft a negotiation message?`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setCarrierMessages({
      ...carrierMessages,
      [index]: [initialAIMessage],
    });
  };

  const handlecarrierMessagesend = (index: number, message: string) => {
    if (message.trim()) {
      const updatedcarrierMessages = {
        ...carrierMessages,
        [index]: [
          ...(carrierMessages[index] || []),
          { text: message, sender: "user" },
        ],
      };
      setCarrierMessages(updatedcarrierMessages);
    }
  };

  const toggleCarrierDetails = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCarrierDetails(activeCarrierDetails === index ? null : index);
  };

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
    <div className="flex min-h-screen">
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
      <div className="flex-1 bg-[#EAEDED]">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium text-[#232F3E]">
              Available Shipping Rates
            </h1>
            <button
              onClick={() => router.push("/carrier-analytics")}
              className="flex items-center space-x-2 bg-[#232F3E] text-white px-4 py-2 rounded-lg hover:bg-[#37475A] transition-colors"
            >
              <FaBalanceScale />
              <span>Compare Carriers</span>
            </button>
          </div>

          <div className="space-y-4">
            {rates.map((rate, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm border p-6 relative transition-colors cursor-pointer
                  ${
                    selectedRate === index
                      ? "border-[#007185] ring-2 ring-[#007185]"
                      : "border-[#D5D9D9] hover:border-[#007185]"
                  }`}
                onClick={() => handleRateSelection(index)}
              >
                {rate.recommended && (
                  <div className="absolute -top-3 left-4 bg-[#FF9900] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FaStar className="mr-1" />
                    Recommended
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#F7F8F8] rounded-lg">
                      <FaTruck className="text-2xl text-[#232F3E]" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-medium text-[#0F1111] hover:text-[#007185] cursor-pointer relative"
                        onClick={(e) => toggleCarrierDetails(index, e)}
                        onMouseEnter={() => setHoveredCarrier(index)}
                        onMouseLeave={() => setHoveredCarrier(null)}
                      >
                        {rate.carrier}

                        {/* Hover Popup */}
                        {hoveredCarrier === index && !activeCarrierDetails && (
                          <div className="absolute z-20 left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">
                                {rate.carrier}
                              </span>
                              <div className="flex items-center">
                                <FaStar className="text-[#FF9900] mr-1" />
                                <span>{rate.details.rating}/5</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>
                                On-time Delivery: {rate.details.onTimeDelivery}
                              </p>
                              <p>
                                Customer Satisfaction:{" "}
                                {rate.details.customerSatisfaction}
                              </p>
                            </div>
                          </div>
                        )}
                      </h3>
                      <p className="text-[#565959]">{rate.service}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-medium text-[#0F1111]">
                      ₹{rate.rate.toFixed(2)}
                    </p>
                    <p className="text-sm text-[#565959]">
                      {rate.delivery_time}
                    </p>
                  </div>
                </div>

                {/* Detailed Carrier Modal */}
                {activeCarrierDetails === index && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                    onClick={(e) => toggleCarrierDetails(index, e)}
                  >
                    <div
                      className="bg-white rounded-lg w-[800px] max-h-[80vh] overflow-y-auto p-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-medium">
                          {rate.carrier} Details
                        </h2>
                        <button
                          onClick={(e) => toggleCarrierDetails(index, e)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Performance Metrics
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-600">
                                Total Shipments
                              </p>
                              <p className="text-xl font-medium">
                                {rate.details.totalShipments.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                On-time Delivery
                              </p>
                              <p className="text-xl font-medium">
                                {rate.details.onTimeDelivery}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Customer Satisfaction
                              </p>
                              <p className="text-xl font-medium">
                                {rate.details.customerSatisfaction}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            Last Month Analytics
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <FaChartLine className="text-green-500 mr-2" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Delivered On Time
                                </p>
                                <p className="text-xl font-medium">
                                  {
                                    rate.details.analytics.lastMonth
                                      .deliveredOnTime
                                  }
                                  %
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Average Delivery Time
                              </p>
                              <p className="text-xl font-medium">
                                {
                                  rate.details.analytics.lastMonth
                                    .avgDeliveryTime
                                }{" "}
                                days
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Expected Delivery Time
                              </p>
                              <p className="text-xl font-medium">
                                {
                                  rate.details.analytics.lastMonth
                                    .expectedDeliveryTime
                                }{" "}
                                days
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Recent Reviews
                        </h3>
                        <div className="space-y-4">
                          {rate.details.recentReviews.map((review, i) => (
                            <div key={i} className="border-b pb-4">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {review.user}
                                </span>
                                <div className="flex items-center">
                                  <FaStar className="text-[#FF9900] mr-1" />
                                  <span>{review.rating}/5</span>
                                </div>
                              </div>
                              <p className="mt-2 text-gray-600">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 mt-4">
                  <button
                    className={`flex-1 font-medium py-2 rounded-lg transition-colors
                      ${
                        selectedRate === index
                          ? "bg-[#F7CA00] text-[#0F1111]"
                          : "bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111]"
                      }`}
                  >
                    {selectedRate === index ? "Selected" : "Select Rate"}
                  </button>

                  <button
                    onClick={(e) => toggleChat(index, e)}
                    className="flex items-center px-4 py-2 bg-[#232F3E] text-white rounded-lg hover:bg-[#37475A] transition-colors"
                  >
                    <FaComments className="mr-2" />
                    Negotiate Rate
                  </button>
                </div>

                {/* DockAI Negotiation Popup */}
                {showDockAINegotiation && negotiatingRateIndex === index && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                    onClick={() => setShowDockAINegotiation(false)}
                  >
                    <div
                      className="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="bg-amazon p-4 flex justify-between items-center">
                        <h3 className="text-white font-medium flex items-center">
                          <FaRobot className="mr-2" />
                          DockAI Rate Negotiation Assistant
                        </h3>
                        <button
                          onClick={() => setShowDockAINegotiation(false)}
                          className="text-white hover:text-amazon-orange"
                        >
                          <FaTimes />
                        </button>
                      </div>

                      <div className="flex flex-col h-[400px]">
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                          {carrierMessages[index]?.map((msg, i) => (
                            <div
                              key={i}
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
                                <p className="text-sm whitespace-pre-line">
                                  {msg.text}
                                </p>
                                <span className="text-xs opacity-75">
                                  {msg.time}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const input = e.currentTarget.elements.namedItem(
                              "message"
                            ) as HTMLInputElement;
                            handlecarrierMessagesend(index, input.value);
                            input.value = "";
                          }}
                          className="p-3 bg-white border-t"
                        >
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              name="message"
                              placeholder="Type your message..."
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
                  </div>
                )}

                {activeChatIndex === index && !showDockAINegotiation && (
                  <div
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-10 p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Chat with {rate.carrier}</h4>
                      <button
                        onClick={(e) => toggleChat(index, e)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>

                    <div className="h-48 overflow-y-auto mb-3 border rounded p-2">
                      {carrierMessages[index]?.map((msg, i) => (
                        <div
                          key={i}
                          className={`mb-2 p-2 rounded ${
                            msg.sender === "user"
                              ? "bg-blue-100 ml-auto max-w-[80%]"
                              : "bg-gray-100 mr-auto max-w-[80%]"
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem(
                          "message"
                        ) as HTMLInputElement;
                        handlecarrierMessagesend(index, input.value);
                        input.value = "";
                      }}
                      className="flex space-x-2"
                    >
                      <input
                        type="text"
                        name="message"
                        className="flex-1 border rounded px-2 py-1"
                        placeholder="Type your message..."
                      />
                      <button
                        type="submit"
                        className="bg-[#232F3E] text-white px-3 py-1 rounded hover:bg-[#37475A]"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}

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
                              {
                                contacts.find((c) => c.id === selectedChat)
                                  ?.name
                              }
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
                    <span className="text-xs text-gray-500">
                      10 minutes ago
                    </span>
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

          {selectedRate !== null && (
            <div className="mt-6 flex justify-end">
              <button
                className="bg-[#232F3E] text-white px-8 py-3 rounded-lg hover:bg-[#37475A] transition-colors"
                onClick={() => {
                  router.push("/track-order");
                }}
              >
                Continue with Selected Rate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
