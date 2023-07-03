import { useEffect, useState } from "react";

const useMountCheck = (): {
  isMounted: boolean;
} => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
};

export default useMountCheck;
