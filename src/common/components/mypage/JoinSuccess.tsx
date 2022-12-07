import Link from "next/link";
import React from "react";

export default function JoinSuccess() {
  return (
    <div className="flex justify-center items-center h-[500px]">
      <div>
        <div className="text-[20px] font-bold">
          이메일 인증이 성공적으로 완료되었습니다.
        </div>
        <Link href={"/signin"}>
          <button className="mt-[30px] h-[48px] w-full py-[12px]  rounded-[8px] outline-none transition-colors bg-[#e13431] disabled:bg-gray-50 text-white hover:bg-red-700">
            로그인 하기
          </button>
        </Link>
      </div>
    </div>
  );
}
