import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { logoutState, topTenGamerList } from "../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRecord } from "../utils/api-util";


export default function Main() {
  const [logout, setLogout] = useRecoilState(logoutState);
  const [record, setRecord] = useState([]);
  const topVotedGamerList = useRecoilValue(topTenGamerList);

  useEffect(() => {
    if (logout) {
      toast.info("로그아웃 되었습니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      setLogout(false);
    }
  }, [logoutState]);

  const switchRaceToInitial = (race: string) => {
    switch (race) {
      case "저그":
        race = "Z";
        break;
      case "프로토스":
        race = "P";
        break;
      case "테란":
        race = "T";
        break;
    }

    return race;
  };

  useEffect(() => {
    getRecord().then((e) => {
      e = e.map((e: any) => {
        let winnerRace = switchRaceToInitial(e.winnerRace);
        let loserRace = switchRaceToInitial(e.loserRace);
        return { ...e, winnerRace, loserRace };
      });
      console.log(e);
      setRecord(e);
    });
  }, []);

  return (
    <main className="  left-0 w-full h-[500px] flex  ">
      <ToastContainer />
      <div className="cutton"></div>
      <video id="video" src="./backvideo.mp4" autoPlay loop muted></video>
      <div className="h-[700px] fixed  w-full overflow-auto  ">
        <div className="h-[1000px]  w-full min-w-[1200px]  relative">
          <div className=" h-[600px] absolute left-[10%] border-[1px] rounded-[5px] border-gray-400 bg-white opacity-[0.8] mt-[30px]">
            <div className="w-full min-w-[500px]  rounded-[5px]   ">
              <div className="text-center p-[20px]">
                <span>최근 전적</span>
              </div>
              <div className="flex justify-center">
                <div>
                  {record.map((e: any) => (
                    <div className=" mb-[10px] text-[15px]">
                      <span className="mr-[10px] text-[13px]">{e.date}</span>
                      <span className=" w-[110px]   inline-block">
                        <span className="w-[25px] h-[25px] inline-block relative">
                          <img
                            className="rounded-[100%] absolute top-[5px]"
                            src={`/images/gamer/${e.winner}.png`}
                            alt=""
                          />
                        </span>
                        {e.winner}
                        {e.winnerRace}
                        [승]
                      </span>
                      <span className="inline-block w-[30px]">vs</span>
                      <span className="mr-[10px]">
                        <span className="w-[25px] h-[25px] inline-block relative">
                          <img
                            className="rounded-[100%] absolute top-[5px]"
                            src={`/images/gamer/${e.loser}.png`}
                            alt=""
                          />
                        </span>
                        {e.loser}
                        {e.loserRace}[패]
                      </span>
                      <span className="mr-[10px]">{e.wayOfPlay}</span>
                      <span>{e.map}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" absolute right-[20%] ">
            <div className="w-[310px] h-[600px] border-[1px] border-gray-400 rounded-[5px]  absolute right-[0px] bg-white opacity-[0.8] mt-[30px]">
              <div className="text-center  p-[20px]">
                <span>인기 플레이어 랭킹</span>
              </div>
              <ol>
                {topVotedGamerList.map((e: any, i) => (
                  <li className="bg-white rounded-[3px] mb-[3px] h-[50px] flex items-center relative">
                    <div className="ml-[25px] w-[16px]">{i + 1}</div>
                    <div className="w-[32px] h-[32px] ml-[10px]">
                      <img
                        className="rounded-[100%] w-full h-full"
                        src={`/images/gamer/${e._id}.png`}
                        alt=""
                      />
                    </div>
                    <div className="ml-[12px] text-[15px]">
                      <span>{e._id}</span>
                      <span className="text-[13px]"> [{e.race}]</span>
                      <div className="text-[13px]">{e.tier} tier</div>
                    </div>
                    <div className="ml-[12px] absolute text-[13px] right-[10px]">
                      <span>{e.totalPoint}p</span>
                    </div>
                    <span></span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cutton {
          width: 100%;
          background-color: #282727;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          opacity: 0.5;
          min-width: 1000px;
        }
        #video {
          width: 100%;
          min-width: 1000px;
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
