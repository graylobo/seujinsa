import axios from "axios";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import { fail, info, success } from "../../../utils/toast";

export default function FindPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function sendEmail() {
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_DB_URL}/reset-password`, {
        _id: email,
      })
      .then((e) => {
        success(e.data);
        setLoading(false);
      })
      .catch((e) => {
        fail("이메일 발송이 실패하였습니다. 메일주소를 확인해주세요.");
        setLoading(false);
      });
  }

  return (
    <div className="max-w-[428px] py-[60px] h-full px-[20px] w-full mx-auto mt-[56px]">
      <ToastContainer />
      {loading && (
        <div className="modal-background flex justify-center items-center">
          <SyncLoader color="red" size={15} />
        </div>
      )}
      <h1 className="text-[22px] font-bold mb-[8px]">비밀번호 재설정</h1>
      <p className="text-[14px] text-gray-600 mb-[24px]">이메일로 임시 비밀번호를 보내드릴게요.</p>
      <div className="mb-[16px]">
        <label htmlFor="" className="text-[14px] mb-[8px] inline-block"></label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className=" outline-none w-full rounded-[10px] bg-gray-200 h-[48px] border border-gray-400 px-[12px] focus:bg-gray-100 focus:border-gray-700 focus:border-[2px] focus:outline-none focus:text-gray-700 appearance-none"
          placeholder="이메일을 입력해주세요."
        />
      </div>
      <button
        onClick={() => {
          sendEmail();
        }}
        className="h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-white"
      >
        임시 비밀번호 발송
      </button>
    </div>
  );
}
