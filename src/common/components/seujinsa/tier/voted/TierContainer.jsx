import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TierComponent from "./TierComponent";
import { useRecoilValue } from "recoil";
import { gamerState, isMobileState } from "../../../recoil/states";
import { SyncLoader } from "react-spinners";
import { setGamerTierList } from "../../../utils/api-util";
import HeadMeta from "../../shared/HeadMeta";

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
  "학버드",
  "CP대",
  "JSA",
  "NSU",
];
const Wrapper = styled.main`
  margin-top: 56px;
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: 10px;
  }
  .stick-container {
    position: sticky;
    top: 70px;
    height: 80px;
    .search-container {
      background-color: white;
      border-radius: 10px;
      padding: 10px;
      position: absolute;
      right: 0;
    }
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
    max-height: 500px;
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
  .tier-component {
    display: flex;
    flex-direction: column;
    padding: 30px;
    background-color: #e7e7e7;
    border-radius: 10px;
    margin-bottom: 30px;
    min-height: 150px;
    align-items: center;
  }
  .zero {
    background-image: url("/giphy.gif");
    background-size: cover;
  }
  .one {
    background-image: url("/giphy2.gif");
    background-size: cover;
  }
`;

const MemoizedMiddleContainer = React.memo(function MiddleContainer({
  tierName,
  gamerList,
  backGround,
}) {
  return (
    <section className={`tier-component ${backGround}`}>
      <div className="mb-[10px] text-[20px] font-semibold text-black">
        {tierName}
      </div>
      <TierComponent gamerList={gamerList}></TierComponent>
    </section>
  );
});

const tierList = [
  "주",
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
  "배치",
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
  const [gamerName, setGamerName] = useState("");
  const [race, setRace] = useState("");
  const [university, setUniversity] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortedGamerArray, setSortedGamerArray] = useState([]);
  const [filteredGamerArray, setFilterGamerArray] = useState([]);

  const gamerInfo = useRecoilValue(gamerState);
  const isMobile = useRecoilValue(isMobileState);
  function changeCss() {
    var elem = document.querySelector(".search-container");
    this.scrollY > 300 ? (elem.style.opacity = 0.9) : (elem.style.opacity = 1);
  }
  useEffect(() => {
    window.addEventListener("scroll", changeCss);
    return () => {
      window.removeEventListener("scroll", changeCss);
    };
  }, []);

  useEffect(() => {
    setGamerTierList().then((gamerList) => {
      if (gamerList.length !== 0) {
        setSortedGamerArray(gamerList);
        gamerClassification(gamerList);
      }
    });
  }, [gamerInfo]);

  useEffect(() => {
    const dummy = async () => {
      setLoading(true);
      if (sortedGamerArray.length !== 0) {
        gamerClassification(sortedGamerArray);
      }

      setLoading(false);
    };
    dummy();
  }, [race, university, gamerName, loading]);
  useEffect(() => {
    if (filteredGamerArray.length === 1) {
      const position = document.querySelector(
        `.gamer-${filteredGamerArray[0]._id}`
      ).offsetTop;
      scrollTo(0, position);
    }
  }, [filteredGamerArray]);

  function gamerClassification(list) {
    let copy = [...list];
    if (gamerName) {
      copy = copy.filter((e) => e._id.includes(gamerName));
    }
    if (race && race !== "전체") {
      copy = copy.filter((e) => e.race === race);
    }
    if (university && university !== "전체") {
      copy = copy.filter((e) => e.university === university);
    }
    setFilterGamerArray(copy);
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

    copy?.map((e) => {
      if (tierList.includes(e.tier)) {
        switch (e.tier) {
          case "주":
            zeroTemp.push({ ...e });
            break;
          case "갑":
            oneTemp.push({ ...e });
            break;
          case "을":
            twoTemp.push({ ...e });
            break;
          case "병":
            threeTemp.push({ ...e });
            break;
          case "정":
            fourTemp.push({ ...e });
            break;
          case "무":
            fiveTemp.push({ ...e });
            break;
          case "기":
            sixTemp.push({ ...e });
            break;
          case "경":
            sevenTemp.push({ ...e });
            break;
          case "신":
            eightTemp.push({ ...e });
            break;
          case "임":
            nineTemp.push({ ...e });
            break;
          case "계":
            tenTemp.push({ ...e });
            break;
          case "배치":
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
  const props = {
    title: "스타티어표",
    description:
      "스타티어표,스타크래프트 티어,아프리카 스타티어,스타크래프트 bj,스타여캠,스타대학",
    url: "https://seujinsa.com/tier",
  };
  return (
    <Wrapper className="absolute left-0 w-full flex justify-center">
      <HeadMeta {...props} />
      <div className="w-[90%] mt-[10px]">
        {isMobile ? (
          <aside className="w-[320px]  mx-auto">
            <ins
              className="kakao_ad_area"
              style={{ display: "none" }}
              data-ad-unit="DAN-3TcmgD2TxLj823ns"
              data-ad-width="320"
              data-ad-height="100"
            ></ins>
          </aside>
        ) : (
          <aside className="w-[728px]  mx-auto">
            <ins
              className="kakao_ad_area"
              style={{ display: "none" }}
              data-ad-unit="DAN-3TcmgD2TxLj823ns"
              data-ad-width="320"
              data-ad-height="100"
            ></ins>
          </aside>
        )}

        <div className="w-full min-w-[260px] mb-[20px] mt-[10px] stick-container">
          <div className="search-container text-black">
            {loading && (
              <div className="modal-background flex justify-center items-center">
                <SyncLoader color="gold" size={15} />
              </div>
            )}
            <span>이름: </span>
            <input
              className="w-[110px] border-[1px] border-gray-500 rounded-[5px] px-[10px]  focus:outline-blue-600 "
              value={gamerName}
              autoFocus
              onChange={(e) => {
                setGamerName(e.target.value);
              }}
            ></input>
            {isMobile && <div className="mt-[5px]"></div>}

            <span className="ml-[10px] border-[2px] border-gray-300 inline-block pl-[5px] rounded-[5px] ">
              종족:
              <select
                className="focus:outline-none"
                onChange={(e) => {
                  setRace(e.target.value);
                }}
              >
                {raceList.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </span>

            <span className="ml-[10px] border-[2px] border-gray-300 inline-block pl-[5px] rounded-[5px]">
              대학:
              <select
                className="focus:outline-none"
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
              >
                {universityList.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </span>

            <div>
              <span>count: {filteredGamerArray.length}</span>
            </div>
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
