import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoState, logoutState } from "../recoil/states";

export default function More() {
  // const [sessionInfo, setSessionInfo] = useState({ result: "" });
  const router = useRouter();
  const [userState, setUserState] = useRecoilState(userInfoState);
  const setLogout = useSetRecoilState(logoutState);

  // 컴포넌트 로드시마다 세션정보를 api호출하는 비용이 오버스펙이라 판단하여 recoil 상태로 확인하는것으로 수정
  // useEffect(() => {
  //   async function loginCheck() {
  //     const res = await fetch("http://localhost:3003/more-page", {
  //       credentials: "include",
  //     });
  //     const json = await res.json();
  //     setSessionInfo(json);
  //   }
  //   loginCheck();
  // }, []);
  // async function logOut() {
  //   const res = await fetch("http://localhost:3003/logout", {
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });
  //   const json = await res.json();
  //   setSessionInfo(json);
  // }

  return (
    <div className="p-[30px] w-[700px] mx-auto">
      <Link href={"/left-control"}>
        <p className="cursor-pointer p-2.5 border-b border-gray-60">왼손생산</p>
      </Link>
      <Link href={"/build-alert"}>
        <p className="cursor-pointer p-2.5 border-b border-gray-60">
          빌드알리미
        </p>
      </Link>
      <Link href={"/tier"}>
        <p className="cursor-pointer p-2.5 border-b border-gray-60">계급표</p>
      </Link>
      <Link href={"/record"}>
        <p className="cursor-pointer p-2.5 border-b border-gray-60">전적등록</p>
      </Link>

      {userState.isLogin ? (
        <Link href={"/"}>
          <p className="cursor-pointer p-2.5 border-b border-gray-60">
            <span
              className="w-full inline-block"
              onClick={() => {
                setUserState({ isLogin: false, votePoint: -1 });
                setLogout(true);
                router.push("/");
              }}
            >
              로그아웃
            </span>
          </p>
        </Link>
      ) : (
        <Link href={"/signin"}>
          <p className="cursor-pointer p-2.5 border-b border-gray-60">
            <span
              className="w-full inline-block"
              onClick={() => {
                router.push("/signin");
              }}
            >
              로그인
            </span>
          </p>
        </Link>
      )}
    </div>
  );
}
