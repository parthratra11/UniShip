"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from "next/link";
import React, { useState } from "react";
import { FaBox, FaEnvelope, FaPhone } from "react-icons/fa";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginMethod, setLoginMethod] = useState("email");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <FaBox className="text-amazon-orange text-3xl" />
            <h1 className="text-3xl font-bold text-amazon">UniShip</h1>
          </div>
          <p className="text-gray-600">Shipping Management Solution</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-amazon">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 font-medium ${
                  isLogin
                    ? "text-amazon border-b-2 border-amazon-orange"
                    : "text-gray-500"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 font-medium ${
                  !isLogin
                    ? "text-amazon border-b-2 border-amazon-orange"
                    : "text-gray-500"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="mb-6">
            <form className="space-y-4">
              {isLogin && (
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setLoginMethod("email")}
                      className={`px-4 py-2 font-medium ${
                        loginMethod === "email"
                          ? "text-amazon border-b-2 border-amazon-orange"
                          : "text-gray-500"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <FaEnvelope />
                        <span>Email</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("phone")}
                      className={`px-4 py-2 font-medium ${
                        loginMethod === "phone"
                          ? "text-amazon border-b-2 border-amazon-orange"
                          : "text-gray-500"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <FaPhone />
                        <span>Phone</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {(loginMethod === "email" || !isLogin) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              )}

              {(loginMethod === "phone" || !isLogin) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="w-2/3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
                    placeholder="Enter verification code"
                  />
                  <button
                    type="button"
                    className="w-1/3 bg-amazon hover:bg-amazon-dark text-white py-2 rounded transition-colors"
                  >
                    Verify
                  </button>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amazon-orange"
                  placeholder="Enter your password"
                />
              </div>
              <Link href="/export-details">
                <button
                  type="submit"
                  className="w-full bg-amazon-orange hover:bg-amazon text-white py-2 rounded transition-colors"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </Link>
            </form>
          </div>

          {isLogin && (
            <div className="text-center">
              <a
                href="#"
                className="text-amazon hover:text-amazon-orange text-sm"
              >
                Forgot your password?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
