import Link from "next/link";
import React, { useState } from "react";
import MemberInput from "../shared/MemberInput";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function login(e: any) {
    e.preventDefault();
    const data = {
      id: email,
      pw: password,
    };
    const res = await fetch("https://seujinsa.herokuapp.com/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
  }
  return (
    <div className="py-[60px] p-[30px] w-full max-w-[475px] flex flex-col overflow-y-auto mx-auto">
      <div className="w-full mx-auto">
        <div className="w-full mb-[24px] mx-auto ">
          <h1 className="text-[22px] font-bold mb-[24px]">로그인</h1>
          <div>
            <label className="text-[14px]">이메일</label>
          </div>
          <div className="mb-[18px]">
            <MemberInput
              type="email"
              placeholder="이메일을 입력해주세요"
              onChange={setEmail}
            />
          </div>
          <div>
            <label className="text-[14px]">비밀번호</label>
          </div>
          <MemberInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={setPassword}
          />
        </div>
        <button
          onClick={(e) => {
            login(e);
          }}
          className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-[#e13431] disabled:bg-gray-50 text-white hover:bg-red-700"
        >
          로그인 하기
        </button>
        <div className="mt-[24px] border-t border-gray-40 pt-[24px] flex justify-around text-gray-70 pb-[48px]">
          <span className="text-[14px] cursor-pointer">비밀번호 재설정</span>
          <Link href={"/signup"}>
            <span className="text-[14px] cursor-pointer">회원가입</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
