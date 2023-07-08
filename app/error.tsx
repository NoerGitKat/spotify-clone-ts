"use client";

import { Box } from "@/components";
import Error from "next/error";
import { FC, useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError: FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box className="h-full flex flex-col items-center justify-center">
      <aside className="text-neutral-400">
        <p>Something went wrong.</p>
      </aside>
      <aside>
        <button
          className="text-center bg-yellow-400 hover:bg-yellow-300 text-white font-semibold py-2 px-4 mt-2 rounded"
          onClick={() => reset()}
        >
          Try again
        </button>
      </aside>
    </Box>
  );
};

export default GlobalError;
