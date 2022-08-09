import type { NextPage } from "next";
import Main from "../common/components/Main";
import PlayerContainer from "../common/components/tier/standard/PlayerContainer";

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <div>
          <PlayerContainer />
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
