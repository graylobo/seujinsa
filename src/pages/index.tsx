import type { NextPage } from "next";
import Main from "../common/components/Main";
import More from "../common/components/More";
import Navigation from "../common/components/Navigation";
const Home: NextPage = () => {
  return (
    <div>
      <main>
        <Main></Main>
        <More></More>
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
