import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { GamerInfoType, gamerState, userInfoState } from "../../recoil/states";
import { getUserInfo, getGamerInfo } from "../../utils/api-util";
import { SyncLoader } from "react-spinners";
function convertTierName(tier: string): string {
  let val = "";
  switch (tier) {
    case "주":
      val = "zero";
      break;
    case "갑":
      val = "one";
      break;
    case "을":
      val = "two";
      break;
    case "병":
      val = "three";
      break;
    case "정":
      val = "four";
      break;
    case "무":
      val = "five";
      break;
    case "기":
      val = "six";
      break;
    case "경":
      val = "seven";
      break;
    case "신":
      val = "eight";
      break;
    case "임":
      val = "nine";
      break;
    case "계":
      val = "ten";
      break;
  }
  return val;
}

function GamerInfoPopup({ setShowInfo }: any) {
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [totalPoint, setTotalPoint] = useState(0);
  const [disabled, setDisabled] = useState(false);

  //#region SubTier 컴포넌트 시작
  function SubTier({ tier, name, point }: any) {
    async function vote() {
      setDisabled(true);
      if (userInfo.isLogin) {
        let res = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/decrease-point`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _id: userInfo._id,
              name: name,
              tier: convertTierName(tier),
              date: Date.now(),
            }),
          }
        );
        await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/vote/${name}/${convertTierName(
            tier
          )}`
        );
        res = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/user-info/${userInfo._id}`
        );
        let json = await res.json();
        setUserInfo({ isLogin: true, ...json });

        res = await fetch(
          `${process.env.NEXT_PUBLIC_DB_URL}/gamer-info/${name}`
        );
        json = await res.json();
        setGamerInfo(json);
        setDisabled(false);
      }
    }

    return (
      <div className={`w-full flex justify-center`}>
        <div className="mb-[3px]">
          {tier}: {point || 0}
          <button
            onClick={() => {
              if (!userInfo.isLogin) {
                alert("로그인 상태에서만 투표가 가능합니다.");
              } else {
                if (userInfo.votePoint[gamerInfo._id][0] <= 0) {
                  alert("잔여 투표 포인트가 없습니다.");
                } else {
                  vote();
                }
              }
            }}
            className="absolute right-[110px] text-[13px] p-[2px] border-[1px] rounded-[2px] border-blue-800"
          >
            투표
          </button>
        </div>
      </div>
    );
  }
  //#endregion
  async function cancelVote(gamerName: string) {
    setDisabled(true);
    try {
      let json = await getUserInfo(userInfo._id);
      console.log(json.votePoint[gamerName]);
      let votedDate = json.votePoint[gamerName][2];
      let currentDate = Date.now();
      let elapsedTime = currentDate - votedDate;
      let d = new Date(votedDate);
      let mm = d.getMonth() + 1;
      let dd = d.getDate();
      if (elapsedTime < 1000 * 60 * 60 * 24 * 7) {
        alert(`투표후 7주일 뒤 취소 가능합니다.\n투표일: ${mm}월 ${dd}일`);
        return;
      }
      const votedTier = userInfo.votePoint[gamerInfo._id][1];
      let res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/cancel-vote`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: gamerInfo._id,
          tier: votedTier,
        }),
      });
      json = await getGamerInfo(gamerInfo._id);
      setGamerInfo({ ...gamerInfo, ...json });
      await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/increase-point`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: userInfo._id,
          name: gamerInfo._id,
          tier: votedTier,
        }),
      });
      json = await getUserInfo(userInfo._id);
      setUserInfo({ ...userInfo, ...json, isLogin: true });
    } catch (error) {
      alert(error);
    } finally {
      setDisabled(false);
    }
  }

  useEffect(() => {
    let totalCount = 0;
    for (const key in gamerInfo.point) {
      totalCount += gamerInfo.point[key];
    }
    setTotalPoint(totalCount);
  });
  return (
    <div className={`info-popup flex flex-col items-center relative`}>
      {disabled && (
        <div className="modal-background flex justify-center items-center">
          <SyncLoader color="white" />
        </div>
      )}
      <span
        className="absolute right-3 cursor-pointer text-[20px]"
        onClick={() => {
          setShowInfo(false);
        }}
      >
        x
      </span>
      <div className="mt-[10px] gamer-name  mb-[10px]">{gamerInfo._id}</div>
      <div className="w-full max-w-[180px] pl-[50px]">
        <div className="float-left">종족: {gamerInfo.race}</div>
      </div>
      <div className="w-full max-w-[180px] pl-[50px] mb-[10px]">
        <div className="float-left">대학: {gamerInfo.university}</div>
      </div>
      <div className="mr-[30px]">
        <SubTier
          tier={"주"}
          name={gamerInfo._id}
          point={gamerInfo.point?.zero}
        />
        <SubTier
          tier={"갑"}
          name={gamerInfo._id}
          point={gamerInfo.point?.one}
        />
        <SubTier
          tier={"을"}
          name={gamerInfo._id}
          point={gamerInfo.point?.two}
        />
        <SubTier
          tier={"병"}
          name={gamerInfo._id}
          point={gamerInfo.point?.three}
        />
        <SubTier
          tier={"정"}
          name={gamerInfo._id}
          point={gamerInfo.point?.four}
        />
        <SubTier
          tier={"무"}
          name={gamerInfo._id}
          point={gamerInfo.point?.five}
        />
        <SubTier
          tier={"기"}
          name={gamerInfo._id}
          point={gamerInfo.point?.six}
        />
        <SubTier
          tier={"경"}
          name={gamerInfo._id}
          point={gamerInfo.point?.seven}
        />
        <SubTier
          tier={"신"}
          name={gamerInfo._id}
          point={gamerInfo.point?.eight}
        />
        <SubTier
          tier={"임"}
          name={gamerInfo._id}
          point={gamerInfo.point?.nine}
        />
        <SubTier
          tier={"계"}
          name={gamerInfo._id}
          point={gamerInfo.point?.ten}
        />
      </div>

      <div className="mt-[10px]">총 득표수: {totalPoint}</div>

      {userInfo.isLogin ? (
        <div>
          {userInfo.votePoint[gamerInfo._id][0] > 0 ? (
            <span>투표가능: 1</span>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => {
                cancelVote(gamerInfo._id);
              }}
            >
              투표취소
            </span>
          )}
        </div>
      ) : (
        <div>로그인 상태에서 투표가 가능합니다.</div>
      )}
    </div>
  );
}
export default React.memo(GamerInfoPopup);
