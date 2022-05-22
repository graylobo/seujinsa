import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/states";
import PersonalInfoManagement from "./menu/PersonalInfoManagement";
import ProfileManagement from "./menu/ProfileManagement";
import Withdrawal from "./menu/Withdrawal";
type ObjType = {
  [index: number]: JSX.Element;
};
const menuList: ObjType = {
  0: <ProfileManagement />,
  1: <PersonalInfoManagement />,
  2: <Withdrawal />,
};

export default function MyPage() {
  const [selectedMenuIndex, setMenuIndex] = useState<number>(0);
  const menu = ["프로필 관리", "개인정보 관리", "회원탈퇴"];
  const [userState, setUserState] = useRecoilState(userInfoState);

  return (
    <div className="mt-[80px]">
      {userState.isLogin ? (
        <div className="flex flex-col mt-[10px] max-w-[700px]  mx-auto">
          <ul
            role={"tablist"}
            className=" border-b-2 mb-[30px] border-gray-40 grid grid-cols-3 text-center cursor-pointer text-[14px] font-bold"
          >
            {menu.map((e, i) => (
              <li
                role={"tab"}
                onClick={() => {
                  setMenuIndex(i);
                }}
              >
                <div className="h-[30px] flex items-center justify-center">
                  <span
                    className={`${
                      selectedMenuIndex === i ? "active" : ""
                    } h-[34px]`}
                  >
                    {e}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {menuList[selectedMenuIndex]}
        </div>
      ) : (
        <div className="mt-[100px] text-center ">로그인 상태가 아닙니다.</div>
      )}

      <style jsx>{`
        .active {
          border-bottom: 2px solid black;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
