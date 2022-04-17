import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/states";
export default function MyPage() {
  const [userState, setUserState] = useRecoilState(userInfoState);
  const [some, setsome] = useState(0);

  console.log(some);

  return (
    <div>
      <div>{userState._id}</div>
      <div onClick={()=>{
        setsome(1)
      }}>{some}</div>
    </div>
  );
}
