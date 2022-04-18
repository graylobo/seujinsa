import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil/states";
export interface IProps {
  _id?: string;
  nickName?: string;
  introduction?: string;
}



async function useGetUserInfo(id?: string) {
  const [userInfo, setUserInfo] = useState({});
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/user-info/${id}`);
  const json = await res.json();
  setUserInfo(json);
  return userInfo;
}
export {  useGetUserInfo };
