import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamerState, userInfoState } from "../../recoil/states";
import GamerInfoPopup from "./GamerInfoPopup";
export default function TierComponent({ gamerList }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  async function getGamerInfo(gamer: string) {
    let res = await fetch(`https://seujinsa.herokuapp.com/gamer-info/${gamer}`);
    let json = await res.json();
    setGamerInfo(json);

    if (userInfo._id) {
      res = await fetch(`https://seujinsa.herokuapp.com/user-info/${userInfo._id}`);
      json = await res.json();
      setUserInfo({...json,isLogin:true});
    }

    setShowInfo(true);
  }

  return (
    <div className="container">
      {showInfo && <GamerInfoPopup setShowInfo={setShowInfo} />}
      {gamerList.map((gamer: string) => {
        return (
          <div
            className="cursor-pointer"
            onClick={async () => {
              await getGamerInfo(gamer);
            }}
            key={gamer}
          >
            <img
              className="gamer-image"
              src={`/images/gamer/${gamer}.png`}
              alt=""
            />
            <span>{gamer}</span>
          </div>
        );
      })}
    </div>
  );
}
