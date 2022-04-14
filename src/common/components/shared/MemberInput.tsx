import React from "react";
interface Props {
  type: string;
  placeholder?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  onBlur?: () => {};
}
export default function MemberInput({
  type,
  placeholder,
  onChange,
  onBlur,
}: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className=" outline-none rounded-[5px] w-full h-[48px] bg-[#f7f7f7] px-[12px] mt-[10px]"
      onBlur={onBlur}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
    />
  );
}
