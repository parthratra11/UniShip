"use client";
import { createContext, Dispatch, SetStateAction } from "react";

interface UserDetails {
  iec: string;
  aesitn: string;
  gstin: string;
  email: string;
  phone: string;
  pan: string;
}

interface UserContextType {
  userDetails: UserDetails;
  setUserDetails: Dispatch<SetStateAction<UserDetails>>;
}

export const UserContext = createContext<UserContextType>({
  userDetails: {
    iec: "",
    aesitn: "",
    gstin: "",
    email: "",
    phone: "",
    pan: "",
  },
  setUserDetails: () => {},
});
