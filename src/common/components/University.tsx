import React, { useEffect, useState } from "react";
import { setGamerTierList } from "../utils/api-util";

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
  const [gamerList, setGamerList] = useState<GamerType>();
  const [univ, setUniv] = useState([]);

  useEffect(() => {
    setGamerTierList().then((e) => {
      e = e.reduce(
        (acc: any, cur: any) => {
          switch (cur.university) {
            case "무친대":
              acc["무친대"].push({
                [cur._id]: { race: cur.race, tier: cur.tier },
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
      setGamerList(sortedGamerList);
    });
  }, []);

  return (
    <div className="mx-auto pb-[100px]">
      {universityList.map((university: any) => (
        <div className="mx-auto w-full max-w-[800px] border-[10px] border-black rounded-[10px] p-[20px] mb-[30px]">
          <div className="w-[250px] h-[250px] mx-auto mb-[30px]">
            <img
              className="w-full h-full"
              src={`/images/university/${university}.gif`}
              alt=""
            />
          </div>
          <div className="student-container">
            {gamerList !== undefined &&
              gamerList[university]?.map((e: any) => (
                <div className="w-[170px] flex">
                  <span className="w-[80px] h-[80px] inline-block ">
                    <img
                      className="w-full h-full mr-[5px] rounded-[10%]"
                      src={`/images/gamer/${Object.keys(e)}.png`}
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