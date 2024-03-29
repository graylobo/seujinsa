import React, { useEffect, useState } from "react";
import { getWholeGamerInfo } from "../../../utils/api-util";
import { GamerInfoType } from "../../../recoil/states";
import styled from "@emotion/styled";

const Wrapper = styled.main`
  input {
    background-color: black;
    color: gray;
  }
  select {
    background-color: black;
    color: gray;
  }
  option {
    color: gray;
  }
  span {
    color: #afaeae;
  }
`;

const race = ["", "저그", "프로토스", "테란"];
const university = ["무소속", "철와대", "바스포드", "무친대", "우끼끼즈", "캄성여대", "CP", "JSA", "NSU", "아마대", "츠나대", "MSG"];
const tierList = ["미지정", "갓", "킹", "잭", "조커", "0", "1", "2", "3", "4", "5", "6", "7", "8", "아기"];
export default function AdminPage() {
  const [gamerList, setGamerList] = useState([]);
  async function updateGamer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/all-gamer`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gamerList),
    });
    if (res.status === 200) {
      alert("수정 완료");
    }
  }

  useEffect(() => {
    async function getGamerInfo() {
      let gamerList = await getWholeGamerInfo();
      gamerList = gamerList.sort(function (a: GamerInfoType, b: GamerInfoType) {
        // 한글 오름차순
        return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
      });

      setGamerList(gamerList);
    }
    getGamerInfo();
  }, []);
  function updateGamerInfo(val: string, i: number, type: string) {
    const copyGamerList: any = [...gamerList];
    switch (type) {
      case "university":
        copyGamerList[i].university = val;
        break;
      case "race":
        copyGamerList[i].race = val;
        break;
      case "position":
        copyGamerList[i].position = val;
        break;
      case "nickName":
        copyGamerList[i].nickName = val;
        break;
      case "standardTier":
        copyGamerList[i].standardTier = val;
        break;
      case "afreeca":
        copyGamerList[i].platform["afreeca"] = val;
        break;
      case "elo":
        copyGamerList[i].platform["elo"] = val;
        break;
      case "youtube":
        copyGamerList[i].platform["youtube"] = val;
        break;
      case "twitch":
        copyGamerList[i].platform["twitch"] = val;
        break;
    }
    setGamerList(copyGamerList);
  }
  return (
    <Wrapper className="absolute left-0 w-full pb-[80px] pt-[130px] p-[10px] ">
      {gamerList.map((e: GamerInfoType, i: number) => (
        <div key={e._id} className="grid grid-cols-10 mb-3 box-border hover:bg-red-100 dark:hover:bg-red-900 ">
          <span>
            이름:<span className="ml-[10px]">{e._id}</span>
          </span>

          <span>
            종족:
            <select
              className=""
              value={e.race}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "race");
              }}
            >
              {race.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </span>
          <span>
            티어:
            <select
              className=""
              value={e.standardTier}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "standardTier");
              }}
            >
              {tierList.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </span>
          <span>
            대학:
            <select
              className=""
              value={e.university}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "university");
              }}
            >
              {university.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </span>
          <span>
            직급:
            <input
              className="w-[100px]"
              value={e.position}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "position");
              }}
            ></input>
          </span>
          <span>
            별명:
            <input
              className="w-[100px] ml-[10px]"
              value={e.nickName}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "nickName");
              }}
            ></input>
          </span>
          <span>
            아프리카:
            <input
              className="w-[100px] ml-[10px]"
              value={e.platform?.afreeca}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "afreeca");
              }}
            ></input>
          </span>
          <span>
            ELO:
            <input
              className="w-[100px] ml-[10px]"
              value={e.platform?.elo}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "elo");
              }}
            ></input>
          </span>
          <span>
            유튜브:
            <input
              className="w-[100px] ml-[10px]"
              value={e.platform?.youtube}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "youtube");
              }}
            ></input>
          </span>
          <span>
            트위치:
            <input
              className="w-[100px] ml-[10px]"
              value={e.platform?.twitch}
              onChange={(e) => {
                updateGamerInfo(e.target.value, i, "twitch");
              }}
            ></input>
          </span>
        </div>
      ))}
      <button
        className="fixed left-[45%] top-[10%] border-[2px] rounded-[10px] p-[10px] border-red-600"
        onClick={() => {
          updateGamer();
        }}
      >
        수정
      </button>
    </Wrapper>
  );
}
