import React, { useCallback, useEffect, useRef, useState } from "react";
import { getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";
import GamerSearchBar from "../../shared/GamerSearchBar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isMobileState, loadingState, searchState } from "../../../recoil/states";
import _ from "lodash";
import { debounce, sleep } from "../../../utils/utils";

const Wrapper = styled.main`
  margin-top: 90px;
  @media screen and (max-width: 1023px) {
    .afreeca-container {
      position: relative;
      border: 3px solid red;
      border-radius: 10px;
      min-width: 100vw;
      min-height: 250px;
      display: flex;
      justify-content: center;
      z-index: 2;
      left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
      &.disable {
        display: none;
      }

      .title {
        font-size: 20px;
        position: absolute;
        top: 10px;
      }

      .viewers {
        position: absolute;
        font-size: 20px;
        bottom: 0px;
      }
      .thumbnail {
        width: 100%;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .afreeca-container {
      position: absolute;
      border: 3px solid red;
      border-radius: 10px;
      min-width: 600px;
      display: flex;
      justify-content: center;
      z-index: 2;
      left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
      &.disable {
        display: none;
      }
      .title {
        font-size: 25px;
        position: absolute;
        top: 10px;
      }

      .viewers {
        position: absolute;
        font-size: 30px;
        bottom: 0px;
      }
      .thumbnail {
        width: 100%;
      }
    }
  }
  .테란 {
    color: blue;
  }
  .저그 {
    color: red;
  }
  .프로토스 {
    color: yellow;
  }
  .stick-container {
    position: sticky;
    top: 10%;
    z-index: 2;

    .search-bar {
      position: absolute;
      right: 5%;
    }
  }

  .tier-container {
    margin-top: 200px;
    display: grid;
    justify-items: center;
    align-items: center;
    .tier-subject {
      font-size: 30px;
      margin-bottom: 30px;
    }
    .gamer-container {
      padding: 30px;
      display: grid;
      width: 100%;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      .onair {
        width: 50px;
        height: 50px;
        position: absolute;
        top: -30px;
        left: 10px;
        z-index: 1;
        cursor: pointer;
      }

      .gamer {
        width: 100px;
        margin-bottom: 60px;
        height: 100px;
        position: relative;
        .afreeca-icon {
          position: absolute;
          right: 0;
          top: 0;
          display: none;
          &.active {
            display: block;
          }
        }
        .record {
          display: none;
          &.active {
            display: block;
          }
        }

        &.no-played {
          opacity: 0.3;
        }
        .selected {
          border: solid 1px red;
        }
        img {
          border-radius: 10px;
        }

        .gamer-image {
          width: 70px;
          height: 70px;
        }
      }
    }
  }
`;

const tierList = ["갓", "킹", "잭", "조커", "0", "1", "2", "3", "4", "5", "6", "7", "8", "아기", "미지정"];

const initTierValue = {
  갓: [],
  킹: [],
  잭: [],
  조커: [],
  "0": [],
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [],
  "7": [],
  "8": [],
  아기: [],
  미지정: [],
};

const switchData: any = {
  "박상현(짭제)": "박상현",
  "윤찬희(몽군)": "윤찬희",
  "손경훈(브신)": "손경훈",
  철구: "이예준(철구)",
  이예준: "이예준(철구)",
  기뉴다: "박현재(기뉴다)",
  박현재: "박현재(기뉴다)",
  박정일: "박정일(짭호)",
  유규민: "유규민(초난강)",
  빡죠스: "박종승(빡죠스)",
  박종승: "박종승(빡죠스)",
  장영근: "장영근(난수)",
  박지호: "박지호(라박이)",
  김동민: "김동민(액션구드론)",
  윤호준: "윤호준(고도준)",
  미동미동: "박준영(미동미동)",
  박준영: "박준영(미동미동)",
  허유진: "허유진(허유)",
  박성용: "박성용(소룡)",
};
function nickNameSwitch(gamer: string) {
  return switchData[gamer];
}
export default function PlayerContainer() {
  const [searchValue, setSearchValue] = useRecoilState(searchState);
  const [gamerList, setGamerList] = useState<any>(initTierValue);
  const [initialGamerList, setInitialGamerList] = useState<any>(initTierValue); // 서버에서 받아온 초기 데이터 (setGamerList 와 구분짓는 이유: [1] useEffect참고 )
  const [selectedGamer, setSelectedGamer] = useState<any>({});
  const [currentGamerRecord, setCurrentGamerRecord] = useState<any>({}); // 현재 클릭한 게이머의 상대전적 정보가 있는 리스트
  const [backgroundClick, setBackgroundClick] = useState(false);
  const [showThumbNail, setShowThumbNail] = useState(false);
  const [onAirGamer, setOnAirGamer] = useState("");
  const [count, setCount] = useState(0);
  const [intervalUpdateFlag, setIntervalUpdateFlag] = useState(false);
  const [gamerCount, setGamerCount] = useState(0); // 필터 > 이름검색시 결과 카운트 변수
  const setLoading = useSetRecoilState(loadingState);
  const isMobile = useRecoilValue(isMobileState);
  const selectedRef = useRef<any>();
  const onAirThumbNailRef = useRef<any>();

  function getWholeGamerInfoWrapper() {
    return new Promise<void>((resolve, reject) => {
      getWholeGamerInfo()
        .then((result) => {
          let copy: any = _.cloneDeep(initTierValue);
          // 서버에서 받아온 게이머리스트를 티어별로 분류
          for (const e of result) {
            copy[e.standardTier]?.push(e);
          }
          copy = setPriority(copy);
          setInitialGamerList(copy);
          setGamerList(copy);
          setIntervalUpdateFlag((e) => !e);
          setLoading({ loading: false });
          resolve();
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  }

  useEffect(() => {
    (async function inner() {
      setLoading({ loading: true, msg: "게이머리스트 가져오는중..." });

      while (true) {
        await getWholeGamerInfoWrapper();
        await sleep(60000);
      }
    })();
    return () => {
      setLoading({ loading: false });
    };
  }, []);

  // [1]
  // 필터링 기능 함수
  useEffect(() => {
    // gamerList를 가 아닌 initialGamerList를 전달하는이유: gamerList를 전달했을때 아래 filter함수에서 빈값을 리턴하는 경우 마지막 라인의 setGamerList 가
    // gamerList를 빈값으로 업데이트 되기때문에, 다음 동작에서 빈값에 대해 filter함수를 수행하게 되므로 setGamerList에 영향을 받지않고 서버에서 받아온
    // 초기상태를 보관하고있는 initialGamerList를 전달해주어야함
    let copy = _.cloneDeep(initialGamerList);
    let count = 0;
    for (const key in copy) {
      // if (searchValue.inputText) {
      //   copy[key] = copy[key].filter((e: any) => e._id.includes(searchValue.inputText));
      // }
      if (searchValue.race !== "전체" && searchValue.race !== "") {
        copy[key] = copy[key].filter((e: any) => e._id === selectedGamer["_id"] || e.race === searchValue.race);
      }
      if (searchValue.tier !== "전체" && searchValue.tier !== "") {
        copy[key] = copy[key].filter((e: any) => {
          if (e.standardTier === "아기") {
            e.standardTier = "벌레";
          }
          return e._id === selectedGamer["_id"] || e.standardTier === searchValue.tier;
        });
      }
      if (searchValue.univ !== "전체" && searchValue.univ !== "") {
        if (searchValue.univ === "무소속") {
          copy[key] = copy[key].filter((e: any) => e._id === selectedGamer["_id"] || e.university === "무소속");
        } else {
          copy[key] = copy[key].filter((e: any) => e._id === selectedGamer["_id"] || e.university === searchValue.univ);
        }
      }
      if (searchValue.onair) {
        copy[key] = copy[key].filter((e: any) => e._id === selectedGamer["_id"] || e.afreeca);
        if (searchValue.spon) {
          copy[key] = copy[key].filter((e: any) => e._id === selectedGamer["_id"] || e.afreeca.title.includes("스폰"));
        }
      }

      if (searchValue.recordExist) {
        copy[key] = copy[key].filter((e: any) => {
          if (selectedGamer["_id"] !== e._id) {
            return e._id in currentGamerRecord;
          }
          return e;
        });
      }

      count += copy[key].length;
    }
    copy = setPriority(copy);
    setGamerList(copy);
    setCount(count);
  }, [searchValue, selectedGamer, intervalUpdateFlag]);

  useEffect(()=>{
    setShowThumbNail(false)
  },[searchValue])

  const searchGamerDebounce = useCallback(debounce(searchGamer, 100), [initialGamerList]);

  useEffect(() => {
    searchGamerDebounce(searchValue.inputText)
      .then((result: any) => {
        try {
          let finded = "";
          if (result?.length === 1) {
            finded = result[0]["_id"];
            finded = finded in switchData ? nickNameSwitch(finded) : finded;
          }
          if (searchValue.inputText) {
            setGamerCount(result.length);
          } else {
            setGamerCount(0);
          }
          const elem = document.querySelector<HTMLElement>(`.gamer-${finded || searchValue.inputText}`);
          const position = (elem?.offsetParent as HTMLElement)?.offsetTop;
          if (position) {
            scrollTo(0, (position as number) - 500);
            elem?.click();
          } else {
            setBackgroundClick(true);
          }
        } catch {}
      })
      .catch((e) => console.log("error:", e));
  }, [searchValue.inputText]);
  let prev = useRef(0);

  useEffect(() => {
    try {
      if (!searchValue.recordExist) {
        if (prev.current > 0) {
          // html이 렌더링 되기전에 scroll을 하면 안되므로
          setTimeout(() => {
            scrollTo(0, (prev.current as number) - window.innerHeight / 2);
            prev.current = 0;
          }, 0);
        }
      } else {
        prev.current = (selectedRef?.current.offsetParent as HTMLElement).offsetTop;
      }
    } catch {
      setBackgroundClick(true);
    }
  }, [searchValue.recordExist]);

  useEffect(() => {
    if (backgroundClick) {
      setShowThumbNail(false);
    }
  }, [backgroundClick]);

  function setPriority(arr: any) {
    let copy = _.cloneDeep(arr);
    const priority: any = { 저그: 1, 테란: 2, 프로토스: 3 };
    for (const key in copy) {
      copy[key] = copy[key].sort((a: any, b: any) => {
        return priority[a.race] - priority[b.race];
      });
    }
    return copy;
  }

  function searchGamer(value: string) {
    let copy = _.cloneDeep(initialGamerList);
    let search: any = [];
    for (const key in copy) {
      const find = copy[key].filter((e: any) => e._id.includes(value));
      if (find) {
        search = [...search, ...find];
      }
    }
    return search;
  }
  function renderGamer(gamerInfo: any, i: any) {
    const current = currentGamerRecord?.[gamerInfo._id]; // 현재 랜더링 하려는 게이머가 프로필클릭한 게이머의 상대전적 리스트에 있는 게이머라면 current에 정보 담김
    let gamerClassName = gamerInfo._id in switchData ? nickNameSwitch(gamerInfo._id) : gamerInfo._id;

    return (
      <div
        key={i}
        className={`gamer  ${selectedGamer["_id"] && !backgroundClick && (current || selectedGamer["_id"] === gamerInfo._id ? "" : "no-played")}`}
      >
        {gamerInfo.afreeca && (
          <img
            className="onair"
            src="/on-air.png"
            alt=""
            onClick={() => {
              window.open(`https://play.afreecatv.com/${gamerInfo["afreeca"]["bjID"]}`);
            }}
            // onMouseEnter={() => {
            //   setOnAirGamer(gamerInfo._id);
            //   setShowThumbNail(true);
            // }}
            // onMouseLeave={() => {
            //   setOnAirGamer("");
            //   setShowThumbNail(false);
            // }}
          />
        )}

        <img
          className={`gamer-image gamer-${gamerClassName} ${selectedGamer["_id"] === gamerInfo._id && !backgroundClick ? "selected" : ""}`}
          ref={selectedGamer["_id"] === gamerInfo._id && !backgroundClick ? selectedRef : null}
          src={`/images/gamer/${gamerInfo._id}.png`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/gamer/notfound.png";
          }}
          onClick={(event: any) => {
            event.stopPropagation(); // 해주지않으면 아래에서 setBackgroundClick(false)를 했던것을 다시 상위이벤트에서 setBackgroundClick(true)를 해주게됨
            setBackgroundClick(false);
            setCurrentGamerRecord(gamerInfo.record);
            setSelectedGamer(gamerInfo);

            if (gamerInfo.afreeca) {
              if (onAirThumbNailRef.current) {
                if (showThumbNail) {
                  if (!isMobile) {
                    onAirThumbNailRef.current.style.left = event.target.offsetParent.offsetLeft + "px";
                  }
                  onAirThumbNailRef.current.style.top = event.target.offsetParent.offsetTop - 250 + "px";
                } else {
                  if (isMobile) {
                    onAirThumbNailRef.current.style.top = event.target.offsetParent.offsetTop + "px";
                  } else {
                    onAirThumbNailRef.current.style.top = event.target.offsetParent.offsetTop - 254 + "px";
                    onAirThumbNailRef.current.style.left = event.target.offsetParent.offsetLeft + "px";
                  }
                }
              }

              setOnAirGamer(gamerInfo._id);
              setShowThumbNail(true);
            } else {
              setOnAirGamer("");
              setShowThumbNail(false);
            }
          }}
        />

        <img
          className={`afreeca-icon ${selectedGamer["_id"] === gamerInfo._id && gamerInfo["afreeca"]?.["bjID"] ? "active" : ""}`}
          src="/afreeca.png"
          onClick={() => {
            window.open(`https://bj.afreecatv.com/${gamerInfo["afreeca"]["bjID"]}`);
          }}
          alt=""
        />
        <span className={`${gamerInfo.race}`}>{gamerInfo._id}</span>

        <div
          className={`record ${
            current && !backgroundClick ? "active" : "" // 상대전적이 있고 배경화면 클릭한게 아니면 전적 보여주기
          }`}
        >
          <div>
            {current?.["win"]}
            {current?.["lose"]}
          </div>
          <div>{current?.["rate"]}</div>
        </div>
      </div>
    );
  }

  const searchBarProps = { count, gamerCount, selectedGamer };
  return (
    <Wrapper>
      <div className={`afreeca-container ${showThumbNail && onAirGamer === selectedGamer._id ? "" : "disable"}`} ref={onAirThumbNailRef}>
        <div className="title">{selectedGamer["afreeca"]?.["title"]}</div>
        <div className="viewers">{selectedGamer["afreeca"]?.["viewers"]}</div>
        <img className="thumbnail" src={selectedGamer["afreeca"]?.["imgPath"]}></img>
      </div>
      {isMobile ? (
        <aside className="w-[320px] mx-auto">
          <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-dpnzA4C94ch8HynZ"
            data-ad-width="320"
            data-ad-height="100"
          ></ins>
        </aside>
      ) : (
        <aside className="w-[728px]  mx-auto">
          <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-orPlGTMAwqXbMtbn"
            data-ad-width="320"
            data-ad-height="100"
          ></ins>
        </aside>
      )}
      <div className="stick-container">
        <div className="search-bar">
          <GamerSearchBar {...searchBarProps} />
        </div>
      </div>

      <div
        className="tier-container"
        onClick={() => {
          setBackgroundClick(true);
          setSelectedGamer("");
          setSearchValue({ ...searchValue, recordExist: false });
        }}
      >
        {tierList.map((e, i) => (
          <>
            {gamerList[e].length !== 0 && (
              <div className="tier-subject" key={i}>
                {e === "아기" ? "개벌레" : e === "미지정" ? "미지정" : `${e} 티어`}
              </div>
            )}

            <div className="gamer-container">{gamerList[e].map((e: any, i: any) => renderGamer(e, i))}</div>
          </>
        ))}
      </div>
    </Wrapper>
  );
}
