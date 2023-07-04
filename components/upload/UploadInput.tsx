import { FC, InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface UploadInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const UploadInput: FC<UploadInputProps> = forwardRef<
  HTMLInputElement,
  UploadInputProps
>(({ className, type, disabled, ...props }, ref) => {
  return (
    <input
      className={twMerge(
        "flex w-full rounded-md bg-neutral-700 border border-transparent my-3 px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
        className
      )}
      type={type}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

UploadInput.displayName = "Input";

export default UploadInput;
