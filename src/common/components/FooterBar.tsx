import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/states";
export default function FooterBar() {
  const userState = useRecoilValue(userInfoState);
  const router = useRouter();
  const iconContainerCSS =
    "mt-4 flex flex-col items-center cursor-pointer w-[56px] ";
  return (
    <footer className="h-[56px]  fixed w-full justify-center flex  bottom-0 z-[1000]  footer-container text-black">
      <div className="max-w-[700px] flex items-center w-full justify-around">
        <Link href={"/"}>
          <div className={iconContainerCSS}>
            <span className="material-symbols-outlined text-[19px]">home</span>
            <span className="text-[12px]">홈</span>
          </div>
        </Link>

        <Link href={"/tier/standard"}>
          <div className={iconContainerCSS}>
            <span className="material-symbols-outlined text-[19px]">search</span>
            <span className="text-[12px]">검색</span>
          </div>
        </Link>

        <Link href={"/qna"}>
          <div className={iconContainerCSS}>
            <span className="material-symbols-outlined text-[19px]">sms</span>
            <span className="text-[12px]">건의사항</span>
          </div>
        </Link>
        {userState.isLogin ? (
          <Link href={"/mypage"}>
            <div className={iconContainerCSS}>
              <span className="material-symbols-outlined text-[19px]">
                person
              </span>
              <span className="text-[12px]">마이페이지</span>
            </div>
          </Link>
        ) : (
          <Link href={"/signin"}>
            <div className={iconContainerCSS}>
              <span className="material-symbols-outlined text-[19px]">login</span>
              <span className="text-[12px]">로그인</span>
            </div>
          </Link>
        )}
      </div>
      <style jsx>{`
        .footer-container {
          background-color: rgba(250, 250, 250, 0.8);
        }
      `}</style>
    </footer>
  );
}
