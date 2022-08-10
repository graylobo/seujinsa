import React, { useEffect, useState } from "react";
import { getWholeGamerInfo } from "../utils/api-util";
import { SyncLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
import { isMobileState, themeState } from "../recoil/states";
import HeadMeta from "./shared/HeadMeta";
import styled from "@emotion/styled";

const Wrapper = styled.main`
  .gamer-name{
    width:50px;
  }
  .테란{
    color: blue;
    font-weight: 600;
    &.dark {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px blue, 0 0 10px blue, 0 0 21px blue, 0 0 42px blue, 0 0 82px blue, 0 0 92px blue, 0 0 102px blue, 0 0 151px blue;
    }
  }
  .저그{
    color: #d63deb;
    font-weight: 600;
    &.dark {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px red, 0 0 10px red, 0 0 21px red, 0 0 42px red, 0 0 82px red, 0 0 92px red, 0 0 102px red, 0 0 151px red;
    }
  }
  .프로토스{
    color: orange;
    font-weight: 600;
    &.dark {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px #ddc83d, 0 0 10px #ddc83d, 0 0 21px #ddc83d, 0 0 42px #ddc83d, 0 0 82px #ddc83d, 0 0 92px #ddc83d, 0 0 102px #ddc83d,
        0 0 151px #ddc83d;
    }
  }
`;
const headerProps = {
  title: "스타대학표",
  description:
    "스타대학,스타크래프트 대학,아프리카 스타대학,아프리카 대학,쳘기중대,바스포드,무친대,염석대,JSA,NSU,캄성여대,보신대,학버드,우끼끼즈,파이스트",
  url: "https://seujinsa.com/univ",
};
const universityList = ["철와대", "바스포드", "무친대", "우끼끼즈", "캄성여대", "CP", "JSA", "NSU", "아마대", "츠나대", "MSG", "라저대"];
const tierPriority:any = { 갓: 1, 킹: 2, 잭: 3, 조커: 4, 0: 5, 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 아기: 14 };
export default function University() {
  const [gamerList, setGamerList] = useState<any>();
  const theme = useRecoilValue(themeState);
  const [loading, setLoading] = useState(true);
  const [gamerCount, setGamerCount] = useState(0);
  const isMobile = useRecoilValue(isMobileState);

  let loadCount = 0;
  function onAllImageLoad() {
    loadCount++;
    console.log(loadCount, gamerCount);
    if (loadCount === gamerCount) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWholeGamerInfo().then((e) => {
      e = e.reduce(
        (acc: any, cur: any) => {
          switch (cur.university) {
            case "철와대":
              acc["철와대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "바스포드":
              acc["바스포드"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "무친대":
              acc["무친대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "우끼끼즈":
              acc["우끼끼즈"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "캄성여대":
              acc["캄성여대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "CP":
              acc["CP"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "JSA":
              acc["JSA"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "NSU":
              acc["NSU"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "아마대":
              acc["아마대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "츠나대":
              acc["츠나대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "MSG":
              acc["MSG"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
            case "라저대":
              acc["라저대"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;

            default:
              acc["무소속"].push({
                [cur._id]: {
                  race: cur.race,
                  tier: cur.standardTier,
                },
              });
              return acc;
          }
        },
        {
          철와대: [],
          바스포드: [],
          무친대: [],
          우끼끼즈: [],
          캄성여대: [],
          CP: [],
          JSA: [],
          NSU: [],
          아마대: [],
          츠나대: [],
          MSG: [],
          라저대: [],
          무소속: [],
        }
      );
      let sortedGamerList = {};
      // 대학별로 티어점수가 가장 높은순으로 정렬
      for (const key in e) {
        sortedGamerList = {
          ...sortedGamerList,
          [key]: e[key].sort((a: any, b: any) => {
            const key1 =  a[Object.keys(a) as unknown as string].tier;
            const key2 =  b[Object.keys(b) as unknown as string].tier;
            return tierPriority[key1] - tierPriority[key2];
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

  console.log("gamer", gamerList);
  return (
    <Wrapper className="mx-auto pb-[100px] mt-[76px]">
      <HeadMeta {...headerProps} />
      <div className="mb-[30px]">
        {isMobile ? (
          <aside className="w-[320px] mx-auto">
            <ins
              className="kakao_ad_area"
              style={{ display: "none" }}
              data-ad-unit="DAN-P7FMffHS9CGq20Bw"
              data-ad-width="320"
              data-ad-height="100"
            ></ins>
          </aside>
        ) : (
          <aside className="w-[728px] mx-auto">
            <ins
              className="kakao_ad_area"
              style={{ display: "none" }}
              data-ad-unit="DAN-P7FMffHS9CGq20Bw"
              data-ad-width="320"
              data-ad-height="100"
            ></ins>
          </aside>
        )}
      </div>
      {universityList.map((university: any) => (
        <section className="mx-auto w-full max-w-[800px] border-[10px] border-black dark:border-white rounded-[10px] p-[20px] mb-[30px]">
          <div className="w-[250px] h-[250px] mx-auto mb-[30px]">
            <img className="w-full h-full" src={`/images/university/${university}.gif`} alt="" />
          </div>
          <h2>{university}</h2>
          <div>{gamerList && gamerList[university].length}</div>
          <div className="mx-auto w-[62px] mt-[100px] mb-[100px] ">{loading && <SyncLoader color="gold" />}</div>
          <div className="student-container">
            {gamerList !== undefined &&
              gamerList[university]?.map((e: any, i: number) => (
                <div className="w-[170px] flex">
                  <span className="w-[80px] h-[80px] inline-block ">
                    <img
                      className="w-full h-full mr-[5px] rounded-[10%]"
                      src={`/images/gamer/${Object.keys(e)}.png`}
                      onLoad={() => {
                        onAllImageLoad();
                      }}
                      onError={({ currentTarget }) => {
                        onAllImageLoad();
                        currentTarget.onerror = null;
                        currentTarget.src = "/images/gamer/notfound.png";
                      }}
                      alt=""
                    />
                  </span>
                  <div className="ml-[5px] text-[15px]">
                    <div className={`${e[Object.keys(e) as unknown as string]?.race} ${theme==="dark"?"dark":""}` } >{e[Object.keys(e) as unknown as string]?.tier} Tier</div>
                    <div className={`gamer-name ${e[Object.keys(e) as unknown as string]?.race} ${theme==="dark"?"dark":""}`}>{Object.keys(e)}</div>
                    {/* <div>{e[Object.keys(e) as unknown as string]?.race}</div> */}
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
      <style jsx>{`
        .student-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          grid-gap: 10px;
        }
      `}</style>
    </Wrapper>
  );
}
