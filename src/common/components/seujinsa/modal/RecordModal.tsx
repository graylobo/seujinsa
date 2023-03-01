import React, { useEffect, useState } from "react";
import { getGamerInfo, getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const race = ["선택", "저그", "프로토스", "테란"];
const wayOfPlayIList = [
  "선택",
  "단판",
  "3/2 [1경기]",
  "3/2 [2경기]",
  "3/2 [3경기]",
  "5/3 [1경기]",
  "5/3 [2경기]",
  "5/3 [3경기]",
  "5/3 [4경기]",
  "5/3 [5경기]",
  "7/4 [1경기]",
  "7/4 [2경기]",
  "7/4 [3경기]",
  "7/4 [4경기]",
  "7/4 [5경기]",
  "7/4 [6경기]",
  "7/4 [7경기]",
];
const mapList = [
  "개마고원",
  "건틀렛",
  "구원",
  "굿나잇",
  "그라운드제로",
  "그랜드라인",
  "글래디에이터",
  "남자이야기",
  "네오 기요틴",
  "네오 레가시오브차",
  "네오 로스트템플",
  "네오 메두사",
  "네오 사일런트 볼텍스",
  "네오 실피드",
  "네오 아즈텍",
  "네오 체인 리액션",
  "네오 포르테",
  "네오 홀 오브 발할라",
  "눈의 꽃",
  "단장의능선",
  "단테스피크",
  "데스티네이션",
  "데스페라도",
  "디라이드",
  "라그나로크",
  "라르고",
  "라만차",
  "라이드오브발키리",
  "러시아워",
  "레몬",
  "레퀴엠",
  "로드러너",
  "로스트템플",
  "로젠의다리",
  "발해의 꿈",
  "롱기누스",
  "루나",
  "리버스템플",
  "리볼버",
  "링잉블룸",
  "매치포인트",
  "머큐리",
  "멀티버스",
  "메타버스",
  "모노폴리",
  "몬테크리스토",
  "몬티홀",
  "몽키랜드",
  "몽환",
  "무한맵",
  "배틀로얄",
  "백두대간",
  "버미어",
  "버터",
  "벤젠",
  "벨트웨이",
  "불가침조약",
  "블러드배스",
  "블록체인",
  "블루스톰",
  "비상 드림라이너",
  "비잔티움",
  "비프로스트",
  "빠른무한",
  "샤쿠러스템플",
  "서킷브레이커",
  "스노우바운드",
  "스카이브릿지",
  "스파클",
  "스페이스 오디세이",
  "신 저격능선",
  "신 추풍령",
  "실피드",
  "심판의날",
  "아리조나",
  "아쉬리고",
  "아웃사이더",
  "아즈텍",
  "아카디아",
  "아테나",
  "안드로메다",
  "알레그로",
  "알카노이드",
  "알포인트",
  "어나더데이",
  "어센션",
  "얼터너티브",
  "얼티메이트스트림",
  "에디",
  "에스컬레이드",
  "엔터더드래곤",
  "여신의눈물",
  "오델로",
  "오버워치",
  "옵티마이저",
  "왕의귀환",
  "윈터 콘퀘스트",
  "이너코븐",
  "이카루스",
  "이클립스",
  "인큐버스",
  "일렉트릭서킷",
  "저격능선",
  "정글스토리",
  "제3세계",
  "제노스카이",
  "제이드",
  "좁은 투혼",
  "중원",
  "짐레이너스메모리",
  "짜장스테이션",
  "채러티",
  "철의장막",
  "카트리나",
  "칼바람능선",
  "콜로세움",
  "크레이지크리터스",
  "타우크로스",
  "태양의제국",
  "태풍의눈",
  "투혼",
  "트라이애슬론",
  "트랜지스터",
  "트로이",
  "파이썬",
  "패러독스",
  "패스파인더",
  "페르소나",
  "펠레노르",
  "포르테",
  "폴라리스랩소디",
  "폴리포이드",
  "플라즈마",
  "피의능선",
  "헌터",
  "헬퀴네스",
  "호라이즌달기지",
  "홀리월드",
  "홀오브발할라",
  "화랑도",
  "화이트아웃",
  "히든트랙",
  "히치하이커",
];
const Wrapper = styled.div`
  background-color: white;
  z-index: 9;
  input {
    border-color: gray;
    outline: 1px solid gray;
    border-radius: 3px;
    width: 100px;
    padding-left: 3px;
  }

  .grid-container {
    text-align: center;
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(9, minmax(120px, 120px));
  }
`;

function getDateFormat(date: Date): string {
  let year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;

  return `${year}-${month}-${day}`;
}
export default function RecordModal({ setRecordModalOpen, userInfo }: any) {
  const [startDate, setStartDate] = useState(new Date());
  const [gamerInfo, setGamerInfo] = useState<any>([]);
  const [winnerInput, setWinnerInput] = useState("");
  const [winnerRace, setWinnerRace] = useState("선택");
  const [loserInput, setLoserInput] = useState("");
  const [loserRace, setLoserRace] = useState("선택");
  const [map, setMap] = useState("");
  const [wayOfPlay, setWayOfPlay] = useState("선택");
  const [sponser, setSponser] = useState("");
  const [sponCost, setSponCost] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getWholeGamerInfo().then((e) => {
      setGamerInfo(e);
    });
  }, []);

  useEffect(() => {
  }, [winnerRace]);

  function checkValidateGamer(gamer: string) {
    for (const info of gamerInfo) {
      if (info._id === gamer) {
        return true;
      }
    }
    return false;
  }
  function checkValidateMap(map: string) {
    for (const mapInfo of mapList) {
      if (mapInfo === map) {
        return true;
      }
    }
    return false;
  }
  async function insertRecord() {
    if (winnerInput === "" || loserInput === "") {
      alert("승/패자를 입력해주세요.");
      return;
    }
    if (winnerRace === "선택" || loserRace === "선택") {
      alert("승/패자 종족을 입력해주세요.");
      return;
    }
    if (map === "선택") {
      alert("맵을 선택해주세요.");
      return;
    }
    if (wayOfPlay === "선택") {
      alert("경기방식을 입력해주세요.");
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/record`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        winner: winnerInput,
        loser: loserInput,
        winnerRace,
        loserRace,
        map,
        wayOfPlay,
        sponser,
        sponCost,
        content,
        date: getDateFormat(startDate),
        writer: userInfo.nickName,
      }),
    });

    if (res.status === 200) {
      alert("등록완료");
      setRecordModalOpen(false);
    }
  }
  const headerCSS = "font-bold mb-[10px]";
  return (
    <Wrapper className="absolute flex justify-center w-full min-w-[1150px] ">
      <div className=" border-[1px] rounded-[10px] border-gray-300 relative">
        <div className="grid-container">
          <div className="absolute right-0 top-0">
            <div
              className="close close2"
              onClick={() => {
                setRecordModalOpen(false);
              }}
            />
          </div>

          <div className="w-[120px] overflow-hidden">
            <div className={headerCSS}>날짜</div>
            <div className="ml-[1px]">
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd"
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className=" ">
            <div className={headerCSS}>승자</div>
            <input
              type="text"
              placeholder="필수입력"
              value={winnerInput}
              onBlur={() => {
                if (!checkValidateGamer(winnerInput)) {
                  setWinnerInput("");
                }
              }}
              onChange={(e) => {
                setWinnerInput(e.target.value);
              }}
            />
            <div className="gamer-info">
              {gamerInfo
                .filter((e: any) => e._id.includes(winnerInput))
                .map((e: any) => {
                  return (
                    <div
                      key={e._id}
                      className="cursor-pointer hover:bg-blue-200"
                      onMouseDown={() => {
                        setWinnerInput(e._id);
                      }}
                    >
                      {winnerInput !== e._id && e._id}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <div className={headerCSS}>종족</div>
            <select
              onChange={(e) => {
                setWinnerRace(e.target.value);
              }}
            >
              {race.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className={headerCSS}>패자</div>
            <input
              type="text"
              value={loserInput}
              placeholder="필수입력"
              onBlur={() => {
                if (!checkValidateGamer(loserInput)) {
                  setLoserInput("");
                }
              }}
              onChange={(e) => {
                setLoserInput(e.target.value);
              }}
            />
            <div className="gamer-info">
              {gamerInfo
                .filter((e: any) => e._id.includes(loserInput))
                .map((e: any) => {
                  return (
                    <div
                      key={e._id}
                      className="cursor-pointer hover:bg-blue-200"
                      onMouseDown={() => {
                        setLoserInput(e._id);
                      }}
                    >
                      {loserInput !== e._id && e._id}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <div className={headerCSS}>종족</div>
            <select
              onChange={(e) => {
                setLoserRace(e.target.value);
              }}
            >
              {race.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className={headerCSS}>맵</div>
            <input
              type="text"
              value={map}
              placeholder="필수입력"
              onBlur={() => {
                if (!checkValidateMap(map)) {
                  setMap("");
                }
              }}
              onChange={(e) => {
                setMap(e.target.value);
              }}
            />
            <div className="gamer-info">
              {mapList
                .filter((e: any) => e.includes(map))
                .map((e: any) => {
                  return (
                    <div
                      key={e}
                      className="cursor-pointer hover:bg-blue-200"
                      onMouseDown={() => {
                        setMap(e);
                      }}
                    >
                      {map !== e && e}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <div className={headerCSS}>경기방식</div>
            <select
              onChange={(e) => {
                setWayOfPlay(e.target.value);
              }}
            >
              {wayOfPlayIList.map((e) => (
                <option>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <div className={headerCSS}>스폰서</div>
            <input
              type="text"
              className="w-[100px]"
              placeholder="선택입력"
              value={sponser}
              onChange={(e) => {
                setSponser(e.target.value);
              }}
            />
          </div>
          <div>
            <div className={headerCSS}>스폰비</div>
            <input
              type="text"
              className="w-[100px]"
              placeholder="선택입력"
              value={sponCost}
              onChange={(e) => {
                setSponCost(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <textarea
            className="border-[2px] border-gray-600 w-[90%] rounded-[5px] h-[150px] mb-[20px] p-[10px]"
            placeholder="비고내용"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              insertRecord();
            }}
          >
            작성완료
          </button>
          <button className="ml-[10px]">취소</button>
        </div>
      </div>
    </Wrapper>
  );
}
