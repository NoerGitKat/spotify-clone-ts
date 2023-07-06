import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import useDebounce from "./useDebounce";
import qs from "query-string";

const useSearchInput = () => {
  const { push } = useRouter();
  const [searchVal, setSearchVal] = useState<string>("");
  const debouncedVal = useDebounce<string>(searchVal);

  useEffect(() => {
    if (debouncedVal.length > 0) {
      const query = {
        title: debouncedVal
      };

      const url = qs.stringifyUrl({
        url: "/search",
        query
      });

      push(url);
    } else {
      push("/search");
    }
  }, [debouncedVal, push]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchVal(event?.target.value);

  return { handleChange, searchVal };
};

export default useSearchInput;
