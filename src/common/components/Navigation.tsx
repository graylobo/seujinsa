import React from "react";
import { useRecoilState } from "recoil";
import { menuState } from "../recoil/menu-states";
export default function Navigation() {
  const [menu, setMenu] = useRecoilState(menuState);
  console.log(menu);
  return (
    <div className="h-[100px] w-[700px]">
      <span className="float-left inline-block text-[30px]">
        스<span className="text-[18px]">타에</span>진
        <span className="text-[18px]">심인</span>사
        <span className="text-[18px]">이트</span>
      </span>
      <span
        className="material-icons-outlined cursor-pointer float-right text-[30px]"
        onClick={() => {
          setMenu(!menu);
        }}
      >
        more_horiz
      </span>
    </div>
  );
}
