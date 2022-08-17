import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { getAfreecaLiveInfo, getWholeGamerInfo } from "../utils/api-util";
import { SyncLoader } from "react-spinners";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isMobileState, popupState, searchState, themeState } from "../recoil/states";
import HeadMeta from "./shared/HeadMeta";
import styled from "@emotion/styled";
import UnivInfoPopup from "./popup/UnivInfoPopup";
import _ from "lodash";
import GamerSearchBar from "./shared/GamerSearchBar";
import { debounce, nickNameSwitch, switchData } from "../utils/utils";

const Wrapper = styled.main`
  .stick-container {
    position: sticky;
    top: 10%;
    z-index: 2;

    .search-bar {
      position: absolute;
      right: 5%;
    }
  }

  .info-icon {
    width: 100%;
    text-align: center;
    font-size: 30px;
    cursor: pointer;
    margin-bottom: 50px;
  }
  .record-container {
    width: 80px;
    text-align: center;

    .record {
    }
    .rate {
    }
    position: absolute;
    top: 80px;
  }
  .gamer-image {
    cursor: pointer;
    &.disable {
      opacity: 0.3;
    }
    &.selected {
      border-radius: 10px;
      &.테란 {
        box-shadow: 0 0 0.2rem blue, 0 0 0.2rem blue, 0 0 2rem blue, 0 0 0.8rem blue, 0 0 2.8rem blue, inset 0 0 1.3rem blue;
      }
      &.저그 {
        box-shadow: 0 0 0.2rem red, 0 0 0.2rem red, 0 0 2rem red, 0 0 0.8rem red, 0 0 2.8rem red, inset 0 0 1.3rem red;
      }
      &.프로토스 {
        box-shadow: 0 0 0.2rem yellow, 0 0 0.2rem yellow, 0 0 2rem yellow, 0 0 0.8rem yellow, 0 0 2.8rem yellow, inset 0 0 1.3rem yellow;
      }
    }
  }
  @media screen and (max-width: 1023px) {
    .afreeca-thumbnail {
      width: 100vw;
      height: 300px;
      z-index: 1;
      position: absolute;
      bottom: 100px;
      left: -230px;
      border: 1px solid red;
      font-size: 22px;
      border-radius: 10px;
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;

      .title {
        width: 100%;
        text-align: center;
        position: absolute;
      }
      .viewers {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
      }

      img {
        border-radius: 10px;

        width: 100%;
        height: 100%;
      }
    }
    .gamer-container {
      position: relative;
      .gamer-img-container {
        position: relative;
        .onair {
          width: 40px;
          height: 40px;
          position: absolute;
          top: -23px;
          left: 21px;
          z-index: 1;
          cursor: pointer;
        }
      }
    }

    .univ-container {
      .univ-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
        h2 {
          font-size: 20px;
        }
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .afreeca-thumbnail {
      width: 500px;
      height: 300px;
      z-index: 1;
      position: absolute;
      bottom: 100px;
      left: -230px;
      border: 1px solid red;
      font-size: 22px;
      border-radius: 10px;
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;

      .title {
        width: 100%;
        text-align: center;
        position: absolute;
      }
      .viewers {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
      }

      img {
        border-radius: 10px;

        width: 100%;
        height: 100%;
      }
    }
    .gamer-container {
      position: relative;
      .gamer-img-container {
        position: relative;
        .onair {
          width: 40px;
          height: 40px;
          position: absolute;
          top: -23px;
          left: 21px;
          z-index: 1;
          cursor: pointer;
        }
      }
    }

    .univ-container {
      position: relative;
      .univ-info {
        position: absolute;
        right: 50px;
        top: 50px;
        h2 {
          font-size: 20px;
        }
      }
    }
  }

  .gamer-name {
    width: 50px;
    font-weight:600;
  }
  .테란 {
    color: skyblue;
    &.dark.neon {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px blue, 0 0 10px blue, 0 0 21px blue, 0 0 42px blue, 0 0 82px blue, 0 0 92px blue, 0 0 102px blue, 0 0 151px blue;
    }
    &.light {
      color: blue;
      font-weight: 600;
    }
  }
  .저그 {
    color: #c43ced;
    &.dark.neon {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px red, 0 0 10px red, 0 0 21px red, 0 0 42px red, 0 0 82px red, 0 0 92px red, 0 0 102px red, 0 0 151px red;
    }
    &.light {
      font-weight: 600;
    }
  }
  .프로토스 {
    color: yellow;
    &.dark.neon {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px #ddc83d, 0 0 10px #ddc83d, 0 0 21px #ddc83d, 0 0 42px #ddc83d, 0 0 82px #ddc83d, 0 0 92px #ddc83d, 0 0 102px #ddc83d,
        0 0 151px #ddc83d;
    }
    &.light {
      font-weight: 600;
      color: orange;
    }
  }
`;
const headerProps = {
  title: "스타대학표",
  description:
    "스타대학,스타크래프트 대학,아프리카 스타대학,아프리카 대학,쳘기중대,바스포드,무친대,염석대,JSA,NSU,캄성여대,보신대,학버드,우끼끼즈,파이스트",
  url: "https://seujinsa.com/univ",
};
const univImgPath: any = {
  철와대: "/images/university/철와대.png",
  바스포드: "/images/university/바스포드.png",
  무친대: "/images/university/무친대.gif",
  우끼끼즈: "/images/university/우끼끼즈.png",
  캄성여대: "/images/university/캄성여대.gif",
  CP: "/images/university/CP.png",
  JSA: "/images/university/JSA.gif",
  NSU: "/images/university/NSU.gif",
  아마대: "/images/university/아마대.png",
  츠나대: "/images/university/츠나대.png",
  MSG: "/images/university/MSG.png",
};

const universityList = ["철와대", "바스포드", "무친대", "우끼끼즈", "캄성여대", "CP", "JSA", "NSU", "아마대", "츠나대", "MSG"];
const tierPriority: any = { 갓: 1, 킹: 2, 잭: 3, 조커: 4, 0: 5, 1: 6, 2: 7, 3: 8, 4: 9, 5: 10, 6: 11, 7: 12, 8: 13, 아기: 14 };
export default function University() {
  const [gamerList, setGamerList] = useState<any>();
  const [initialGamerList, setInitialGamerList] = useState<any>();
  const [loadingState, setLoadingState] = useState<any>([]);
  const theme = useRecoilValue(themeState);
  const isMobile = useRecoilValue(isMobileState);
  const setPopup = useSetRecoilState(popupState);
  const [searchValue, setSearchValue] = useRecoilState(searchState);
  const [afreecaInfo, setAfreecaInfo] = useState<any>({});
  const [recordInfo, setRecordInfo] = useState<any>();
  const [backgroundClick, setBackgroundClick] = useState(true);
  const [selectedGamer, setSelectedGamer] = useState<any>({});
  const [mouseOverGamer, setMouseOverGamer] = useState<any>({});
  const [statistics, setStatistics] = useState<any>({});
  const [count, setCount] = useState(0);
  const [gamerCount, setGamerCount] = useState(0); // 필터 > 이름검색시 결과 카운트 변수

  const searchGamerDebounce = useCallback(debounce(searchGamer, 100), [initialGamerList]);

  let copy = loadingState;
  function loadingCheckHandler(univ: string) {
    copy[univ]["imgLoadCount"] = copy[univ]["imgLoadCount"] += 1;
    if (copy[univ]["total"] === copy[univ]["imgLoadCount"]) {
      copy[univ]["showLoading"] = false;
      setLoadingState({ ...loadingState, ...copy });
    }
  }

  useEffect(() => {
    getAfreecaLiveInfo().then((e) => {
      setAfreecaInfo(e);
    });
    getWholeGamerInfo().then((e) => {
      const univInfo = e.reduce(
        (acc: any, cur: any) => {
          switch (cur.university) {
            case "철와대":
              acc["철와대"].push({
                [cur._id]: cur,
              });
              return acc;
            case "바스포드":
              acc["바스포드"].push({
                [cur._id]: cur,
              });
              return acc;
            case "무친대":
              acc["무친대"].push({
                [cur._id]: cur,
              });
              return acc;
            case "우끼끼즈":
              acc["우끼끼즈"].push({
                [cur._id]: cur,
              });
              return acc;
            case "캄성여대":
              acc["캄성여대"].push({
                [cur._id]: cur,
              });
              return acc;
            case "CP":
              acc["CP"].push({
                [cur._id]: cur,
              });
              return acc;
            case "JSA":
              acc["JSA"].push({
                [cur._id]: cur,
              });
              return acc;
            case "NSU":
              acc["NSU"].push({
                [cur._id]: cur,
              });
              return acc;
            case "아마대":
              acc["아마대"].push({
                [cur._id]: cur,
              });
              return acc;
            case "츠나대":
              acc["츠나대"].push({
                [cur._id]: cur,
              });
              return acc;
            case "MSG":
              acc["MSG"].push({
                [cur._id]: cur,
              });
              return acc;
            default:
              acc["무소속"].push({
                [cur._id]: cur,
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
          무소속: [],
        }
      );
      let sortedGamerList = {};
      const loadingStatus: any = {};
      for (const university in univInfo) {
        loadingStatus[university] = { total: univInfo[university].length, imgLoadCount: 0, showLoading: true };
        // 대학별로 티어점수가 가장 높은순으로 정렬
        sortedGamerList = {
          ...sortedGamerList,
          [university]: univInfo[university].sort((a: any, b: any) => {
            const key1 = a[Object.keys(a) as unknown as string].standardTier;
            const key2 = b[Object.keys(b) as unknown as string].standardTier;
            return tierPriority[key1] - tierPriority[key2];
          }),
        };
      }
      let count = 0;
      for (const university in univInfo) {
        if (university === "무소속") {
          continue;
        }
        count += univInfo[university].length;
      }
      setLoadingState(loadingStatus);
      setGamerList(sortedGamerList);
      setInitialGamerList(sortedGamerList);
    });
  }, []);
  useEffect(() => {
    if (gamerList) {
      const univStatistic: any = {};
      for (const university in gamerList) {
        univStatistic[university] = getStatistics(university);
      }
      setStatistics(univStatistic);
    }
  }, [gamerList]);
  useEffect(() => {
    const copy = _.cloneDeep(initialGamerList);
    let count = 0;

    for (const key in copy) {
      if (searchValue.inputText) {
        copy[key] = copy[key].filter((e: any) => e[Object.keys(e)[0]]._id.includes(searchValue.inputText));
      }
      if (searchValue.tier !== "전체" && searchValue.tier) {
        copy[key] = copy[key].filter((e: any) => {
          const gamerName = Object.keys(e)[0];
          return selectedGamer?.["_id"] === e[gamerName]._id || e[gamerName].standardTier === searchValue.tier;
        });
      }
      if (searchValue.race !== "전체" && searchValue.race) {
        copy[key] = copy[key].filter((e: any) => {
          const gamerName = Object.keys(e)[0];
          return selectedGamer?.["_id"] === e[gamerName]._id || e[gamerName].race === searchValue.race;
        });
      }
      if (searchValue.univ !== "전체" && searchValue.univ) {
        copy[key] = copy[key].filter((e: any) => {
          const gamerName = Object.keys(e)[0];
          return selectedGamer?.["_id"] === e[gamerName]._id || e[gamerName].university === searchValue.univ;
        });
      }
      if (searchValue.onair) {
        copy[key] = copy[key].filter((e: any) => {
          const gamerName = Object.keys(e)[0];
          return selectedGamer?.["_id"] === e[gamerName]._id || e[gamerName]._id in afreecaInfo;
        });
        if (searchValue.spon) {
          copy[key] = copy[key].filter((e: any) => {
          const gamerName = Object.keys(e)[0];
            return e[gamerName]._id === selectedGamer["_id"] || afreecaInfo[e[gamerName]._id]["title"].includes("스폰");
          });
        }
      }
      if (searchValue.recordExist) {
        copy[key] = copy[key].filter((e: any) => {
          if (selectedGamer?.["_id"]) {
            const gamerName = Object.keys(e)[0];
            return selectedGamer?.["_id"] === e[gamerName]._id || e[gamerName]._id in recordInfo;
          }
          return e;
        });
      }
      count += copy[key].length;
    }
    setCount(count);
    setGamerList(copy);
  }, [
    searchValue.inputText,
    searchValue.tier,
    searchValue.onair,
    searchValue.race,
    searchValue.recordExist,
    searchValue.univ,
    searchValue.spon,
    selectedGamer,
    backgroundClick,
  ]);
  // useEffect(() => {
  //   searchGamerDebounce(searchValue.inputText)
  //     .then((result: any) => {
  //       setSearchValue({ ...searchValue, race: "", tier: "", onair: false, spon: false, recordExist: false, univ: "" });
  //       try {
  //         let finded = "";
  //         if (result?.length === 1) {
  //           const resultInfo = result[0];
  //           finded = resultInfo[Object.keys(resultInfo)[0]]["_id"];
  //           finded = finded in switchData ? nickNameSwitch(finded) : finded;
  //         }
  //         if (searchValue.inputText) {
  //           setGamerCount(result.length);
  //         } else {
  //           setGamerCount(0);
  //         }
  //         const elem = document.querySelector<HTMLElement>(`.gamer-${finded || searchValue.inputText}`);
  //         if (elem) {
  //           let parent = elem?.offsetParent as HTMLElement;
  //           parent = parent.offsetParent as HTMLElement;
  //           const position = parent.offsetTop;
  //           if (position) {
  //             scrollTo(0, (position as number) - 500);
  //             elem?.click();
  //           }
  //         } else {
  //           setBackgroundClick(true);
  //         }
  //       } catch {}
  //     })
  //     .catch((e) => console.log("error:", e));
  // }, [searchValue.inputText]);

  function getStatistics(university: string) {
    let copy = _.cloneDeep(gamerList);
    const positionTotal = copy?.[university].reduce((acc: any, cur: any) => {
      const position = cur[Object.keys(cur)[0]]["position"];
      if (position) {
        if (position in acc) {
          acc[position] = acc[position] += 1;
        } else {
          acc[position] = 1;
        }
      }
      return acc;
    }, {});
    const statistics = {
      total: gamerList?.[university].length,
      race: {
        zerg: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["race"] === "저그").length,
        terran: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["race"] === "테란").length,
        protoss: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["race"] === "프로토스").length,
      },
      tier: {
        갓: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "갓").length,
        킹: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "킹").length,
        잭: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "잭").length,
        조커: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "조커").length,
        0: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "0").length,
        1: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "1").length,
        2: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "2").length,
        3: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "3").length,
        4: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "4").length,
        5: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "5").length,
        6: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "6").length,
        7: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "7").length,
        8: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "8").length,
        아기: gamerList?.[university].filter((e: any) => e[Object.keys(e)[0]]["standardTier"] === "아기").length,
      },
      position: positionTotal,
    };
    return statistics;
  }
  function searchGamer(value: string) {
    let copy = _.cloneDeep(initialGamerList);
    let search: any = [];
    for (const key in copy) {
      const find = copy[key].filter((e: any) => {
        const gamerName = e[Object.keys(e)[0]]["_id"];
        return gamerName.includes(value);
      });
      if (find) {
        search = [...search, ...find];
      }
    }
    return search;
  }
  const searchBarProps = { count, selectedGamer };
  return (
    <Wrapper className="mx-auto pb-[100px] mt-[76px]">
      <HeadMeta {...headerProps} />
      <div className="stick-container">
        <div className="search-bar">
          <GamerSearchBar {...searchBarProps} />
        </div>
      </div>
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
      {universityList.map((university: any, i) => {
        return (
          gamerList?.[university]?.length > 0 && (
            <section
              onClick={() => {
                setBackgroundClick(true);
                setSelectedGamer(null);
                setMouseOverGamer(null);
                setRecordInfo({});
              }}
              key={i}
              className="univ-container mx-auto w-full max-w-[1100px] border-[10px] border-black dark:border-white rounded-[10px] p-[20px] mb-[30px]"
            >
              <div className="univ-image w-[250px] h-[250px] mx-auto mb-[30px]">
                <img className="w-full h-full" src={univImgPath[university]} alt="" />
              </div>
              <div
                className="info-icon material-symbols-outlined"
                onClick={() => {
                  setPopup({ show: true, component: UnivInfoPopup, content: { [university]: statistics[university] } });
                }}
              >
                info
              </div>
              {loadingState[university]?.["showLoading"] && (
                <div className="mx-auto w-[62px] mt-[100px] mb-[100px] ">
                  <SyncLoader color="gold" />
                </div>
              )}

              <div className="student-container">
                {gamerList &&
                  gamerList[university]?.map((gamerInfo: any, i: number) => {
                    const gamerName = gamerInfo[Object.keys(gamerInfo)[0]]["_id"];
                    let gamerClassName = gamerName in switchData ? nickNameSwitch(gamerName) : gamerName;

                    return (
                      <div className="gamer-container w-[170px] flex mb-[70px]" key={i}>
                        {mouseOverGamer?.["_id"] in afreecaInfo && Object.keys(gamerInfo)[0] === mouseOverGamer?.["_id"] && (
                          <div className="afreeca-thumbnail">
                            <div className="title">{afreecaInfo[mouseOverGamer["_id"]]["title"]}</div>
                            <div className="viewers">{afreecaInfo[mouseOverGamer["_id"]]["viewers"]}</div>
                            <img src={afreecaInfo[mouseOverGamer["_id"]]["imgPath"]} alt="" />
                          </div>
                        )}
                        <div className="w-[70px] h-[70px] gamer-img-container">
                          {Object.keys(gamerInfo)[0] in afreecaInfo && (
                            <img
                              className="onair"
                              src="/on-air.png"
                              onClick={() => {
                                window.open(`https://play.afreecatv.com/${afreecaInfo[Object.keys(gamerInfo)[0]]["bjID"]}`);
                              }}
                            />
                          )}
                          <img
                            onClick={(event) => {
                              event.stopPropagation();
                              setRecordInfo(gamerInfo[Object.keys(gamerInfo)[0]]["record"]);
                              setBackgroundClick(false);
                              setSelectedGamer(gamerInfo[Object.keys(gamerInfo)[0]]);
                              setMouseOverGamer(gamerInfo[Object.keys(gamerInfo)[0]]);
                            }}
                            className={`gamer-image gamer-${gamerClassName} ${
                              selectedGamer?.["_id"] === Object.keys(gamerInfo)[0] ? "selected" : ""
                            } ${selectedGamer?.["race"]} ${
                              // 게이머 이미지 클릭시 선택게이머와 전적이 없는 유저는 opacity 감소(선택한 게이머는 opacity 감소 제외)
                              selectedGamer?.["_id"] !== Object.keys(gamerInfo)[0] &&
                              !(recordInfo && Object.keys(gamerInfo)[0] in recordInfo) &&
                              !backgroundClick
                                ? "disable"
                                : ""
                            } w-full h-full mr-[5px] rounded-[10%]`}
                            onLoad={() => {
                              loadingCheckHandler(university);
                            }}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = "/images/gamer/notfound.png";
                            }}
                            onMouseEnter={() => {
                              if (!isMobile) {
                                setMouseOverGamer(gamerInfo[Object.keys(gamerInfo)[0]]);
                              }
                            }}
                            onMouseLeave={() => {
                              if (!isMobile) {
                                setMouseOverGamer(null);
                              }
                            }}
                            src={`/images/gamer/${Object.keys(gamerInfo)}.png`}
                            alt=""
                          />
                        </div>
                        <div className="player-info-container ml-[5px] text-[14px]">
                          {/* 티어 */}
                          <div
                            className={`${searchValue.neon ? "neon" : ""} ${gamerInfo[Object.keys(gamerInfo) as unknown as string]?.race} ${
                              theme === "dark" ? "dark" : "light"
                            }`}
                          >
                            {gamerInfo[Object.keys(gamerInfo) as unknown as string]?.standardTier} Tier
                          </div>
                          {/* 이름 */}
                          <div
                            className={`${searchValue.neon ? "neon" : ""} gamer-name ${
                              gamerInfo[Object.keys(gamerInfo) as unknown as string]?.race
                            } ${theme === "dark" ? "dark" : "light"}`}
                          >
                            {Object.keys(gamerInfo)}
                          </div>
                          {/* 직급 */}
                          <div className="position">{gamerInfo[Object.keys(gamerInfo) as unknown as string]?.position}</div>
                        </div>
                        {/* 전적표시 */}
                        {recordInfo && Object.keys(gamerInfo)[0] in recordInfo && (
                          <div className="record-container">
                            <div className="record">
                              {recordInfo[Object.keys(gamerInfo)[0]]["win"]}
                              {recordInfo[Object.keys(gamerInfo)[0]]["lose"]}
                            </div>
                            <div className="rate">{recordInfo[Object.keys(gamerInfo)[0]]["rate"]}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          )
        );
      })}
      <style jsx>{`
        .student-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        }
      `}</style>
    </Wrapper>
  );
}
