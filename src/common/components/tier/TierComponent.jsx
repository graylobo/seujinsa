import React, { useEffect, useState } from "react";
import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import ZeroTier from "./level/ZeroTier";
import OneTier from "./level/OneTier";
import TwoTier from "./level/TwoTier";
import ThreeTier from "./level/ThreeTier";
import FourTier from "./level/FourTier";
import FiveTier from "./level/FiveTier";
import SixTier from "./level/SixTier";
import SevenTier from "./level/SevenTier";
import EightTier from "./level/EightTier";
import NineTier from "./level/NineTier";
import TenTier from "./level/TenTier";

const Wrapper = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
  }
`;
export default function TierComponent() {
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
    <Wrapper>
      <div>
        주(기둥)
        <ZeroTier gamerList={zeroTier}></ZeroTier>
      </div>
      <div>
        갑<OneTier gamerList={oneTier}></OneTier>
      </div>
      <div>
        을<TwoTier gamerList={twoTier}></TwoTier>
      </div>
      <div>
        병<ThreeTier gamerList={zeroTier}></ThreeTier>
      </div>
      <div>
        정<FourTier gamerList={zeroTier}></FourTier>
      </div>
      <div>
        무<FiveTier gamerList={zeroTier}></FiveTier>
      </div>
      <div>
        기<SixTier gamerList={zeroTier}></SixTier>
      </div>
      <div>
        경<SevenTier gamerList={zeroTier}></SevenTier>
      </div>
      <div>
        신<EightTier gamerList={zeroTier}></EightTier>
      </div>
      <div>
        임<NineTier gamerList={zeroTier}></NineTier>
      </div>
      <div>
        계<TenTier gamerList={zeroTier}></TenTier>
      </div>
    </Wrapper>
  );
}
