import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { logoutState, topTenGamerList, gamerState } from "../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SyncLoader } from "react-spinners";
import { getRecord, setGamerTierList } from "../utils/api-util";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const gridChild = css`
  height: 600px;
  margin: 0 auto;
  min-width: 425px;
  max-width: 425px;
  border-radius: 5px;
  background-color: white;
  opacity: 0.8;
  margin-top: 30px;
  white-space: nowrap;
  overflow: auto;
`;
const Wrapper = styled.main`
  left: 0;
  width: 100%;
  height: 100vh;
  padding-bottom: 56px;
  padding-top: 56px;
  color: black;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    margin: 0 auto;
    max-width: 1300px;
    gap: 10px;
    .most-voted {
      grid-column: 2/3;
    }
  }
  .grid-container > div {
    ${gridChild}
  }
  @media (max-width: 900px) {
    .grid-container {
      display: block;
    }
    .grid-container > div {
      ${gridChild}
    }
  }
`;
export default function Main() {
  const [logout, setLogout] = useRecoilState(logoutState);
  const [record, setRecord] = useState([]);
  const [currentMonthRecord, setCurrentMonthRecord] = useState([]);
  const [loading, setLoading] = useState(true);
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
    let currentMonthRecordList: any = {};
    getRecord().then((e) => {
      e = e.map((e: any) => {
        let winnerRace = switchRaceToInitial(e.winnerRace);
        let loserRace = switchRaceToInitial(e.loserRace);
        let nowMonth = new Date().getMonth() + 1;
        let recordMonth = e.date.split("-")[1];
        if (recordMonth[0] === "0") {
          recordMonth = recordMonth.slice(1);
        }
        if (Number(recordMonth) === nowMonth) {
          if (!currentMonthRecordList.hasOwnProperty(e.winner)) {
            currentMonthRecordList = {
              ...currentMonthRecordList,
              [e.winner]: { 승: 0, 패: 0 },
            };
          }
          if (!currentMonthRecordList.hasOwnProperty(e.loser)) {
            currentMonthRecordList = {
              ...currentMonthRecordList,
              [e.loser]: { 승: 0, 패: 0 },
            };
          }
          currentMonthRecordList = {
            ...currentMonthRecordList,
            [e.winner]: {
              ...currentMonthRecordList[e.winner],
              승: (currentMonthRecordList[e.winner]["승"] += 1),
              race: winnerRace,
            },
            [e.loser]: {
              ...currentMonthRecordList[e.loser],
              패: (currentMonthRecordList[e.loser]["패"] += 1),
              race: loserRace,
            },
          };
        }
        return { ...e, winnerRace, loserRace };
      });

      currentMonthRecordList = Object.entries(currentMonthRecordList)
        .sort((a: any, b: any) => {
          return b[1]["승"] - b[1]["패"] - (a[1]["승"] - a[1]["패"]); // 이긴횟수가 많은 플레이어 순으로 정렬
        })
        .reduce((acc: any, [k, v]) => {
          acc.push({ [k]: v });
          return acc;
        }, []);
      setCurrentMonthRecord(currentMonthRecordList);
      setRecord(e);
      setLoading(false);
    });
  }, []);

  return (
    <Wrapper>
      <ToastContainer />
      <div className="cutton"></div>
      <video id="video" src="./backvideo.mp4" autoPlay loop muted></video>
      <div className="h-full  w-full overflow-auto ">
        <div className="grid-container">
          {/* <div className="">
            <div className="text-center p-[20px]">
              <span>최근 전적</span>
            </div>
            <div className="flex justify-center">
              <div>
                {loading ? (
                  <div className=" mt-[150px]">
                    <SyncLoader />
                  </div>
                ) : (
                  record.map((e: any) => (
                    <div className=" mb-[10px] text-[15px] ">
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
                  ))
                )}
              </div>
            </div>
          </div> */}
          {/* <div className="most-voted">
            <div className="text-center p-[20px] ">
              <span>최다 민심 득표</span>
            </div>
            <ol>
              {loading ? (
                <div className="flex justify-center mt-[150px]">
                  <SyncLoader />
                </div>
              ) : (
                topVotedGamerList.map((e: any, i) => (
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
                ))
              )}
            </ol>
          </div> */}
          {/* <div className="">
            <div className="text-center  p-[20px]">
              <span>5월 다승 랭킹</span>
            </div>
            <ol>
              {loading ? (
                <div className="flex justify-center mt-[150px]">
                  <SyncLoader />
                </div>
              ) : (
                currentMonthRecord.map((e: any, i) => (
                  <li className="bg-white rounded-[3px] mb-[3px] h-[50px] flex items-center relative">
                    <div className="ml-[25px] w-[16px]">{i + 1}</div>
                    <div className="w-[32px] h-[32px] ml-[10px]">
                      <img
                        className="rounded-[100%] w-full h-full"
                        src={`/images/gamer/${Object.keys(e)}.png`}
                        alt=""
                      />
                    </div>
                    <div className="ml-[12px] text-[15px]">
                      <span>{Object.keys(e)}[</span>
                      <span className="text-[13px]">
                        {e[Object.keys(e) as unknown as string]["race"]}]
                      </span>
                      <span className="text-[13px] ml-[3px]">
                        승: {e[Object.keys(e) as unknown as string]["승"]}
                      </span>
                      <span className="text-[13px]">
                        패: {e[Object.keys(e) as unknown as string]["패"]}
                      </span>
                    </div>
                    <div className="ml-[12px] absolute text-[13px] right-[10px]">
                      <span>{e.totalPoint}p</span>
                    </div>
                    <span></span>
                  </li>
                ))
              )}
            </ol>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        .cutton {
          width: 100%;
          background-color: #282727;
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          opacity: 0.5;
        }
        #video {
          width: 100%;
          height: 100vh;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -100;
        }
      `}</style>
    </Wrapper>
  );
}
