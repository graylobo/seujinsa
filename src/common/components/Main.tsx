import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { logoutState } from "../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Main() {
  const [logout, setLogout] = useRecoilState(logoutState);
  const [isMute, setMute] = useState(true);
  const [videoLoad, setVideoLoad] = useState(false);
  const muteRef = useRef<any>();

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
      }, 3000);
    }
  }, [videoLoad]);

  return (
    <main className="mt-[30px] ">
      <ToastContainer />
      <div className="cutton"></div>
      <video id="video" src="./backvideo.mp4" autoPlay loop muted></video>
      {/* <img id="video" src="./back.gif" alt="" /> */}

      <style jsx>{`
        .cutton {
          width: 100%;
          background-color: gray;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          opacity: 0.5;
        }
        #video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -100;
        }
      `}</style>
    </main>
  );
}
