import { isMobileState, themeState } from "common/recoil/states";
import { ITemplateItemProps } from "lib/createObject";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import GoogleAds from "../seujinsa/ad/GoogleAds";
import KakaoAds from "../seujinsa/ad/KakaoAds";

export default function DefaultTemplate({ rankList, width, height, switchTier }: any) {
  const theme = useRecoilValue(themeState);

  const tierColor: any = {
    0: "red",
    1: "orange",
    2: "yellow",
    3: "green",
    4: "blue",
    5: "indigo",
    6: "purple",
  };
  return (
    <Wrapper>
      <AdsSection>
        <KakaoAds type="horizontal" />
        <GoogleAds type="horizontal" />
      </AdsSection>
      <div id="tier-container">
        {Object.entries(rankList).map((e: any, i) => {
          const tier = e[0];
          return (
            <>
              <Tier color={tierColor[tier]} className="tier-box">{`${switchTier?.[tier] || `${tier} tier`} `}</Tier>
              <div className="item-box">
                {Object.entries(e[1]).map((e: any, i) => {
                  const items: ITemplateItemProps = e[1];
                  return (
                    <div className={`logo-box ${theme}`} key={i}>
                      <a href={e[1]["link"]} target="_blank" rel="noopener noreferrer">
                        {e[1]["logo"] && (
                          <LogoImageWrapper x={e[1]["scaleX"] ? e[1]["scaleX"] : 1} y={e[1]["scaleY"] ? e[1]["scaleY"] : 1}>
                            <Image className="logo-image" src={e[1]?.["logo"]} width={width} height={height} alt="" />
                          </LogoImageWrapper>
                        )}
                      </a>
                      <span className="brand-name">{items.brandName}</span>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </Wrapper>
  );
}
const AdsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.main`
  @font-face {
    font-family: "notosans";
    src: url("/assets/fonts/notosans/NotoSansKR-Bold.otf");
  }

  padding-top: 100px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 200px;

  #tier-container {
    display: grid;
    grid-template-columns: 0.1fr 0.9fr;
    border: 1px solid gray;
  }
  .item-box {
    padding-left: 3vw;
    padding: 10px 0 10px 2vw;
    border-bottom: 1px solid gray;
    border-left: 1px solid;
    margin-bottom: -1px;
    display: flex;
    flex-wrap: wrap;
    gap: 3vw;
  }
  .tier-box {
    font-family: "notosans";
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
    margin-bottom: -1px;
    font-size: 17px;
  }
  #navbar {
    display: "flex";
    height: "100%";
    position: fixed;
  }
  .logo-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    &.dark {
      filter: invert(1);
    }
  }
  .brand-name {
    font-weight: bold;
    color: #696565;
  }
`;

const LogoImageWrapper = styled.div<any>`
  .logo-image {
    transform: ${(props) => `scale(${props.x},${props.y})`};
  }
`;

const Tier = styled.div`
  color: ${(props) => props.color};
  text-shadow: 0 0 7px ${(props) => props.color}, 0 0 10px ${(props) => props.color}, 0 0 21px ${(props) => props.color}, 0 0 42px black,
    0 0 82px black, 0 0 92px black, 0 0 102px black, 0 0 151px black;
  background-color: #171717;
  margin-bottom: 1px !important;
`;
