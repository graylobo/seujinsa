import React, { useEffect, useState } from "react";
import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import TierComponent from "./TierComponent";
const Wrapper = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
  }
  .info-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #d8d2af;
    width: 100%;
    max-width: 300px;
    height: 100%;
    max-height: 300px;
    border-radius: 5px;
  }
  .gamer-name {
    letter-spacing: 3px;
  }
`;

const tierList = [
  "주(기둥)",
  "갑",
  "을",
  "병",
  "정",
  "무",
  "기",
  "경",
  "신",
  "임",
  "계",
];

function MiddleContainer({ tierName, gamerList }) {
  const defaultCSS =
    "flex flex-col items-center p-[30px] bg-blue-100 mb-[30px]";
  return (
    <div className={`${defaultCSS} `}>
      <div className="mb-[10px] text-[20px] font-semibold">{tierName}</div>
      <TierComponent gamerList={gamerList}></TierComponent>
    </div>
  );
}

export default function TierContainer() {
  const [zeroTier, setZeroTier] = useState([]);
  const [oneTier, setOneTier] = useState([]);
  const [twoTier, setTwoTier] = useState([]);
  const [threeTier, setThreeTier] = useState([]);
  const [fourTier, serFourTier] = useState([]);
  const [fiveTier, setFiveTier] = useState([]);
  const [sixTier, setSixTier] = useState([]);
  const [sevenTier, setSevenTier] = useState([]);
  const [eightTier, setEightTier] = useState([]);
  const [nineTIer, setNineTier] = useState([]);
  const [tenTier, setTenTier] = useState([]);
  let gamerList = [
    { name: "김지성", point: { zero: 2, one: 1, two: 2 } },
    { name: "유영진", point: { zero: 0, one: 2, two: 1 } },
    { name: "이재호", point: { zero: 1, one: 0, two: 2 } },
    { name: "홍구", point: { zero: 0, one: 1, two: 2 } },
    { name: "송병구", point: { zero: 0, one: 1, two: 2 } },
    { name: "최호선", point: { zero: 3, one: 1, two: 2 } },
  ];
  useEffect(() => {
    const sortedGamerList = gamerList.map((e) => {
      let sortable = [];
      for (const key in e.point) {
        sortable.push([key, e.point[key]]);
      }
      sortable.sort((a, b) => {
        if (a[1] === b[1]) {
          return -1;
        } else {
          return b[1] - a[1];
        }
      });
      return { name: e.name, tier: sortable[0][0] };
    });
    console.log(sortedGamerList);

    let zeroTemp = [];
    let oneTemp = [];
    let twoTemp = [];
    let threeTemp = [];
    let fourTemp = [];
    let fiveTemp = [];
    let sixTemp = [];
    let sevenTemp = [];
    let eightTemp = [];
    let nineTemp = [];
    let tenTemp = [];

    sortedGamerList.map((e) => {
      switch (e.tier) {
        case "zero":
          zeroTemp.push(e.name);
          break;
        case "one":
          oneTemp.push(e.name);
          break;
        case "two":
          twoTemp.push(e.name);
          break;
        case "three":
          threeTemp.push(e.name);
          break;
        case "four":
          fourTemp.push(e.name);
          break;
        case "five":
          fiveTemp.push(e.name);
          break;
        case "six":
          sixTemp.push(e.name);
          break;
        case "seven":
          sevenTemp.push(e.name);
          break;
        case "eight":
          eightTemp.push(e.name);
          break;
        case "nine":
          nineTemp.push(e.name);
          break;
        case "ten":
          tenTemp.push(e.name);
          break;
      }
    });

    setZeroTier(zeroTemp);
    setOneTier(oneTemp);
    setTwoTier(twoTemp);
    setThreeTier(threeTemp);
    serFourTier(fourTemp);
    setFiveTier(fiveTemp);
    setSixTier(sixTemp);
    setSevenTier(sevenTemp);
    setEightTier(eightTemp);
    setNineTier(nineTemp);
    setTenTier(tenTemp);
  }, []);
  return (
    <Wrapper className="">
      <MiddleContainer tierName={"주(기둥)"} gamerList={zeroTier} />
      <MiddleContainer tierName={"갑"} gamerList={oneTier} />
      <MiddleContainer tierName={"을"} gamerList={twoTier} />
      <MiddleContainer tierName={"병"} gamerList={zeroTier} />
      <MiddleContainer tierName={"정"} gamerList={zeroTier} />
      <MiddleContainer tierName={"무"} gamerList={zeroTier} />
      <MiddleContainer tierName={"기"} gamerList={zeroTier} />
      <MiddleContainer tierName={"경"} gamerList={zeroTier} />
      <MiddleContainer tierName={"신"} gamerList={zeroTier} />
      <MiddleContainer tierName={"임"} gamerList={zeroTier} />
      <MiddleContainer tierName={"계"} gamerList={zeroTier} />
    </Wrapper>
  );
}
