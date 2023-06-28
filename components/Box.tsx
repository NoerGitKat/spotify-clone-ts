import { twMerge } from "tailwind-merge";

interface IBoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<IBoxProps> = ({ children, className }) => {
  return (
    <aside
      className={twMerge(" bg-neutral-900 rounded-lg h-fit w-full", className)}
    >
      {children}
    </aside>
  );
};

export default Box;
