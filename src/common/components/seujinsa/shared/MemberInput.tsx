import React from "react";
interface Props {
  id?: string;
  type: string;
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  ref?: any;
  maxLength?: number;
}
export default function MemberInput({
  id,
  type,
  placeholder,
  onChange,
  ref,
  maxLength,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className=" outline-none rounded-[5px] w-full h-[48px] bg-[#f7f7f7] px-[12px] mt-[10px]"
      ref={ref}
      maxLength={maxLength}
      id={id}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
    />
  );
}
