import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userInfoState, logoutState } from "../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Main() {
  const userInfo = useRecoilValue(userInfoState);
  const [logout, setLogout] = useRecoilState(logoutState);
  useEffect(() => {
    if (logout) {
      toast.info("로그아웃 되었습니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      setLogout(false);
    }
  }, [logoutState]);
  return (
    <div className="mt-[30px]">
      <ToastContainer />
      <img src="/star-cat.jpg" alt="" />
    </div>
  );
}
