import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Main() {
  const userInfo = useRecoilValue(userInfoState);
  useEffect(() => {
    console.log(userInfo.isLogin);
    if (!userInfo.isLogin) {
      toast.info("로그아웃 되었습니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [userInfo]);
  return (
    <div className="mt-[30px]">
      <ToastContainer />
      <img src="/star-cat.jpg" alt="" />
    </div>
  );
}
