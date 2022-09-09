import type { NextPage } from "next";
import PlayerContainer from "../common/components/tier/standard/PlayerContainer";
import { getAfreecaLiveInfo, getWholeGamerInfo } from "../common/utils/api-util";
import cloneDeep from "lodash/cloneDeep";
import { initTierValue, setPriority } from "../common/utils/utils";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../common/recoil/states";


export const getStaticProps = async () => {
  const gamerInfo = await getWholeGamerInfo();
  const liveInfo = await getAfreecaLiveInfo();
  console.log("하1")

  let copy: any = cloneDeep(initTierValue);
  // 서버에서 받아온 게이머리스트를 티어별로 분류
  for (const e of gamerInfo) {
    copy[e.standardTier]?.push(e);
  }
  copy = setPriority(copy);
  const initialGamerList =  copy;
  const gamerListProps =  copy;
  const afreecaLiveInfoProps = liveInfo;

  return {
    props: {
      initialGamerList,
      gamerListProps,
      afreecaLiveInfoProps
    },
  };
};


const Home: NextPage = ({ initialGamerList, gamerListProps, afreecaLiveInfoProps }: any) => {

  const setLoading = useSetRecoilState(loadingState);
  setLoading({loading:true,msg:"게이머 리스트 가져오는중.."})
  const props = { gamerListProps, initialGamerList,  afreecaLiveInfoProps};
  return (
    <div>
      <main>
        <div>
          <PlayerContainer {...props} />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
