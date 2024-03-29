import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { popupState } from "../../../recoil/states";

const Wrapper = styled.main`
  display: flex;
  justify-content: center;

  .container {
    width: 90vw;
    height: 100%;
    max-width: 500px;
    border-radius: 10px;
    border: 1px solid white;
    background-color: black;
    opacity: 0.9;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 20px;
      margin-top: 20px;
      margin-bottom: 10px;
      text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 15px;
    }
    .close {
      position: absolute;
      top: 17px;
      right: 0;
    }
  }
`;
export default function TierInfoPopup() {
  const [popup, setPopup] = useRecoilState(popupState);

  return (
    <Wrapper>
      <div className="container">
        <div className="title">티어표 정보</div>
        <div className="content">
          <div>
            티어표 상대전적 데이터 출처:{" "}
            <a href="http://eloboard.com" target="_blank">
              {" "}
              http://eloboard.com{" "}
            </a>
          </div>
          <div>아프리카 정보 1~2분 주기 갱신</div>
          <div>상대전적데이터 1일 주기 갱신</div>
        </div>
        <div className="title">필터 정보</div>
        <div className="content">
          <div>필터: 필터박스 표시 유무 </div>
          <div>방송중: 방송중인 게이머만 표시</div>
          <div>스폰: 방제에 스폰 이 포함되어있는 게이머만 표시</div>
          <div>썸네일: 방송 썸네일 표시 유무</div>
          <div>전적존재: 현재 선택한 게이머와 전적이 있는 게이머만 표시</div>
          <div>네온: 폰트네온 효과(컴퓨터 사양이 좋은경우 선택)</div>
        </div>

        <div
          className="close"
          onClick={() => {
            setPopup({ ...popup, show: false });
          }}
        >
          X
        </div>
      </div>
    </Wrapper>
  );
}
