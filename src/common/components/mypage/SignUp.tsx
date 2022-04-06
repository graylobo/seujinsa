import React from "react";
import MemberInput from "../shared/MemberInput";

export default function SignUp() {
  return (
    <div className="py-[60px] h-full px-[20px] ">
      <div className="mb-[16px]">
        <h1 className="text-[22px] font-bold mb-[8px]">회원가입</h1>
        <span className="text-[14px] mr-[16px]">
          이미 가입한 계정이 있으세요?
        </span>
        <a href="" className="text-[14px] text-red-600">
          로그인하기
        </a>
      </div>
      <div className="mb-[24px]">
        <div className="mb-[16px]">
          <label className="text-[14px] mb-[8px] inline-block w-full">
            이메일
          </label>
          <MemberInput type="email" placeholder="이메일을 입력해주세요" />
        </div>
        <div className="mb-[16px]">
          <label className="text-[14px]  mb-[8px] inline-block w-full">
            비밀번호
          </label>
          <MemberInput type="password" placeholder="비밀번호를 입력해주세요" />
        </div>
      </div>
      <div className="border-b border-[#c9c9c9] pb-[16px] flex items-center">
        <div className="inline-flex items-center  w-[16px] h-[16px]">
          <input type="checkbox" id="all" />
          <label htmlFor="all" className=""></label>
        </div>
        <span className="ml-[8px]">전체 약관에 동의합니다.</span>
      </div>
      <div className="mt-[16px] mb-[24px]">
        <div className="flex items-center">
          <div className="inline-flex items-center  w-[16px] h-[16px]">
            <input type="checkbox" id="all" className=" checked:bg-red-500 " />
            <label htmlFor="all" className=""></label>
          </div>
          <span className="ml-[8px]">만 14세 이상입니다. (필수)</span>
        </div>
        <div className="flex items-center">
          <div className="inline-flex items-center  w-[16px] h-[16px]">
            <input type="checkbox" id="all" className=" checked:bg-red-500 " />
            <label htmlFor="all" className=""></label>
          </div>
          <span>
            <span className="ml-[8px]">이용약관 </span>
            <span>및 </span>
            <span>개인정보처리방침</span>
            <span>에 동의합니다. (필수)</span>
          </span>
        </div>
      </div>
      <button className="mb-[48px] h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-white">
        이메일로 시작하기
      </button>
    </div>
  );
}
