import React from "react";

interface IProps {
  label?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  errorText?: string;
  setChange?: (val: string) => void;
}

export default function CommonInput({
  label,
  value,
  type = "text",
  placeholder,
  errorText,
  setChange,
}: IProps) {
  return (
    <div>
      <label htmlFor="" className="text-[14px] mb-[8px] inline-block">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => {
          setChange && setChange(e.target.value);
        }}
        type={type}
        placeholder={placeholder}
        className=" outline-none w-full rounded-[10px] bg-gray-200 h-[48px] border border-gray-400 px-[12px] focus:bg-gray-100 focus:border-gray-700 focus:border-2 focus:outline-none focus:text-gray-700 appearance-none"
      />
      <div className="text-red-600 mt-[3px] ml-[10px] text-[15px]">
        {errorText}
      </div>
    </div>
  );
}
