import type { FC } from "react";

interface InputType {
  type: "email" | "password" | "text" | "number";
  placeholder: string;
  extraClass?: string;
  name: string;
  value?: string;
  setValue?: (value: string) => void;
}

const Input: FC<InputType> = ({ type, placeholder, extraClass, name, value, setValue }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
      name={name}
      type={type}
      placeholder={placeholder}
      required
      className={`w-full bg-transparent border-b-2 border-black py-2 text-xl font-bold placeholder:text-black/20 focus:outline-none focus:border-[#8b1e1e] transition-colors duration-200 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#c7c0b1_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#1a1a1a] ${extraClass}`}
    />
  );
};

export default Input;
