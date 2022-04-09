import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { menuState } from "../recoil/menu-states";
export default function Navigation({ setMenu }) {
  return (
    <div className=" relative">
      <Link href={"/"}>
        <span className="text-[30px] cursor-pointer subject absolute left-[0px] ">
          스<span className="text-[18px]">타에</span>진
          <span className="text-[18px]">심인</span>사
          <span className="text-[18px]">이트</span>
        </span>
      </Link>

      <span
        className="material-icons-outlined cursor-pointer absolute right-[0px] text-[30px] "
        onClick={() => {
          setMenu((e) => !e);
        }}
      >
        more_horiz
      </span>
    </div>
  );
}
