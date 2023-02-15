import type { NextPage } from "next";
import PlayerContainer from "../common/components/seujinsa/tier/standard/PlayerContainer";
import { getAfreecaLiveInfo, getWholeGamerInfo } from "../common/utils/api-util";
import cloneDeep from "lodash/cloneDeep";
import { initTierValue, setPriority } from "../common/utils/utils";
import Bag from "common/components/rank/royal/Bag";

const Home: NextPage = () => {
  return (
    <main>
      <Bag />
    </main>
  );
};

export default Home;
