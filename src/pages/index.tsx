import type { NextPage } from "next";
import Main from "../common/components/Main";
import More from "../common/components/More";
import Navigation from "../common/components/Navigation";
import { useRecoilState } from "recoil";
import { menuState } from "../common/recoil/menu-states";
const Home: NextPage = () => {
  const [menu, setMenu] = useRecoilState(menuState);
  return (
    <div className="">
      <header>
        <Navigation />
      </header>
      <main>
        <div>{menu ? <Main /> : <More />}</div>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
