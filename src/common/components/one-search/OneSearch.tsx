import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import OptionModal from "./OptionModal";
import KakaoAds from "../seujinsa/ad/KakaoAds";
import GoogleAds from "../seujinsa/ad/GoogleAds";
import classNames from "classnames";
import { searchOptions } from "lib/constants";
import AdsSection from "../Ads/AdsSection";

interface StyledInterface {
  width?: string;
  height?: string;
  position?: string;
}

function textToQuery(link: string, query: string) {
  const res = link.replace("${query}", query);
  return res;
}

export default function OneSearch() {
  const [isSticky, setSticky] = useState(false);
  const stickPointRef = useRef<any>();
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [marketState, setMarketState] = useState(searchOptions);
  const [optionState, setOptionState] = useState({
    width: "90",
    height: "90",
    position: "vertical",
  });
  const propsContainer = {
    optionState,
    marketState,
    setOptionModalOpen,
    setOptionState,
    setMarketState,
  };

  useEffect(() => {
    const marketStateData = localStorage.getItem("marketState");
    const optionStateData = localStorage.getItem("optionState");
    if (marketStateData) {
      setMarketState(JSON.parse(marketStateData));
    }
    if (optionStateData) {
      setOptionState(JSON.parse(optionStateData));
    }

    let stickyPoint = stickPointRef.current && stickPointRef.current.getBoundingClientRect().top + window.scrollY;

    const scrollHandler = () => {
      if (!!stickyPoint) {
        window.scrollY >= stickyPoint ? setSticky(true) : setSticky(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  function handleKeyDown(e: any) {
    if (e.keyCode === 13) {
      setResult(text);
    }
  }
  function handleInputChange(e: any) {
    setText(e.target.value);
  }
  function handleSearchButtonClick() {
    setResult(text);
  }
  function handleOptionButtonClick() {
    setOptionModalOpen(true);
  }
  return (
    <Wrapper width={optionState.width} height={optionState.height} position={optionState.position}>
      {optionModalOpen && <OptionModal {...propsContainer} />}
      <AdsSection />
      <InputContainer ref={stickPointRef} className={classNames({ sticky: isSticky })}>
        <InputBox>
          <SearchBar onKeyDown={handleKeyDown} onChange={handleInputChange} type="text" />
          <SearchOptionBox>
            <button onClick={handleSearchButtonClick}>검색</button>
            <div>|</div>
            <button onClick={handleOptionButtonClick}>옵션</button>
          </SearchOptionBox>
        </InputBox>
      </InputContainer>

      <div id="iframe-container">
        {Object.entries(marketState).map(([, { name, link, show }], i) => {
          if (!link) return;
          return (
            show && (
              <div className="frame-box">
                <div className="market-name">{name}</div>
                <iframe className="frame" src={textToQuery(link, result)}></iframe>
              </div>
            )
          );
        })}
      </div>
    </Wrapper>
  );
}

const InputBox = styled.div`
  display: flex;
  background: lightgray;
  padding: 10px;
  border-radius: 10px;
`;

const SearchOptionBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchBar = styled.input`
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
`;

const InputContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  z-index: 99;
  &.sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
`;

const FrameBox = styled.div`
  position: relative;
  width: max-content;
  margin: 0 auto;
`;

const Wrapper = styled.main<StyledInterface>`
  margin-top: 100px;

  .divider {
    height: 50px;
  }
  .frame-box {
    position: relative;
    width: max-content;
    margin: 0 auto;
  }
  .market-name {
    position: absolute;
    font-weight: bold;
    color: white;
    background-color: black;
    left: 1.5%;
    top: 1.5%;
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
  }
  #iframe-container {
    ${(props) =>
      props.position === "horizontal" &&
      css`
        display: flex;
        width: max-content;
      `}
  }

  .frame {
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vh;
  }
`;
