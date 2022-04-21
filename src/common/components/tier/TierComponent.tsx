import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamerState, userInfoState, GamerInfoType } from "../../recoil/states";
import GamerInfoPopup from "./GamerInfoPopup";
import { PacmanLoader } from "react-spinners";
export default function TierComponent({ gamerList }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [loading, setLoading] = useState(true);
  function onAllImageLoad(i: number) {
    if (i === gamerList.length - 1) {
      console.log("gamerList");
      setLoading(false);
    }
  }

  useEffect(() => {
    // 처음 랜더링시에 gamerList Props
    if (gamerList.length === 0) {
      setLoading(false);
    }
  }, [gamerList]);
  async function getGamerInfo(gamer: string) {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/gamer-info/${gamer}`
    );
    let json = await res.json();
    setGamerInfo(json);

    if (userInfo._id) {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_DB_URL}/user-info/${userInfo._id}`
      );
      json = await res.json();
      setUserInfo({ ...json, isLogin: true });
    }
    setShowInfo(true);
  }

  return (
    <div className="container relative ">
      {showInfo && <GamerInfoPopup setShowInfo={setShowInfo} />}
      <div className="loader ">
        {loading && <PacmanLoader size={20} color="gray" />}
      </div>
      {gamerList.map((gamer: GamerInfoType, index: number) => {
        let raceColor = "";
        switch (gamer.race) {
          case "zerg":
            raceColor = "text-red-600";
            break;
          case "terran":
            raceColor = "text-blue-600";
            break;
          case "protoss":
            raceColor = "text-yellow-600";
            break;
          default:
            raceColor = "text-black";
            break;
        }
        return (
          <div
            className="cursor-pointer w-[83px] h-[113px]"
            onClick={() => {
              getGamerInfo(gamer._id);
            }}
            key={gamer._id}
          >
            <div
              className={`${
                gamer._id === undefined ? "" : "img-container"
              } w-full h-[83px]`}
            >
              {gamer._id === undefined ? (
                <div></div>
              ) : (
                <img
                  className="gamer-image w-full h-full "
                  src={`/images/gamer/${gamer._id}.png`}
                  onLoad={() => {
                    onAllImageLoad(index);
                  }}
                />
              )}
            </div>

            <span className={`inline-block w-full text-center ${raceColor}`}>
              {gamer._id}
            </span>
          </div>
        );
      })}

      <style jsx>{`
        .img-container {
          box-shadow: 0 0 0 2px black;
        }
        .loader {
          width: 40px;
          margin-top: 10px;
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}
