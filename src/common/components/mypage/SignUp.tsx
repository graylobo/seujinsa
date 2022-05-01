import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import MemberInput from "../shared/MemberInput";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../shared/Loading";
import { checkNickNameExist } from "../../utils/api-util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilValue } from "recoil";
import { isMobileState } from "../../recoil/states";
function checkSpace(str: string) {
  if (str.search(/\s/) != -1) {
    return true;
  } else {
    return false;
  }
}

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
export function isNickName(val: string): string {
  if (val.length === 0) {
    return "닉네임을 입력해주세요.";
  }
  if (val.length < 3 || val.length > 8) {
    return "닉네임은 3자이상 8자이하로 설정해주세요.";
  }
  var regExp = /[`~!@#$%^&*(){}[\]<>_+|\\\'\";:\/?\-\=,.]/gi;
  if (regExp.test(val)) {
    return "특수문자는 사용할 수 없습니다.";
  }
  if (checkSpace(val)) {
    return "공백은 사용할 수 없습니다.";
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
  const [nickName, setNickName] = useState("");
  const [isJoinClicked, setJoinClicked] = useState(false);
  const [canReSendEmail, setCanReSendEmail] = useState(false);
  const [acceptAll, setAcceptAll] = useState<any>(false);
  const [ageCheck, setAgeCheck] = useState<any>(false);
  const [serviceTermCheck, setServiceTermCheck] = useState<any>(false);
  const [emailValidateText, setEmailValidateText] = useState("");
  const [nickNameValidateText, setNickNameValidateText] = useState("");
  const [passwordValidateText, setPasswordValidateText] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [nickNameValidate, setNickNameValidate] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState("");
  const [returnAuthNumber, setAuthNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useRecoilValue(isMobileState);
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
    } else {
      setEmailValidate(false);
    }
  }, [email]);
  useEffect(() => {
    const val = isNickName(nickName);
    setNickNameValidateText(val);
    if (val === "") {
      setNickNameValidate(true);
    } else {
      setNickNameValidate(false);
    }
  }, [nickName]);
  useEffect(() => {
    const val = isPassword(password);
    setPasswordValidateText(val);
    if (val === "") {
      setPasswordValidate(true);
    } else {
      setPasswordValidate(false);
    }
  }, [password]);

  async function sendEmail(e: any) {
    e.preventDefault();
    const data = {
      email: email,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/send-email`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setAuthNumber(String(json.authNum));
  }
  async function checkID(): Promise<any> {
    setLoading(true);
    const data = {
      id: email,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/check-id`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setLoading(false);
    return json;
  }

  async function memberJoin(e: any) {
    e.preventDefault();
    const data = {
      id: email,
      pw: password,
      nickName: nickName,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/join`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
  function resendEmail() {
    setCanReSendEmail(false);
    setTimeout(() => {
      setCanReSendEmail(true);
    }, 1000 * 300);
  }
  return (
    <div className="py-[60px] h-full px-[20px] mx-auto max-w-[500px]">
      <ToastContainer />
      {loading && <div className="modal-background"></div>}
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
            onChange={setEmail}
          />
          <div className="text-red-600 mt-[3px] ml-[10px] text-[15px]">
            {emailValidateText}
          </div>
        </div>
        <div className="mb-[15px]">
          <label className="text-[14px] inline-block w-full">닉네임</label>
          <MemberInput
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={setNickName}
            maxLength={8}
          />
          <div className="text-red-600 mt-[3px] ml-[10px] text-[15px]">
            {nickNameValidateText}
          </div>
        </div>
        <div className="mb-[16px]">
          <label className="text-[14px] inline-block w-full">비밀번호</label>
          <MemberInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={setPassword}
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
      {loading && <Loading message="Check ID..."></Loading>}

      {!isJoinClicked ? (
        <button
          disabled={
            !(
              ageCheck &&
              serviceTermCheck &&
              emailValidate &&
              passwordValidate &&
              nickNameValidate
            )
          }
          onClick={async (e) => {
            const res = await checkID();
            if (res.exist) {
              toast.error(res.msg, {
                autoClose: 1500,
                position: toast.POSITION.TOP_CENTER,
              });
              return;
            }
            if (await checkNickNameExist(nickName.trim())) {
              toast.error("이미 존재하는 닉네임 입니다.", {
                autoClose: 1500,
                position: toast.POSITION.TOP_CENTER,
              });
              return;
            }

            setJoinClicked(true);
            resendEmail();
            sendEmail(e);
            toast.info("인증메일이 발송되었습니다.", {
              autoClose: 1500,
              position: toast.POSITION.TOP_CENTER,
            });
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
                sendEmail(e);
                resendEmail();
              }
            }}
            className="mb-[20px] h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-white"
          >
            이메일 재발송
          </button>
          <div className={!isMobile ? "flex justify-center" : ""}>
            <div className={!isMobile ? "w-[100px]" : "w-full text-center"}>
              인증번호 입력:{" "}
            </div>
            <input
              className={
                !isMobile
                  ? "border-2  border-blue-500 px-[10px] rounded-[10px] ml-[10px]"
                  : "border-2 w-full border-blue-500 px-[10px] rounded-[10px] "
              }
              type="text"
              onChange={(e) => {
                setCertificationNumber(e.target.value);
              }}
            />
            <button
              className={!isMobile ? "ml-[10px]" : "w-full  text-center"}
              onClick={(e) => {
                if (certificationNumber !== "" && returnAuthNumber !== "") {
                  if (certificationNumber === returnAuthNumber) {
                    router.push("/auth-success");
                    memberJoin(e);
                  } else {
                    alert("이메일 인증번호가 틀립니다.");
                  }
                } else {
                  alert("인증번호가 입력되지 않았습니다.");
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
