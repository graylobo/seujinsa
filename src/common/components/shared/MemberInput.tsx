import React from "react";
interface Props {
  type: string;
  placeholder?: string;
  content?: React.Dispatch<React.SetStateAction<string>>;
}
export default function MemberInput({ type, placeholder,content }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className=" outline-none rounded-[5px] w-full h-[48px] bg-[#f7f7f7] px-[12px] mt-[10px]"
      onChange={(e)=>{
        content && content(e.target.value)
      }}
    />
  );
}
