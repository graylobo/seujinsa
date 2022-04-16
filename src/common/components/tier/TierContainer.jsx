import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TierComponent from "./TierComponent";
import { useRecoilValue } from "recoil";
import { gamerState } from "../../recoil/states";
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
    max-height: 350px;
    border-radius: 5px;
  }
  .gamer-name {
    letter-spacing: 3px;
  }
`;

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
  const [nineTier, setNineTier] = useState([]);
  const [tenTier, setTenTier] = useState([]);
  const [elevenTier, setElevenTier] = useState([]);
  const gamerInfo = useRecoilValue(gamerState);

  useEffect(() => {
    async function getGamerList() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/gamer-list`);
      const json = await res.json();
      const sortedGamerList = json.map((e) => {
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
        // 해당 게이머의 계급포인트중에서 가장 높은 포인트를 가진 계급 찾기
        return { name: e._id, tier: sortable[0][0] };
      });

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
      let elevenTemp = [];

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
          case "eleven":
            elevenTemp.push(e.name);
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
      setElevenTier(elevenTemp);
    }
    getGamerList();
  }, [gamerInfo]);
  return (
    <Wrapper className="">
      <MiddleContainer tierName={"주(기둥)"} gamerList={zeroTier} />
      <MiddleContainer tierName={"갑"} gamerList={oneTier} />
      <MiddleContainer tierName={"을"} gamerList={twoTier} />
      <MiddleContainer tierName={"병"} gamerList={threeTier} />
      <MiddleContainer tierName={"정"} gamerList={fourTier} />
      <MiddleContainer tierName={"무"} gamerList={fiveTier} />
      <MiddleContainer tierName={"기"} gamerList={sixTier} />
      <MiddleContainer tierName={"경"} gamerList={sevenTier} />
      <MiddleContainer tierName={"신"} gamerList={eightTier} />
      <MiddleContainer tierName={"임"} gamerList={nineTier} />
      <MiddleContainer tierName={"계"} gamerList={tenTier} />
      <MiddleContainer tierName={"배치"} gamerList={elevenTier} />
    </Wrapper>
  );
}
