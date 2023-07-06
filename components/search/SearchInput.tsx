"use client";

import { useSearchInput } from "@/hooks";
import { FC } from "react";
import Input from "../Input";

const SearchInput: FC = () => {
  const { handleChange, searchVal } = useSearchInput();

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={searchVal}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
