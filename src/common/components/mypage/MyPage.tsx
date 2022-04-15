import React from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/states";
export default function MyPage() {
  const [userState, setUserState] = useRecoilState(userInfoState);
  return <div>{userState._id}</div>;
}
