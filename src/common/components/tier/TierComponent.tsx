import React, { useEffect, useState } from "react";
import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { gamerState, IGamerInfo } from "../../recoil/states";

function SubTier({ tier, name, point }: any) {
  async function vote(params: any) {
    await fetch("http://localhost:3003/");
  }
  return (
    <div className=" w-full flex justify-center">
      <div className="relative mb-[3px]">
        {tier}: {point || 0}
        <button className="absolute right-[-40px] text-[13px] p-[2px] border-[1px] rounded-[2px] border-blue-800">
          투표
        </button>
      </div>
    </div>
  );
}

export default function TierComponent({ gamerList }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  async function getGamerInfo(gamer: string) {
    const res = await fetch(`http://localhost:3003/gamer-info/${gamer}`);
    const json = await res.json();
    setGamerInfo(json);
    setShowInfo(true);
  }
  return (
    <div className="container">
      {showInfo && (
        <div className="info-popup flex flex-col items-center relative">
          <span
            className="absolute right-3 cursor-pointer text-[20px]"
            onClick={() => {
              setShowInfo(false);
            }}
          >
            x
          </span>
          <div className="mt-[10px] gamer-name">{gamerInfo._id}</div>
          <SubTier
            tier={"갑"}
            name={gamerInfo._id}
            point={gamerInfo.point?.one}
          ></SubTier>
          <SubTier
            tier={"을"}
            name={gamerInfo._id}
            point={gamerInfo.point?.two}
          ></SubTier>
          <SubTier
            tier={"병"}
            name={gamerInfo._id}
            point={gamerInfo.point?.three}
          ></SubTier>
          <SubTier
            tier={"정"}
            name={gamerInfo._id}
            point={gamerInfo.point?.four}
          ></SubTier>
          <SubTier
            tier={"경"}
            name={gamerInfo._id}
            point={gamerInfo.point?.five}
          ></SubTier>
        </div>
      )}

      {gamerList.map((gamer: string) => {
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              getGamerInfo(gamer);
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
