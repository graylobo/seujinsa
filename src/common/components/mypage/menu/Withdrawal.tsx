import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../recoil/states";
import { success, fail, info } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
export default function Withdrawal() {
  const [password, setPassword] = useState("");
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();
  const handleKeyPress = useCallback(
    (e: any) => {
      if (e.keyCode === 13) {
        checkPasswordValidate();
      }
    },
    [password]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress]);
  async function checkPasswordValidate() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/withdrawal`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: userInfo._id,
          pw: password,
        }),
      });
      if (res.status === 200) {
        alert("회원탈퇴가 완료되었습니다.");
        router.push("/");
      } else {
        info("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="w-full py-[16px] flex items-center flex-col">
      <ToastContainer />
      <div className="max-w-[428px] w-full">
        <p className="font-bold mb-[24px]">
          진행을 위해 비밀번호를 다시 입력해주세요.
        </p>
        <div className="mb-[16px]">
          <label htmlFor="" className="text-[14px] mb-[8px] inline-block">
            현재 비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력해주세요"
            className=" outline-none w-full rounded-[10px] bg-gray-200 h-[48px] border border-gray-400 px-[12px] focus:bg-gray-100 focus:border-gray-700 focus:border-[2px] focus:outline-none focus:text-gray-700 appearance-none"
          />
        </div>
        <button
          onClick={() => {
            checkPasswordValidate();
          }}
          disabled={password === ""}
          className="mt-[24px] h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors disabled:bg-gray-100 disabled:border-gray-500 disabled:border-[1px] disabled:text-gray-500 bg-gray-100 hover:bg-red-100 border border-red-600 text-red-600"
        >
          다음
        </button>
      </div>
    </div>
  );
}
