import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { loginInfo } from "../recoil/states";
export default function FooterBar() {
  const loginState = useRecoilValue(loginInfo);
  const router = useRouter();
  return (
    <div className="h-[56px] bg-gray-200 fixed w-full justify-center flex  bottom-0  shadow-2xl ">
      <div className="max-w-[700px] flex items-center w-full justify-around">
        <Link href={"/"}>
          <div className="mt-4 flex flex-col items-center cursor-pointer w-[56px] ">
            <span className="material-icons-outlined text-[19px]">home</span>
            <span className="text-[12px]">홈</span>
          </div>
        </Link>

        <div className="mt-4 flex flex-col items-center cursor-pointer w-[56px] "></div>
        <div className="mt-4 flex flex-col items-center cursor-pointer w-[56px] "></div>
        {loginState.isLogin ? (
          <div className="mt-4 flex flex-col items-center cursor-pointer w-[56px] ">
            <span className="material-icons-outlined text-[19px]">person</span>
            <span className="text-[12px]">마이페이지</span>
          </div>
        ) : (
          <Link href={"/signin"}>
            <div className="mt-4 flex flex-col items-center cursor-pointer w-[56px] ">
              <span className="material-icons-outlined text-[19px]">login</span>
              <span className="text-[12px]">로그인</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
