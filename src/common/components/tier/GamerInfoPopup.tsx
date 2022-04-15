import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { gamerState, userInfoState } from "../../recoil/states";
function convertTierName(tier: string): string {
  let val = "";
  switch (tier) {
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

export default function GamerInfoPopup({ setShowInfo }: any) {
  const [gamerInfo, setGamerInfo] = useRecoilState(gamerState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  function SubTier({ tier, name, point }: any) {
    async function vote() {
      await fetch(
        `https://seujinsa.herokuapp.com/decrease-point/${
          userInfo._id
        }/${name}/${convertTierName(tier)}`
      );
      await fetch(
        `https://seujinsa.herokuapp.com/vote/${name}/${convertTierName(tier)}`
      );
      let res = await fetch(`https://seujinsa.herokuapp.com/user-info/${userInfo._id}`);
      let json = await res.json();
      setUserInfo({ isLogin: true, ...json });

      res = await fetch(`https://seujinsa.herokuapp.com/gamer-info/${name}`);
      json = await res.json();
      setGamerInfo(json);
    }

    async function cancelVote() {
      await fetch(
        `https://seujinsa.herokuapp.com/increase-point/${
          userInfo._id
        }/${name}/${convertTierName(tier)}`
      );
      await fetch(
        `https://seujinsa.herokuapp.com/cancel-vote/${userInfo._id}/${
          userInfo.votePoint[gamerInfo._id][1]
        }}`
      );

      let res = await fetch(`https://seujinsa.herokuapp.com/user-info/${userInfo._id}`);
      let json = await res.json();
      setUserInfo({ isLogin: true, ...json });

      res = await fetch(`https://seujinsa.herokuapp.com/gamer-info/${name}`);
      json = await res.json();
      setGamerInfo(json);
    }
    return (
      <div className=" w-full flex justify-center">
        <div className="relative mb-[3px]">
          {tier}: {point || 0}
          <button
            onClick={() => {
              if (!userInfo) {
                alert("로그인 상태에서만 투표가 가능합니다.");
              } else {
                vote();

                // if (userInfo.votePoint[gamerInfo._id][0] <= 0) {
                //   alert("잔여 투표 포인트가 없습니다.");
                // } else {
                //   vote();
                // }
              }
            }}
            className="absolute right-[-40px] text-[13px] p-[2px] border-[1px] rounded-[2px] border-blue-800"
          >
            투표
          </button>
        </div>
      </div>
    );
  }
  console.log(userInfo);

  return (
    <div className="info-popup flex flex-col items-center relative">
      <span
        className="absolute right-3 cursor-pointer text-[20px]"
        onClick={() => {
          setShowInfo(false);
        }}
      >
        x
      </span>
      <div className="mt-[10px] gamer-name">{gamerInfo._id}</div>
      <SubTier tier={"갑"} name={gamerInfo._id} point={gamerInfo.point?.one} />
      <SubTier tier={"을"} name={gamerInfo._id} point={gamerInfo.point?.two} />
      <SubTier
        tier={"병"}
        name={gamerInfo._id}
        point={gamerInfo.point?.three}
      />
      <SubTier tier={"정"} name={gamerInfo._id} point={gamerInfo.point?.four} />
      <SubTier tier={"무"} name={gamerInfo._id} point={gamerInfo.point?.five} />
      <SubTier tier={"기"} name={gamerInfo._id} point={gamerInfo.point?.six} />
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
      <SubTier tier={"임"} name={gamerInfo._id} point={gamerInfo.point?.nine} />
      <SubTier tier={"계"} name={gamerInfo._id} point={gamerInfo.point?.ten} />
      {userInfo.isLogin ? (
        <div>
          {" "}
          {userInfo.votePoint[gamerInfo._id][0] > 0 ? (
            <span>투표가능: 1</span>
          ) : (
            <span className="cursor-pointer" onClick={() => {}}>
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
