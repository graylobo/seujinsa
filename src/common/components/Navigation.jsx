import Link from "next/link";
import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { isMobileState, topTenGamerList, gamerState } from "../recoil/states";
import { setGamerTierList } from "../utils/api-util";

export default function Navigation({ setMenu }) {
  const setIsMobile = useSetRecoilState(isMobileState);
  const setTopTenGamerList = useSetRecoilState(topTenGamerList);
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  //모바일 사이즈여부 체크
  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setGamerTierList().then((gamerList) => {
      gamerList = gamerList
        .sort((a, b) => {
          return b.totalPoint - a.totalPoint;
        })
        .slice(0, 10)
        .map((e) => {
          console.log("z", e);
          let race = "";
          switch (e.race) {
            case "저그":
              race = "Z";
              break;
            case "테란":
              race = "T";
              break;
            case "프로토스":
              race = "P";
              break;
          }
          return { ...e, race };
        });

      setTopTenGamerList(gamerList);
    });
  }, [gamerInfo]);

  return (
    <nav className=" h-[56px] px-[20px] fixed w-full justify-center flex  top-0 z-[1000] navigation-container">
      <div className="max-w-[700px] flex items-center w-full justify-around relative">
        <Link href={"/"}>
          {/* <span className={`text-[30px] cursor-pointer subject absolute top-[5px] left-[0px]`}>
          스<span className="text-[18px]">타에</span>진
          <span className="text-[18px]">심인</span>사
          <span className="text-[18px]">이트</span>
        </span> */}
          <span
            className={`text-[30px] cursor-pointer subject absolute top-[5px] left-[0px]`}
          >
            SEUJINSA
          </span>
        </Link>

        <span
          className="material-icons-outlined cursor-pointer absolute right-[0px] top-[10px] text-[30px] "
          onClick={() => {
            setMenu((e) => !e);
          }}
        >
          more_horiz
        </span>
      </div>
      <style jsx>{`
        .navigation-container {
          background-color: rgba(250, 250, 250, 0.8);
        }
      `}</style>
    </nav>
  );
}
