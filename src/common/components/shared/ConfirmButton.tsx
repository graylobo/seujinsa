import React from "react";
type Props = {
  text: string;
  onClick?: () => void;
};
export default function ConfirmButton({ text }: Props) {
  return (
    <button className="mt-[8px] max-w-[120px] self-center h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors hover:border-0 bg-gray-10 hover:bg-red-100 border-[1px] border-red-500 text-red-500">
      {text}
    </button>
  );
}
