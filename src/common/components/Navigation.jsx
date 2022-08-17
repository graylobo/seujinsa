import Link from "next/link";
import React, { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { isMobileState, topTenGamerList, gamerState, themeState } from "../recoil/states";
import { setGamerTierList } from "../utils/api-util";

export default function Navigation({ setMenu }) {
  const setIsMobile = useSetRecoilState(isMobileState);
  const setTopTenGamerList = useSetRecoilState(topTenGamerList);
  const setTheme = useSetRecoilState(themeState);
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  //모바일 사이즈여부 체크
  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 1023);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    handleWindowSizeChange();
    var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
    setTheme("dark");
    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      themeToggleLightIcon?.classList.remove("hidden");
    } else {
      setTheme("normal");
      themeToggleDarkIcon?.classList.remove("hidden");
    }

    var themeToggleBtn = document.getElementById("theme-toggle");

    themeToggleBtn?.addEventListener("click", function () {
      // toggle icons inside <button></button>
      themeToggleDarkIcon?.classList.toggle("hidden");
      themeToggleLightIcon?.classList.toggle("hidden");

      // if set via local storage previously
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
          setTheme("dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
          setTheme("normal");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
          setTheme("normal");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
          setTheme("dark");
        }
      }
    });
    document.querySelector("body").classList.add("dark:bg-black", "dark:text-white");
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    // setGamerTierList().then((gamerList) => {
    //   gamerList = gamerList
    //     .sort((a, b) => {
    //       return b.totalPoint - a.totalPoint;
    //     })
    //     .slice(0, 10)
    //     .map((e) => {
    //       let race = "";
    //       switch (e.race) {
    //         case "저그":
    //           race = "Z";
    //           break;
    //         case "테란":
    //           race = "T";
    //           break;
    //         case "프로토스":
    //           race = "P";
    //           break;
    //       }
    //       return { ...e, race };
    //     });
    //   setTopTenGamerList(gamerList);
    // });
  }, [gamerInfo]);

  return (
    <nav className=" h-[56px] px-[20px] fixed w-full justify-center flex  top-0 z-[1000] navigation-container text-black">
      <div className="max-w-[700px] flex items-center w-full justify-around relative">
        <Link href={"/"}>
          {/* <span className={`text-[30px] cursor-pointer subject absolute top-[5px] left-[0px]`}>
          스<span className="text-[18px]">타에</span>진
          <span className="text-[18px]">심인</span>사
          <span className="text-[18px]">이트</span>
        </span> */}
          <span className={`text-[30px] cursor-pointer subject absolute top-[5px] left-[0px]`}>스진사 스타티어표</span>
        </Link>
        <button
          id="theme-toggle"
          type="button"
          className="absolute right-[30px] top-[5px] text-[30px]  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <svg id="theme-toggle-dark-icon" className="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg id="theme-toggle-light-icon" className="w-5 h-5 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <span
          className="material-symbols-outlined cursor-pointer absolute right-[0px] top-[10px] text-[30px] "
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
