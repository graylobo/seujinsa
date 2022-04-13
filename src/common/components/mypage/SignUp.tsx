import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import MemberInput from "../shared/MemberInput";
import Link from "next/link";
import { useRouter } from "next/router";

export function isEmail(val: string): string {
  if (val.length === 0) {
    return "이메일을 입력해주세요.";
  }
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regExp.test(val)) {
    return "영문, 숫자만 사용 가능합니다.";
  }

  return "";
}
export function isPassword(val: string): string {
  if (val.length === 0) {
    return "비밀번호를 입력해주세요.";
  }
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/; //  8 ~ 10자 영문, 숫자 조합

  if (!regExp.test(val)) {
    return "8 ~ 20자의 영문, 숫자 조합만 사용 가능합니다.";
  }
  return "";
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isJoinClicked, setJoinClicked] = useState(false);
  const [canReSendEmail, setCanReSendEmail] = useState(false);
  const [acceptAll, setAcceptAll] = useState<any>(false);
  const [ageCheck, setAgeCheck] = useState<any>(false);
  const [serviceTermCheck, setServiceTermCheck] = useState<any>(false);
  const [emailValidateText, setEmailValidateText] = useState("");
  const [passwordValidateText, setPasswordValidateText] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState("");
  const [returnAuthNumber, setAuthNumber] = useState("");
  const router = useRouter();
  useEffect(() => {
    setAgeCheck(acceptAll);
    setServiceTermCheck(acceptAll);
  }, [acceptAll]);
  useEffect(() => {
    const val = isEmail(email);
    setEmailValidateText(val);
    if (val === "") {
      setEmailValidate(true);
    }
  }, [email]);
  useEffect(() => {
    const val = isPassword(password);
    setPasswordValidateText(val);
    if (val === "") {
      setPasswordValidate(true);
    }
  }, [password]);

  async function sendEmail(e: any) {
    e.preventDefault();
    const data = {
      email: email,
    };
    const res = await fetch("http://localhost:3000/api/send-email", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setAuthNumber(String(json.authNum));
  }
  function resendEmail() {
    setCanReSendEmail(false);
    setTimeout(() => {
      setCanReSendEmail(true);
    }, 1000 * 300);
  }

  return (
    <div className="py-[60px] h-full px-[20px] mx-auto max-w-[500px]">
      <div className="mb-[16px]">
        <h1 className="text-[22px] font-bold mb-[8px]">회원가입</h1>
        <span className="text-[14px] mr-[16px]">
          이미 가입한 계정이 있으세요?
        </span>
        <Link href={"/signin"}>
          <a className="text-[14px] text-red-600">로그인하기</a>
        </Link>
      </div>
      <div className="mb-[24px]">
        <div className="mb-[15px]">
          <label className="text-[14px] inline-block w-full">이메일</label>
          <MemberInput
            type="email"
            placeholder="이메일을 입력해주세요"
            content={setEmail}
          />
          <div className="text-red-600 mt-[3px] ml-[10px] text-[15px]">
            {emailValidateText}
          </div>
        </div>
        <div className="mb-[16px]">
          <label className="text-[14px] inline-block w-full">비밀번호</label>
          <MemberInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            content={setPassword}
          />
          <div className="text-red-600 mt-[3px] ml-[10px] text-[15px]">
            {passwordValidateText}
          </div>
        </div>
      </div>
      <div className="border-b border-[#c9c9c9] pb-[16px] flex items-center">
        <div className="inline-flex items-center  w-[16px] h-[16px]">
          <input
            type="checkbox"
            id="all"
            onChange={(e) => {
              setAcceptAll(e.target.checked);
            }}
          />
          <label htmlFor="all" className=""></label>
        </div>
        <span className="ml-[8px]">전체 약관에 동의합니다.</span>
      </div>
      <div className="mt-[16px] mb-[24px]">
        <div className="flex items-center">
          <div className="inline-flex items-center  w-[16px] h-[16px]">
            <input
              type="checkbox"
              id="all"
              className=" checked:bg-red-500 "
              checked={ageCheck}
              onChange={(e) => {
                setAgeCheck(e.target.checked);
              }}
            />
            <label htmlFor="all" className=""></label>
          </div>
          <span className="ml-[8px]">만 14세 이상입니다. (필수)</span>
        </div>
        <div className="flex items-center">
          <div className="inline-flex items-center  w-[16px] h-[16px]">
            <input
              type="checkbox"
              id="all"
              className=" checked:bg-red-500 "
              checked={serviceTermCheck}
              onChange={(e) => {
                setServiceTermCheck(e.target.checked);
              }}
            />
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
      {!isJoinClicked ? (
        <button
          disabled={
            !(ageCheck && serviceTermCheck && emailValidate && passwordValidate)
          }
          onClick={(e) => {
            setJoinClicked(true);
            resendEmail();
            sendEmail(e);
          }}
          className="mb-[10px] h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-white"
        >
          이메일로 시작하기
        </button>
      ) : (
        <div>
          <button
            onClick={(e) => {
              if (!canReSendEmail) {
                alert("3분후에 재발송 가능합니다.");
              } else {
                alert("메일이 재발송 되었습니다");
                resendEmail();
              }
            }}
            className="mb-[20px] h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-white"
          >
            이메일 재발송
          </button>
          <div className="flex justify-center">
            <span>인증번호 입력: </span>
            <input
              className="border-2  border-blue-600 px-[10px] rounded-[10px] ml-[10px]"
              type="text"
              onChange={(e) => {
                setCertificationNumber(e.target.value);
              }}
            />
            <button
              className="ml-[10px]"
              onClick={() => {
                if (certificationNumber === returnAuthNumber) {
                  if (certificationNumber !== "" && returnAuthNumber !== "") {
                    alert("인증번호가 입력되지 않았습니다.");
                  } else {
                    router.push("/auth-success");
                  }
                } else {
                  console.log(certificationNumber, "-", returnAuthNumber);

                  alert("이메일 인증번호가 틀립니다.");
                }
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
