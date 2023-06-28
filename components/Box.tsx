import { ReactNode, FC } from "react";
import { twMerge } from "tailwind-merge";

interface IBoxProps {
  children: ReactNode;
  className?: string;
}

const Box: FC<IBoxProps> = ({ children, className }) => {
  return (
    <aside
      className={twMerge(" bg-neutral-900 rounded-lg h-fit w-full", className)}
    >
      {children}
    </aside>
  );
};

export default Box;
