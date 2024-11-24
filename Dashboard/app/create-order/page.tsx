"use client";

import { UserContext } from "../UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import createDeclaration from "../components/OrderCreation/createDeclaration";
import {
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

// ! ADD RODTEP CALCULATOR TOO
async function getCustomDutiesFromPublic(categories) {
  try {
    // Fetch the JSON file from the public folder
    const response = await fetch("/customsRequirement.json"); // Adjust the file name if necessary
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const customDutiesData = await response.json();

    // Extract duties based on categories
    const duties = {};
    categories.forEach((category) => {
      // Iterate over the keys of productType
      for (const productCategory in customDutiesData.productType) {
        if (productCategory.includes(category)) {
          // Check if the category already exists in duties
          if (!duties[category]) {
            // Initialize it as an array if it doesn't exist
            duties[category] = [];
          }

          // Add the custom duty to the corresponding category
          duties[category].push(
            customDutiesData.productType[productCategory].requirements
              .customDuties
          );
        }
      }
    });
    return duties;
  } catch (error) {
    console.error("Error fetching custom duties:", error);
    return {};
  }
}

// ! Example categories
const customsInfo = {
  category: [
    "Apparel",
    "Clothing",
    "Accessories",
    "Textile",
    "Cap",
    "Men",
    "Women",
    "Unisex",
  ],
};
getCustomDutiesFromPublic(customsInfo.category).then((duties) => {
  // console.log("Custom Duties:", duties);
  for (const category in duties) {
    console.log(category, duties[category]);
  }
});

const warehouseAddresses = [
  {
    id: 1,
    name: "Main Warehouse",
    street: "123 Industrial Area",
    locality: "Phase 1",
    landmark: "Near Metro Station",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    zipCode: "110001",
    contactName: "John Doe",
    phone: "+91-9876543210",
    email: "warehouse1@example.com",
  },
  {
    id: 2,
    name: "Secondary Warehouse",
    street: "456 Logistics Park",
    locality: "Phase 3",
    landmark: "Opposite Industrial Gate",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zipCode: "400001",
    contactName: "Jane Smith",
    phone: "+91-9123456789",
    email: "warehouse2@example.com",
  },
];

const AddressForm = ({ type, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [`${type}Address`]: {
        ...prev[`${type}Address`],
        [name]: value,
      },
    }));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Street Address
        </label>
        <input
          type="text"
          name="street"
          value={formData[`${type}Address`].street}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Locality/Area
        </label>
        <input
          type="text"
          name="locality"
          value={formData[`${type}Address`].locality}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Landmark
        </label>
        <input
          type="text"
          name="landmark"
          value={formData[`${type}Address`].landmark}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          City
        </label>
        <input
          type="text"
          name="city"
          value={formData[`${type}Address`].city}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          State
        </label>
        <input
          type="text"
          name="state"
          value={formData[`${type}Address`].state}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Country
        </label>
        <input
          type="text"
          name="country"
          value={formData[`${type}Address`].country}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          ZIP Code
        </label>
        <input
          type="text"
          name="zipCode"
          value={formData[`${type}Address`].zipCode}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Contact Name
        </label>
        <input
          type="text"
          name="contactName"
          value={formData[`${type}Address`].contactName}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          value={formData[`${type}Address`].phone}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F1111]">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData[`${type}Address`].email}
          onChange={handleChange}
          className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
          required
        />
      </div>
    </div>
  );
};

const CreateOrderForm = () => {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    color: "",
    size: "",
    addressType: "warehouse",
    selectedWarehouseId: "",
    shipperAddress: {
      street: "",
      locality: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      contactName: "",
      phone: "",
      email: "",
    },
    receiverAddress: {
      street: "",
      locality: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      contactName: "",
      phone: "",
      email: "",
    },
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
    },
    customsInfo: {
      description: "",
      materialComposition: "",
      category: "",
      additionalParams: "",
      brandName: "",
      retailPrice: "",
    },
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [declaration, setDeclaration] = useState({});
  const [dutyRate, setDutyRate] = useState(0);
  const [rodtep, setRodtep] = useState(0.1);
  const [qnaData, setQnaData] = useState([]);

  useEffect(() => {
    // Fetch QnA data
    fetch("/dockAiQna4.json")
      .then((res) => res.json())
      .then((data) => setQnaData(data))
      .catch((err) => console.error("Error loading QnA data:", err));
  }, []);

  const handleProductSelect = (productId) => {
    const product = products.find((p) => p.id === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
      setFormData((prev) => ({
        ...prev,
        productId,
        dimensions: product.dimensions,
      }));
    }

    function extractDutyRate(dutyString) {
      if (dutyString === "" || dutyString === "-") {
        return null;
      }

      const rangeMatch = dutyString.match(/^(\d+)-(\d+)%$/);
      if (rangeMatch) {
        return parseInt(rangeMatch[2]);
      }

      const singleMatch = dutyString.match(/^(\d+)%$/);
      if (singleMatch) {
        return parseInt(singleMatch[1]);
      }

      return null;
    }

    getCustomDutiesFromPublic(selectedProduct["customsInfo"]["category"]).then(
      (duties) => {
        const dutiesArr = [];
        for (const category in duties) {
          const dutyRateString = duties[category][0]["dutyRate"];
          const dutyRate = extractDutyRate(dutyRateString);
          if (dutyRate !== null) {
            dutiesArr.push(dutyRate);
          } else {
            console.log("Invalid duty rate format");
          }
        }
        const maxDuty = Math.max(...dutiesArr);
        setDutyRate(maxDuty);
      }
    );
  };

  const handleWarehouseSelect = (warehouseId) => {
    const warehouse = warehouseAddresses.find(
      (w) => w.id === parseInt(warehouseId)
    );
    if (warehouse) {
      setFormData((prev) => ({
        ...prev,
        shipperAddress: {
          street: warehouse.street,
          locality: warehouse.locality,
          landmark: warehouse.landmark,
          city: warehouse.city,
          state: warehouse.state,
          country: warehouse.country,
          zipCode: warehouse.zipCode,
          contactName: warehouse.contactName,
          phone: warehouse.phone,
          email: warehouse.email,
        },
      }));
    }
  };

  const { userDetails, setUserDetails } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    createDeclaration({
      formData,
      selectedProduct,
      dutyRate,
      rodtep,
      declaration,
      userDetails,
      router,
      setUserDetails,
      setDeclaration,
    });
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        console.log(products);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    async function getDeclaration() {
      try {
        const response = await fetch("/orderDeclarationTemplate.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const declarationTemplate = await response.json();
        console.log(declarationTemplate);
        setDeclaration(declarationTemplate);
      } catch (error) {
        console.error("Error fetching declarationTemplate:", error);
      }
    }

    getProducts();
    getDeclaration();
  }, []);

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

      const contactIndex = contacts.findIndex((c) => c.id === selectedChat);
      if (contactIndex !== -1) {
        contacts[contactIndex].lastMessage = newMessage;
        contacts[contactIndex].time = newMsg.time;
      }

      setNewMessage("");
    }
  };

  const findBestMatch = (userQuestion) => {
    if (!qnaData || qnaData.length === 0) return null;

    // Convert question to lowercase for case-insensitive matching
    const normalizedQuestion = userQuestion.toLowerCase();

    // Find the best matching question based on word overlap
    let bestMatch = null;
    let maxOverlap = 0;

    qnaData.forEach((qna) => {
      const questionWords = qna.question.toLowerCase().split(" ");
      const userWords = normalizedQuestion.split(" ");

      let overlap = 0;
      questionWords.forEach((word) => {
        if (userWords.includes(word)) overlap++;
      });

      if (overlap > maxOverlap) {
        maxOverlap = overlap;
        bestMatch = qna;
      }
    });

    // Return the answer if there's a reasonable match (you can adjust the threshold)
    return maxOverlap >= 2
      ? bestMatch.answer
      : "I'm sorry, I don't have specific information about that. Could you please rephrase your question?";
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

      // Find matching answer from QnA data
      const answer = findBestMatch(newDockAIMessage);

      setTimeout(() => {
        const botMsg = {
          sender: "bot",
          text: answer,
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
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#0F1111]">Create Order</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#D5D9D9]">
            <h2 className="text-xl font-medium mb-4 text-[#0F1111]">
              Product Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                    Product
                  </label>
                  <select
                    onChange={(e) => handleProductSelect(e.target.value)}
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  >
                    <option value="">Choose a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (HSN: {product.hsnCode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-[#0F1111]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        quantity: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#D5D9D9]">
            <h2 className="text-xl font-medium mb-4 text-[#0F1111]">
              Shipping Details
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-[#0F1111]">
                  Shipper Address
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="warehouse"
                        checked={formData.addressType === "warehouse"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            addressType: e.target.value,
                          }))
                        }
                        className="text-[#FF9900] focus:ring-[#FF9900]"
                      />
                      <span className="ml-2 text-[#0F1111]">Warehouse</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="custom"
                        checked={formData.addressType === "custom"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            addressType: e.target.value,
                          }))
                        }
                        className="text-[#FF9900] focus:ring-[#FF9900]"
                      />
                      <span className="ml-2 text-[#0F1111]">
                        Custom Address
                      </span>
                    </label>
                  </div>

                  {formData.addressType === "warehouse" ? (
                    <select
                      onChange={(e) => handleWarehouseSelect(e.target.value)}
                      className="w-full px-3 py-1 border border-[#888C8C] rounded focus:border-[#E77600] focus:shadow-[0_0_3px_2px_rgb(228,121,17,50%)] focus:outline-none"
                      required
                    >
                      <option value="">Select Warehouse</option>
                      {warehouseAddresses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} - {warehouse.city}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <AddressForm
                      type="shipper"
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-[#0F1111]">
                  Receiver Address
                </h3>
                <AddressForm
                  type="receiver"
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] py-1 px-4 rounded-md border border-[#FCD200] focus:outline-none focus:ring-2 focus:ring-[#F7CA00] shadow-sm"
          >
            Create Order
          </button>
        </form>
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
};

export default CreateOrderForm;
