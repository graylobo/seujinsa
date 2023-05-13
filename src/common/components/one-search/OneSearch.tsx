import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import OptionModal from "./OptionModal";
import KakaoAds from "../seujinsa/ad/KakaoAds";
import GoogleAds from "../seujinsa/ad/GoogleAds";

interface StyledInterface {
  width?: string;
  height?: string;
  position?: string;
}

export default function OneSearch() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [marketState, setMarketState] = useState({
    naver: true,
    google: true,
    coupang: true,
    gmarket: true,
    auction: true,
    lotteon: true,
    eleven: true,
    homeplus: true,
    wmp: true,
    shoppinghow: true,
  });
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
  }, []);

  return (
    <Wrapper width={optionState.width} height={optionState.height} position={optionState.position}>
      {optionModalOpen && <OptionModal {...propsContainer} />}
      <AdsSection>
        <KakaoAds type="horizontal" />
        <GoogleAds type="horizontal" />
      </AdsSection>
      <div id="input-container">
        <StyledInput
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setResult(text);
            }
          }}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="text"
        />
        <button
          onClick={() => {
            setResult(text);
          }}
        >
          검색
        </button>
        <button
          onClick={() => {
            setOptionModalOpen(true);
          }}
        >
          옵션
        </button>
      </div>

      <div id="iframe-container">
        {marketState.naver && (
          <div className="frame-box">
            <div className="market-name">네이버</div>
            <iframe className="frame" src={`https://search.shopping.naver.com/search/all?query=${result}`}></iframe>
          </div>
        )}

        {marketState.shoppinghow && (
          <div className="frame-box">
            <div className="market-name">쇼핑하우</div>
            <iframe className="frame" src={`https://shoppinghow.kakao.com/search/${result}`}></iframe>
          </div>
        )}

        {marketState.google && (
          <div className="frame-box">
            <div className="market-name">구글</div>
            <iframe className="frame" src={` https://www.google.com/search?igu=1&query=${result}`}></iframe>
          </div>
        )}

        {marketState.coupang && (
          <div className="frame-box">
            <div className="market-name">쿠팡</div>
            <iframe className="frame" src={`https://www.coupang.com/np/search?q=${result}`}></iframe>
          </div>
        )}

        {marketState.gmarket && (
          <div className="frame-box">
            <div className="market-name">지마켓</div>
            <iframe className="frame" src={`https://browse.gmarket.co.kr/search?keyword=${result}`}></iframe>
          </div>
        )}

        {marketState.auction && (
          <div className="frame-box">
            <div className="market-name">옥션</div>
            <iframe className="frame" src={`https://browse.auction.co.kr/search?keyword=${result}`}></iframe>
          </div>
        )}

        {marketState.lotteon && (
          <div className="frame-box">
            <div className="market-name">롯데온</div>
            <iframe
              className="frame"
              src={`https://www.lotteon.com/search/search/search.ecn?render=search&platform=pc&q=${result}&mallId=1`}
            ></iframe>
          </div>
        )}

        {marketState.eleven && (
          <div className="frame-box">
            <div className="market-name">11번가</div>
            <iframe className="frame" src={`https://search.11st.co.kr/Search.tmall?kwd=${result}`}></iframe>
          </div>
        )}

        {marketState.homeplus && (
          <div className="frame-box">
            <div className="market-name">홈플러스</div>
            <iframe className="frame" src={`https://front.homeplus.co.kr/search?entry=direct&keyword=${result}`}></iframe>
          </div>
        )}

        {marketState.wmp && (
          <div className="frame-box">
            <div className="market-name">위메프</div>
            <iframe className="frame" src={`https://search.wemakeprice.com/search?search_cate=top&keyword=${result}`}></iframe>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const AdsSection = styled.section`
  width: 100%;
  ins {
    margin: 0 auto;
    display: block !important;
  }
`;
const StyledInput = styled.input`
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
`;

const Wrapper = styled.main<StyledInterface>`
  margin-top: 100px;
  #input-container {
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    /* position: fixed; */
    position: relative;
    white-space: nowrap;
    left: 50%;
    transform: translate(-50%);
    z-index: 99;
  }
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
