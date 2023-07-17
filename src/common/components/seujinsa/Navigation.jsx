import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { gamerState, isMobileState, themeState, topTenGamerList } from "../../recoil/states";
import SideBar from "../navigation/SideBar";
import styled from "styled-components";

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

    document.documentElement.classList.add("light");
    localStorage.setItem("color-theme", "light");
    setTheme("light");
    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      themeToggleLightIcon?.classList.remove("hidden");
    } else {
      setTheme("light");
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
          document.documentElement.classList.remove("light");
          localStorage.setItem("color-theme", "dark");
          setTheme("dark");
        } else {
          document.documentElement.classList.add("light");
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
          setTheme("light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
          setTheme("light");
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

  return (
    <Wrapper>
      <NavigationContainer>
        <Link href={"/"}>
          <NaviTitle>SEARCH ONE</NaviTitle>
        </Link>
        <NaviRight>
          <button id="theme-toggle" type="button" className="">
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
          <HambergerMenu
            src="/images/hamburger-black.svg"
            onClick={() => {
              setMenu((e) => !e);
            }}
          ></HambergerMenu>
        </NaviRight>
      </NavigationContainer>
    </Wrapper>
  );
}

const Wrapper = styled.nav``;
const NaviTitle = styled.span`
  font-size: 30px;
`;

const HambergerMenu = styled.img`
  cursor: pointer;
`;

const NaviRight = styled.div`
  display: flex;
  gap: 30px;
`;

const NavigationContainer = styled.div`
  position: absolute;
  display: flex;
  width: 800px;
  left: 50%;
  transform: translateX(-50%);
  justify-content: space-between;
`;
