import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAfreecaLiveInfo, getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";
import GamerSearchBar from "../../shared/GamerSearchBar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isMobileState, loadingState, searchState, themeState } from "../../../recoil/states";
import _ from "lodash";
import { debounce, sleep } from "../../../utils/utils";

const Wrapper = styled.main`
  margin-top: 90px;
  // 모바일
  @media screen and (max-width: 1023px) {
    .tier-container {
      margin-top: 200px;
      display: grid;
      justify-items: center;
      align-items: center;

      .tier-subject {
        font-size: 40px;
        margin-bottom: 30px;
        &.dark {
          text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
        }
      }
    }
    .gamer-container {
      padding: 30px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      text-align: center;
      .onair {
        width: 40px;
        height: 40px;
        position: absolute;
        top: -23px;
        left: 30px;
        z-index: 1;
        cursor: pointer;
      }

      .gamer {
        margin-bottom: 100px;
        width: 100px;
        height: 100px;
        position: relative;
        .gamer-name {
          font-size: 15px;
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
        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .gamer-image {
          border-radius: 10px;
          cursor: pointer;
          width: 70px;
          height: 70px;
        }
      }
    }
    .afreeca-container {
      position: relative;
      border: 3px solid red;
      border-radius: 10px;
      max-width: 100vw;
      width: 400px;
      min-height: 250px;
      display: flex;
      justify-content: center;
      z-index: 2;
      left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
      color: white;
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
        border-radius: 10px;
      }
    }
  }
  // PC
  @media screen and (min-width: 1024px) {
    .tier-container {
      margin-top: 200px;
      display: grid;
      justify-items: center;
      align-items: center;

      .tier-subject {
        font-size: 60px;
        margin-bottom: 30px;
        &.dark {
          text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
        }
      }
    }
    .gamer-container {
      padding: 30px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      text-align: center;
      gap: 0 20px;
      .onair {
        width: 55px;
        height: 55px;
        position: absolute;
        top: -32px;
        left: 23px;
        z-index: 1;
        cursor: pointer;
      }

      .gamer {
        width: 100px;
        margin-bottom: 100px;
        height: 100px;
        position: relative;
        .gamer-name {
          font-size: 19px;
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
        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
        }

        .gamer-image {
          border-radius: 10px;
          cursor: pointer;
          width: 90px;
          height: 90px;
        }
      }
    }
    .afreeca-container {
      position: absolute;
      border: 3px solid red;
      border-radius: 10px;
      min-width: 600px;
      height: 350px;
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
        border-radius: 10px;
      }
    }
  }
  .테란 {
    color: blue;
    font-weight: 600;
    &.dark {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px blue, 0 0 10px blue, 0 0 21px blue, 0 0 42px blue, 0 0 82px blue, 0 0 92px blue, 0 0 102px blue, 0 0 151px blue;
    }
  }
  .저그 {
    color: #d63deb;
    font-weight: 600;
    &.dark {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px red, 0 0 10px red, 0 0 21px red, 0 0 42px red, 0 0 82px red, 0 0 92px red, 0 0 102px red, 0 0 151px red;
    }
  }
  .프로토스 {
    color: orange;
    font-weight: 600;
    &.dark {
      color: #fff;
      font-weight: normal;
      text-shadow: 0 0 7px #ddc83d, 0 0 10px #ddc83d, 0 0 21px #ddc83d, 0 0 42px #ddc83d, 0 0 82px #ddc83d, 0 0 92px #ddc83d, 0 0 102px #ddc83d,
        0 0 151px #ddc83d;
    }
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
  "이예준(철구)": "철구",
  "박현재(기뉴다)": "기뉴다",
  "오진식(짭뉴다)": "짭뉴다",
  "박정일(짭호)": "짭호",
  "유규민(초난강)": "초난강",
  "박종승(빡죠스)": "박종승",
  "장영근(난수)": "난수",
  "박지호(라박이)": "라박이",
  "김동민(액션구드론)": "김동민",
  "윤호준(고도준)": "고도준",
  "박준영(미동미동)": "박준영",
  "박성용(소룡)": "박성용",
  "이광용(프발)": "프발",
  "임홍규(홍구)": "임홍규",
  "김승현(오메킴)": "오메킴",
  "송호영(도브)": "도브",
};
function nickNameSwitch(gamer: string) {
  return switchData[gamer];
}
export default function PlayerContainer() {
  const [searchValue, setSearchValue] = useRecoilState(searchState);
  const [gamerList, setGamerList] = useState<any>(initTierValue);
  const [initialGamerList, setInitialGamerList] = useState<any>(initTierValue); // 서버에서 받아온 초기 데이터 (setGamerList 와 구분짓는 이유: [1] useEffect참고 )
  const [selectedGamer, setSelectedGamer] = useState<any>({});
  const [mouseOverGamer, setMouseOverGamer] = useState<any>({});
  const [currentGamerRecord, setCurrentGamerRecord] = useState<any>({}); // 현재 클릭한 게이머의 상대전적 정보가 있는 리스트
  const [backgroundClick, setBackgroundClick] = useState(false);
  const [showThumbNail, setShowThumbNail] = useState(false);
  const [count, setCount] = useState(0);
  const [intervalUpdateFlag, setIntervalUpdateFlag] = useState(false);
  const [gamerCount, setGamerCount] = useState(0); // 필터 > 이름검색시 결과 카운트 변수
  const [afreecaLiveInfo, setAfreecaLiveInfo] = useState<any>({});
  const theme = useRecoilValue(themeState);
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
          resolve();
        })
        .catch((err) => {
          console.log("err", err);
          reject(err);
        });
    });
  }

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
    let flag = true;
    setLoading({ loading: true, msg: "게이머리스트 가져오는중..." });
    (async function inner() {
      await getWholeGamerInfoWrapper();
      const liveInfo = await getAfreecaLiveInfo();
      setAfreecaLiveInfo(liveInfo);
      setLoading({ loading: false });
      while (flag) {
        await sleep(30000);
        setAfreecaLiveInfo(await getAfreecaLiveInfo());
      }
    })();

    return () => {
      flag = false;
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
        copy[key] = copy[key].filter((e: any) => e._id === selectedGamer["_id"] || e._id in afreecaLiveInfo);
        if (searchValue.spon) {
          copy[key] = copy[key].filter((e: any) => e._id === selectedGamer["_id"] || afreecaLiveInfo[e._id]["title"].includes("스폰"));
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

  useEffect(() => {
    setShowThumbNail(false);
  }, [searchValue.inputText, searchValue.onair, searchValue.race, searchValue.recordExist, searchValue.spon, searchValue.tier, searchValue.univ]);

  const searchGamerDebounce = useCallback(debounce(searchGamer, 100), [initialGamerList]);
  useEffect(() => {
    searchGamerDebounce(searchValue.inputText)
      .then((result: any) => {
        setSearchValue({ ...searchValue, race: "", tier: "", onair: false, spon: false, recordExist: false, univ: "" });
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

  // let imgpath = "";
  const [imgPath,setImgPath] = useState("")
  useEffect(()=>{
    if(mouseOverGamer["_id"]){
      const path = afreecaLiveInfo[mouseOverGamer["_id"]]?.["imgPath"];
      const imgpath = path ==="비번방" ? "/secretroom.png" : path;
      setImgPath(imgpath)
    }
    else{
      const path = afreecaLiveInfo[selectedGamer["_id"]]?.["imgPath"];
      const imgpath = path ==="비번방" ? "/secretroom.png" : path;
      setImgPath(imgpath)
    }
  },[mouseOverGamer,selectedGamer])

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

  function changeAfreecaThumbnailPosition(gamerInfo: any, event: any) {
    if (gamerInfo in afreecaLiveInfo) {
      if (!isMobile) {
        onAirThumbNailRef.current.style.left = event.target.offsetParent.offsetLeft + "px";
        onAirThumbNailRef.current.style.top = event.target.offsetParent.offsetTop - 200 + "px";
      } else {
        if (showThumbNail && searchValue.thumbnail && gamerInfo in afreecaLiveInfo) {
          onAirThumbNailRef.current.style.top = event.target.offsetParent.offsetTop - 350 + "px";
        } else {
          onAirThumbNailRef.current.style.top = event.target.offsetParent.offsetTop - 100 + "px";
        }
      }

      setShowThumbNail(true);
    } else {
      setShowThumbNail(false);
    }
  }
  function renderGamer(gamerInfo: any, i: any) {
    const current = currentGamerRecord?.[gamerInfo._id]; // 현재 랜더링 하려는 게이머가 프로필클릭한 게이머의 상대전적 리스트에 있는 게이머라면 current에 정보 담김
    let gamerClassName = gamerInfo._id in switchData ? nickNameSwitch(gamerInfo._id) : gamerInfo._id;

    return (
      <div
        key={i}
        className={`gamer  ${selectedGamer["_id"] && !backgroundClick && (current || selectedGamer["_id"] === gamerInfo._id ? "" : "no-played")}`}
      >
        {gamerInfo["_id"] in afreecaLiveInfo && (
          <img
            className="onair"
            src="/on-air.png"
            alt=""
            onClick={() => {
              window.open(`https://play.afreecatv.com/${afreecaLiveInfo[gamerInfo["_id"]]["bjID"]}`);
            }}
          />
        )}

        <img
          className={`gamer-image gamer-${gamerClassName} ${
            selectedGamer["_id"] === gamerInfo._id && !backgroundClick ? `selected ${gamerInfo.race}` : ""
          }`}
          ref={selectedGamer["_id"] === gamerInfo._id && !backgroundClick ? selectedRef : null}
          src={`/images/gamer/${gamerInfo._id}.png`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/gamer/notfound.png";
          }}
          onMouseEnter={(event: any) => {
            if (!isMobile) {
              setMouseOverGamer(gamerInfo);
              changeAfreecaThumbnailPosition(gamerInfo["_id"], event);
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              setMouseOverGamer("");
              setShowThumbNail(false);
            }
          }}
          onClick={(event: any) => {
            if (isMobile) {
              changeAfreecaThumbnailPosition(gamerInfo["_id"], event);
            }
            event.stopPropagation(); // 해주지않으면 아래에서 setBackgroundClick(false)를 했던것을 다시 상위이벤트에서 setBackgroundClick(true)를 해주게됨
            setBackgroundClick(false);
            setCurrentGamerRecord(gamerInfo.record);
            setSelectedGamer(gamerInfo);
          }}
        />

        <img
          className={`afreeca-icon ${selectedGamer["_id"] === gamerInfo._id && gamerInfo["platform"]?.["afreeca"] ? "active" : ""}`}
          src="/afreeca.png"
          onClick={() => {
            window.open(`https://bj.afreecatv.com/${gamerInfo["platform"]["afreeca"]}`);
          }}
          alt=""
        />
        <img
          className={`elo-icon ${selectedGamer["_id"] === gamerInfo._id && gamerInfo["platform"]?.["elo"] ? "active" : ""}`}
          src="/eloboard.png"
          onClick={() => {
            window.open(
              `http://eloboard.com/${gamerInfo["platform"]?.["elo"].split("|")[0]}/bbs/board.php?bo_table=bj_list&wr_id=${
                gamerInfo["platform"]?.["elo"].split("|")[1]
              }`
            );
          }}
          alt=""
        />
        <span className={`gamer-name ${gamerInfo.race} ${theme === "dark" ? "dark" : ""}`}>{gamerInfo._id}</span>

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

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1544015487048934"
        data-ad-slot="3225843573"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <div className="stick-container">
        <div className="search-bar">
          <GamerSearchBar {...searchBarProps} />
        </div>
      </div>
      <div
        className={`afreeca-container ${
          showThumbNail && searchValue.thumbnail && (mouseOverGamer["_id"] in afreecaLiveInfo || selectedGamer["_id"] in afreecaLiveInfo)
            ? ""
            : "disable"
        }`}
        ref={onAirThumbNailRef}
      >
        <div className="title">
          {mouseOverGamer["_id"] ? afreecaLiveInfo[mouseOverGamer["_id"]]?.["title"] : afreecaLiveInfo[selectedGamer["_id"]]?.["title"]}
        </div>
        <div className="viewers">
          {mouseOverGamer["_id"] ? afreecaLiveInfo[mouseOverGamer["_id"]]?.["viewers"] : afreecaLiveInfo[selectedGamer["_id"]]?.["viewers"]}
        </div>
        <img
          className="thumbnail"
          src={imgPath}
        ></img>
      </div>
      <div
        className="tier-container"
        onClick={() => {
          setBackgroundClick(true);
          setSelectedGamer("");
          setSearchValue({ ...searchValue, recordExist: false });
        }}
      >
        {tierList.map(
          (e, i) =>
            gamerList[e].length !== 0 && (
              <>
                <div className={`tier-subject ${theme === "dark" ? "dark" : ""}`} key={i}>
                  {e === "아기" ? "개벌레" : e === "미지정" ? "미지정" : `${e} 티어`}
                </div>

                <div className="gamer-container" style={isMobile ? { width: "100%" } : { width: "1300px" }}>
                  {gamerList[e].map((e: any, i: any) => renderGamer(e, i))}
                </div>
              </>
            )
        )}
      </div>
    </Wrapper>
  );
}
