import React, { useEffect, useState } from "react";
import { setGamerTierList } from "../utils/api-util";
import { SyncLoader } from "react-spinners";
import Kakao from "./ad/Kakao";
type GamerType = {
  [key: string]: [];
};

const universityList = [
  "무친대",
  "바스포드",
  "염석대",
  "우끼끼즈",
  "철기중대",
  "캄성여대",
  "파이스트",
  "학버드",
  "CP대",
  "JSA",
  "NSU",
];
export default function University() {
  const [gamerList, setGamerList] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [gamerCount, setGamerCount] = useState(0);

  let loadCount = 0;
  function onAllImageLoad(i: number) {
    loadCount++;
    if (loadCount === gamerCount) {
      setLoading(false);
    }
  }

  useEffect(() => {
    setGamerTierList().then((e) => {
      e = e.reduce(
        (acc: any, cur: any) => {
          switch (cur.university) {
            case "무친대":
              acc["무친대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "바스포드":
              acc["바스포드"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "염석대":
              acc["염석대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "우끼끼즈":
              acc["우끼끼즈"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "철기중대":
              acc["철기중대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "캄성여대":
              acc["캄성여대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "파이스트":
              acc["파이스트"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "학버드":
              acc["학버드"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "CP대":
              acc["CP대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "JSA":
              acc["JSA"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            case "NSU":
              acc["NSU"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
            default:
              acc["무소속"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.tier,
                  tierPoint: cur.tierPoint,
                },
              });
              return { ...acc };
          }
        },
        {
          무친대: [],
          바스포드: [],
          우끼끼즈: [],
          염석대: [],
          철기중대: [],
          캄성여대: [],
          파이스트: [],
          학버드: [],
          CP대: [],
          JSA: [],
          NSU: [],
          무소속: [],
        }
      );
      let sortedGamerList = {};
      // 대학별로 티어점수가 가장 높은순으로 정렬
      for (const key in e) {
        sortedGamerList = {
          ...sortedGamerList,
          [key]: e[key].sort((a: any, b: any) => {
            return (
              b[Object.keys(b) as unknown as string].tierPoint -
              a[Object.keys(a) as unknown as string].tierPoint
            );
          }),
        };
      }
      let count = 0;
      for (const key in e) {
        if (key === "무소속") {
          continue;
        }
        count += e[key].length;
      }
      setGamerList(sortedGamerList);
      setGamerCount(count);
    });
  }, []);

  return (
    <div className="mx-auto pb-[100px] mt-[76px]">
      <div className="mb-[30px]">
        <Kakao />
      </div>
      {universityList.map((university: any) => (
        <div className="mx-auto w-full max-w-[800px] border-[10px] border-black rounded-[10px] p-[20px] mb-[30px]">
          <div className="w-[250px] h-[250px] mx-auto mb-[30px]">
            <img
              className="w-full h-full"
              src={`/images/university/${university}.gif`}
              alt=""
            />
          </div>
          {/* <div>{gamerList && gamerList[university].length}</div> */}
          <div className="mx-auto w-[62px] mt-[100px] mb-[100px] ">
            {loading && <SyncLoader />}
          </div>
          <div className="student-container">
            {gamerList !== undefined &&
              gamerList[university]?.map((e: any, i: number) => (
                <div className="w-[170px] flex">
                  <span className="w-[80px] h-[80px] inline-block ">
                    <img
                      className="w-full h-full mr-[5px] rounded-[10%]"
                      src={`/images/gamer/${Object.keys(e)}.png`}
                      onLoad={() => {
                        onAllImageLoad(i);
                      }}
                      alt=""
                    />
                  </span>
                  <div className="ml-[5px] text-[15px]">
                    <div className="neonText">
                      {e[Object.keys(e) as unknown as string]?.tier}
                    </div>
                    <div>{Object.keys(e)}</div>
                    <div>{e[Object.keys(e) as unknown as string]?.race}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <style jsx>{`
        .student-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          grid-gap: 10px;
        }
      `}</style>
    </div>
  );
}
