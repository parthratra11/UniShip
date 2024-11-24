"use client";
import "./globals.css";
import { useState } from "react";
import { UserContext } from "./UserContext"; // Adjust the path as needed

interface UserDetails {
  iec: string;
  aesitn: string;
  gstin: string;
  email: string;
  phone: string;
  pan: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
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
