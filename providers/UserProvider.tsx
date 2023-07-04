"use client";

import { UserContextProvider } from "@/context/UserContext";
import { FC, ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
