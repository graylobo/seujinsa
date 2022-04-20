import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userInfoState, logoutState } from "../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTube from "react-youtube";
export default function Main() {
  const userInfo = useRecoilValue(userInfoState);
  const [logout, setLogout] = useRecoilState(logoutState);
  const [isMute, setMute] = useState(true);
  const [videoLoad, setVideoLoad] = useState(false);
  const muteRef = useRef<any>();
  // const [width, setWidth] = useState<number>(window.innerWidth);

  // 모바일 사이즈인지 체크하는 함수
  // function handleWindowSizeChange() {
  //   setWidth(window.innerWidth);
  // }
  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //   };
  // }, []);

  // const isMobile = width <= 768;
  useEffect(() => {
    if (logout) {
      toast.info("로그아웃 되었습니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      setLogout(false);
    }
  }, [logoutState]);
  const opts = {
    width: "100%",
    height: "100%",

    playerVars: {
      controls: 0,
      autoplay: 1,
      loop: 1,
      playlist: "A5AmE_b68cg",
    },
  };

  useEffect(() => {
    if (videoLoad) {
      setTimeout(() => {
        muteRef.current.playVideo();
        console.log(muteRef.current);
      }, 3000);
    }
  }, [videoLoad]);

  return (
    <div className="mt-[30px]">
      <ToastContainer />
      <div className="absolute w-full h-[90%] top-[10%] left-0 ">
        <div className="absolute   w-full h-full top-0 left-0 "></div>
        <YouTube
          videoId="A5AmE_b68cg"
          opts={opts}
          // containerStyle={styles.promAlert}
          containerClassName={"h-full"}
          onReady={(e) => {
            e.target.mute();
            e.target.playVideo();
            muteRef.current = e.target;
            setVideoLoad(true);
          }}
        />
        {/* <img src="/star-cat.jpg" alt="" /> */}

        <div className="flex justify-center">
          {isMute ? (
            <button
              onClick={() => {
                muteRef.current.unMute();
                setMute(false);
              }}
              className="absolute z-50 my-auto bottom-[60px] text-white"
            >
              음소거 해제
            </button>
          ) : (
            <button
              onClick={() => {
                muteRef.current.mute();
                setMute(true);
              }}
              className="absolute z-50 my-auto bottom-[60px] text-white"
            >
              음소거
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
