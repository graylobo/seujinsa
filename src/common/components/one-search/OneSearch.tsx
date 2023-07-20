import classNames from "classnames";
import { marketOption } from "lib/constants";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import AdsSection from "../Ads/AdsSection";
import OptionModal from "./OptionModal";
import { produce } from "immer";
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
  const [marketState, setMarketState] = useState(marketOption);
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
    console.log("test1", marketState);
  }, [marketState]);
  useEffect(() => {
    const marketStateData = localStorage.getItem("marketState");
    const optionStateData = localStorage.getItem("optionState");

    if (marketStateData) {
      setMarketState(
        produce((draft: any) => {
          try {
            const localStorageData = JSON.parse(marketStateData);

            // 마켓key가 로컬state에는 있는데 로컬스토리지에 없는 경우 추가
            Object.keys(marketOption).forEach((marketKey) => {
              if (!localStorageData[marketKey]) {
                draft[marketKey] = draft[marketKey];
                return;
              }

              // 마켓 속성key가 로컬state에는 있는데 로컬스토리지에 없는 경우 추가
              Object.keys(marketOption[marketKey]).forEach((marketPropsKey) => {
                if (!(marketPropsKey in localStorageData[marketKey])) {
                  draft[marketKey][marketPropsKey] = marketOption.marketKey[marketPropsKey];
                }
              });
            });

            // 마켓key가 로컬스토리지에는 있는데 로컬state에는 없는경우 삭제
            Object.keys(localStorageData).forEach((marketKey) => {
              if (!marketOption[marketKey]) {
                delete draft[marketKey];
                return;
              }
              // 마켓 속성key가 로컬스토리지에는 있는데 로컬state에는 없는 경우 삭제

              Object.keys(localStorageData[marketKey]).forEach((marketPropsKey) => {
                if (!(marketPropsKey in marketOption[marketKey])) {
                  delete draft[marketKey][marketPropsKey];
                }
              });
            });
          } catch (error) {
            console.log(error);
          }
        })
      );
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
    console.log("test2", marketState);

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

const Wrapper = styled.main<StyledInterface>`
  margin-top: 100px;

  .divider {
    height: 50px;
  }
  .frame-box {
    position: relative;
    width: max-content;
    margin: 0 auto;
    border: 2px dotted darkgray;
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
    display: flex;
    flex-direction: column;
    gap: 30px;
    ${(props) =>
      props.position === "horizontal" &&
      css`
        flex-direction: row;
        width: max-content;
      `}
  }

  .frame {
    width: ${(props) => props.width}vw;
    height: ${(props) => props.height}vh;
  }
`;
