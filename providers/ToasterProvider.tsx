"use client";

import { FC } from "react";
import { Toaster } from "react-hot-toast";

type ToasterProviderProps = {};

const ToasterProvider: FC<ToasterProviderProps> = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff"
        }
      }}
    />
  );
};

export default ToasterProvider;
