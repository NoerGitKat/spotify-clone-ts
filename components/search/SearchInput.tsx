"use client";

import { useDebounce } from "@/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Input from "../Input";
import qs from "query-string";

const SearchInput: FC = () => {
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

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={searchVal}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setSearchVal(event?.target.value)
      }
    />
  );
};

export default SearchInput;
