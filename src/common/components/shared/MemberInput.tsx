import React from "react";
interface Props {
  type: string;
  placeholder?: string;
}
export default function MemberInput({ type, placeholder }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className=" outline-none rounded-[5px] w-[402px] h-[48px] bg-[#f7f7f7] px-[12px] mt-[10px]"
    />
  );
}
