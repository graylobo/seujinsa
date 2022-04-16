import React from "react";
interface Props {
  type: string;
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  ref?: any;
}
export default function MemberInput({ type, placeholder, onChange,ref }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className=" outline-none rounded-[5px] w-full h-[48px] bg-[#f7f7f7] px-[12px] mt-[10px]"
      id={type === "email" ? "email" : ""}
      ref={ref}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
    />
  );
}
