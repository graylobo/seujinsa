import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TierComponent from "./TierComponent";
import { useRecoilValue } from "recoil";
import { gamerState } from "../../recoil/states";
const raceList = ["전체", "저그", "프로토스", "테란"];
const universityList = [
  "전체",
  "무소속",
  "철기중대",
  "바스포드",
  "염석대",
  "무친대",
  "우끼끼즈",
  "캄성여대",
  "파이스트",
  "학버드",
  "CP대",
  "JSA",
  "NSU",
];
const Wrapper = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: 10px;
  }
  .top-div {
    margin-top: 30px;
  }
  .info-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    color: white;
    width: 300px;
    height: 100%;
    max-height: 400px;
    border-radius: 5px;
    z-index: 1;
    opacity: 90%;
  }
  .info-background {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
    color: white;
    width: 300px;
    height: 100%;
    max-height: 400px;
    border-radius: 5px;
    z-index: 3;
    opacity: 90%;
  }
  .gamer-name {
    letter-spacing: 3px;
  }
`;

const MemoizedMiddleContainer = React.memo(function MiddleContainer({
  tierName,
  gamerList,
}) {
  const defaultCSS =
    "flex flex-col items-center  p-[30px] bg-gray-100 rounded-[10px] mb-[30px]  min-h-[150px]";

  return (
    <div className={`${defaultCSS} `}>
      <div className="mb-[10px] text-[20px] font-semibold">{tierName}</div>
      <TierComponent gamerList={gamerList}></TierComponent>
    </div>
  );
});

const tierList = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
];
export default function TierContainer() {
  const [zeroTier, setZeroTier] = useState([{}]);
  const [oneTier, setOneTier] = useState([{}]);
  const [twoTier, setTwoTier] = useState([{}]);
  const [threeTier, setThreeTier] = useState([{}]);
  const [fourTier, serFourTier] = useState([{}]);
  const [fiveTier, setFiveTier] = useState([{}]);
  const [sixTier, setSixTier] = useState([{}]);
  const [sevenTier, setSevenTier] = useState([{}]);
  const [eightTier, setEightTier] = useState([{}]);
  const [nineTier, setNineTier] = useState([{}]);
  const [tenTier, setTenTier] = useState([{}]);
  const [elevenTier, setElevenTier] = useState([{}]);
  const [race, setRace] = useState("");
  const [university, setUniversity] = useState("");
  const gamerInfo = useRecoilValue(gamerState);

  useEffect(() => {
    async function getGamerList() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/gamer-list`);
      const json = await res.json();
      let sortedGamerList = json.map((e) => {
        let totalPoint = 0;
        let sortable = [];
        for (const key in e.point) {
          sortable.push([key, e.point[key]]);
          totalPoint += e.point[key];
        }
        sortable.sort((a, b) => {
          if (a[1] === b[1]) {
            return -1;
          } else {
            return b[1] - a[1];
          }
        });
        // 해당 게이머의 계급포인트중에서 가장 높은 포인트를 가진 계급 찾기
        let currentTier = sortable[0][0];
        if (e.level) {
          currentTier = e.level;
        }

        //#region totalPoint 조건별로 티어결정하는 로직
        // let index = 1;
        // let find = false;
        // while (!find) {
        //   switch (currentTier) {
        //     case "one":
        //       if (totalPoint <= 5) {
        //         currentTier = sortable[index++][0];
        //         continue;
        //       }
        //       find = true;
        //       break;
        //     case "two":
        //       if (totalPoint <= 3) {
        //         currentTier = sortable[index++][0];
        //         continue;
        //       }
        //       find = true;
        //       break;
        //     case "three":
        //       if (totalPoint <= 1) {
        //         currentTier = sortable[index++][0];
        //         continue;
        //       }
        //       find = true;
        //       break;
        //     default:
        //       find = true;
        //   }
        // }
        //#endregion
        return {
          _id: e._id,
          tier: currentTier,
          race: e.race,
          university: e.university,
          totalPoint,
          nickName: e.nickName,
        };
      });
      if (race && race !== "전체") {
        sortedGamerList = sortedGamerList.filter((e) => e.race === race);
      }
      if (university && university !== "전체") {
        sortedGamerList = sortedGamerList.filter(
          (e) => e.university === university
        );
      }

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
        if (tierList.includes(e.tier)) {
          switch (e.tier) {
            case "zero":
              zeroTemp.push({
                ...e,
              });
              break;
            case "one":
              oneTemp.push({ ...e });
              break;
            case "two":
              twoTemp.push({ ...e });
              break;
            case "three":
              threeTemp.push({ ...e });
              break;
            case "four":
              fourTemp.push({ ...e });
              break;
            case "five":
              fiveTemp.push({ ...e });
              break;
            case "six":
              sixTemp.push({ ...e });
              break;
            case "seven":
              sevenTemp.push({ ...e });
              break;
            case "eight":
              eightTemp.push({ ...e });
              break;
            case "nine":
              nineTemp.push({ ...e });
              break;
            case "ten":
              tenTemp.push({ ...e });
              break;
            case "eleven":
              elevenTemp.push({ ...e });
              break;
          }
        }
      });
      setZeroTier([...zeroTemp]);
      setOneTier([...oneTemp]);
      setTwoTier([...twoTemp]);
      setThreeTier([...threeTemp]);
      serFourTier([...fourTemp]);
      setFiveTier([...fiveTemp]);
      setSixTier([...sixTemp]);
      setSevenTier([...sevenTemp]);
      setEightTier([...eightTemp]);
      setNineTier([...nineTemp]);
      setTenTier([...tenTemp]);
      setElevenTier([...elevenTemp]);
    }
    getGamerList();
  }, [gamerInfo, race, university]);

  return (
    <Wrapper className="absolute left-0 w-full flex justify-center">
      <div className="top-div"></div>
      <div className="w-[90%]">
        <div className="w-full min-w-[260px]">
          <div className=" text-right">
            <span>종족: </span>
            <select
              onChange={(e) => {
                setRace(e.target.value);
              }}
            >
              {raceList.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </select>
            <span>대학: </span>
            <select
              onChange={(e) => {
                setUniversity(e.target.value);
              }}
            >
              {universityList.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        <MemoizedMiddleContainer tierName={"주(柱)"} gamerList={zeroTier} />
        <MemoizedMiddleContainer tierName={"갑(甲)"} gamerList={oneTier} />
        <MemoizedMiddleContainer tierName={"을(乙)"} gamerList={twoTier} />
        <MemoizedMiddleContainer tierName={"병(丙)"} gamerList={threeTier} />
        <MemoizedMiddleContainer tierName={"정(丁)"} gamerList={fourTier} />
        <MemoizedMiddleContainer tierName={"무(戊)"} gamerList={fiveTier} />
        <MemoizedMiddleContainer tierName={"기(己)"} gamerList={sixTier} />
        <MemoizedMiddleContainer tierName={"경(庚)"} gamerList={sevenTier} />
        <MemoizedMiddleContainer tierName={"신(辛)"} gamerList={eightTier} />
        <MemoizedMiddleContainer tierName={"임(壬)"} gamerList={nineTier} />
        <MemoizedMiddleContainer tierName={"계(癸)"} gamerList={tenTier} />
        <MemoizedMiddleContainer tierName={"배치"} gamerList={elevenTier} />
      </div>
    </Wrapper>
  );
}
