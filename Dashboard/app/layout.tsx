"use client";
import "./globals.css";

import { createContext, useState } from "react";

export const UserContext = createContext({
  userDetails: {
    iec: "",
    aesitn: "",
    gstin: "",
    email: "",
    phone: "",
    pan: "",
  },
  setUserDetails: (details: any) => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDetails, setUserDetails] = useState({
    iec: "",
    aesitn: "",
    gstin: "",
    email: "",
    phone: "",
    pan: "",
  });

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </UserContext.Provider>
  );
}
