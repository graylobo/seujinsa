import React from "react";
import PlayerContainer from "../../../common/components/tier/standard/PlayerContainer";
import cloneDeep from "lodash/cloneDeep";
import { getAfreecaLiveInfo, getWholeGamerInfo } from "../../../common/utils/api-util";
import { initTierValue, setPriority } from "../../../common/utils/utils";



export const getStaticProps = async () => {
  const gamerInfo = await getWholeGamerInfo();
  const liveInfo = await getAfreecaLiveInfo();

  let copy: any = cloneDeep(initTierValue);
  // 서버에서 받아온 게이머리스트를 티어별로 분류
  for (const e of gamerInfo) {
    copy[e.standardTier]?.push(e);
  }
  copy = setPriority(copy);
  const initialGamerList = copy;
  const gamerListProps = copy;
  const afreecaLiveInfoProps = liveInfo;

  return {
    props: {
      initialGamerList,
      gamerListProps,
      afreecaLiveInfoProps,
    },
  };
};

export default function index({ initialGamerList, gamerListProps, afreecaLiveInfoProps }: any) {
  const props = { gamerListProps, initialGamerList, afreecaLiveInfoProps };

  return <PlayerContainer {...props} />;
}
