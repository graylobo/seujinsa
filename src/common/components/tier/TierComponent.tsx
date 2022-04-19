import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamerState, userInfoState, GamerInfoType } from "../../recoil/states";
import GamerInfoPopup from "./GamerInfoPopup";
export default function TierComponent({ gamerList }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
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
  console.log("zz ", gamerList);
  return (
    <div className="container">
      {showInfo && <GamerInfoPopup setShowInfo={setShowInfo} />}
      {gamerList.map((gamer: GamerInfoType) => {
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
            onClick={async () => {
              await getGamerInfo(gamer._id);
            }}
            key={gamer._id}
          >
            <div className="img-container w-full h-[83px] shadow  border-red">
              <img
                className="gamer-image w-full h-full "
                src={`/images/gamer/${gamer._id}.png`}
                alt=""
              />
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
      `}</style>
    </div>
  );
}
