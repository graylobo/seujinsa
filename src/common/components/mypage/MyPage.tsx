import React from "react";
import { useRecoilState } from "recoil";
import { loginInfo } from "../../recoil/states";
export default function MyPage() {
  const [loginState, setLoginState] = useRecoilState(loginInfo);
  return <div>{loginState.userEmail}</div>;
}
