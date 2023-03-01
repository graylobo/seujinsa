import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../../recoil/states";
import { fetchAPI } from "../../../../utils/api-util";
import { fail, success } from "../../../../utils/toast";
import CommonInput from "../../shared/CommonInput";
import { isPassword } from "../SignUp";
export default function PersonalInfoManagement() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [changePassword1, setChangePassword1] = useState("");
  const [changePassword2, setChangePassword2] = useState("");
  const [errorText1, setErrorText1] = useState("");
  const [errorText2, setErrorText2] = useState("");
  const userInfo = useRecoilValue(userInfoState);
  function changePassword() {
    fetchAPI("post", `${process.env.NEXT_PUBLIC_DB_URL}/check-password`, {
      _id: userInfo._id,
      pw: currentPassword,
    }).then((e) => {
      if (e.status === 200) {
        fetchAPI("post", `${process.env.NEXT_PUBLIC_DB_URL}/change-password`, {
          _id: userInfo._id,
          pw: changePassword1,
        }).then((e) => {
          success("비밀번호가 변경되었습니다.");
          setCurrentPassword("");
          setChangePassword1("");
          setChangePassword2("");
        });
      } else {
        fail("비밀번호가 일치하지 않습니다.");
      }
    });
  }

  useEffect(() => {
    setErrorText1(isPassword(changePassword1));
    setErrorText2(isPassword(changePassword2));
    if (changePassword1 !== changePassword2) {
      setErrorText2("비밀번호가 일치하지 않습니다.");
    }
  }, [changePassword1, changePassword2]);

  return (
    <div className="w-full py-[16px] flex items-center flex-col border-b border-gray-300">
      <ToastContainer />
      <div className="max-w-[428px] w-full">
        <p className="font-bold mb-[32px]">비밀번호 변경</p>
        <div className="mb-[16px]">
          <CommonInput
            type="password"
            label="현재 비밀번호"
            placeholder="비밀번호를 입력해주세요."
            setChange={setCurrentPassword}
            value={currentPassword}
          />
        </div>
        <div className="mb-[16px]">
          <CommonInput
            type="password"
            label="새 비밀번호"
            placeholder="비밀번호를 입력해주세요."
            setChange={setChangePassword1}
            errorText={errorText1}
            value={changePassword1}
          />
        </div>
        <div className="mb-[16px]">
          <CommonInput
            type="password"
            label="새 비밀번호 확인"
            placeholder="비밀번호를 입력해주세요."
            setChange={setChangePassword2}
            errorText={errorText2}
            value={changePassword2}
          />
        </div>
        <div className="flex justify-center">
          <button
            disabled={
              changePassword1 !== changePassword2 ||
              errorText1 !== "" ||
              errorText2 !== ""
            }
            onClick={() => {
              changePassword();
            }}
            className="mt-[8px]  h-[48px] w-[100px] py-[12px] rounded-[8px] outline-none transition-colors disabled:bg-gray-100 disabled:border-gray-500 disabled:border-1 disabled:text-gray-500 bg-white hover:bg-red-100 border border-red-600 text-red-600"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
}
