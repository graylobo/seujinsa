import React, { useEffect, useState } from "react";
import { getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";
import GamerSearchBar from "../../shared/GamerSearchBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { isMobileState, searchState } from "../../../recoil/states";
import _ from "lodash";

const Wrapper = styled.main`
    margin-top: 90px;

    .테란 {
        color: blue;
    }
    .저그 {
        color: red;
    }
    .프로토스 {
        color: yellow;
    }
    .search-bar {
        position: fixed;
        right: 20px;
        top: 190px;
        z-index: 1;
    }

    .tier-container {
        margin-top: 100px;
        display: grid;
        justify-items: center;
        align-items: center;
        .tier-subject {
            font-size: 30px;
            margin-bottom:30px;
        }
        .gamer-container {
            grid-template-columns: repeat(10, 1fr);
            place-items: center;
            display: grid;
            .onair {
                width: 50px;
                height: 50px;
                position: absolute;
                top: -30px;
                left: 10px;
                z-index: 1;
                cursor: pointer;
            }

            .gamer {
                width: 100px;
                margin-bottom: 50px;
                height: 100px;
                position: relative;
                .afreeca-container {
                    position: fixed;
                    min-width: 600px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    justify-content: center;

                    .title {
                        font-size: 25px;
                        position: absolute;
                        top: 10px;
                    }
                    .thumbnail {
                        width: 100%;
                        z-index: 999;
                    }
                }

                &.no-played {
                    opacity: 0.3;
                    transition: opacity 0.3s;
                }
                .selected {
                    border: solid 1px red;
                }
                img {
                    border-radius: 10px;
                }

                .gamer-image {
                    width: 70px;
                    height: 70px;
                    z-index: 10;
                }
                .record {
                    opacity: 0;
                    transition: opacity 0.3s;
                    &.active {
                        opacity: 1;
                    }
                }
            }
        }
    }
`;

const tierList = [
    "갓",
    "킹",
    "잭",
    "조커",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "벌레",
    "미지정",
];

const initTierValue = {
    갓: [],
    킹: [],
    잭: [],
    조커: [],
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    벌레: [],
    미지정: [],
};

export default function PlayerContainer() {
    const searchValue = useRecoilValue(searchState);
    const [gamerList, setGamerList] = useState<any>(initTierValue);
    const [initialGamerList, setInitialGamerList] =
        useState<any>(initTierValue); // 서버에서 받아온 초기 데이터 (setGamerList 와 구분짓는 이유: [1]useEffect참고 )
    const [selectedGamer, setSelectedGamer] = useState("");
    const [currentRecord, setCurrentRecord] = useState<any>({});
    const [backgroundClick, setBackgroundClick] = useState(false);
    const [showThumbNail, setShowThumbNail] = useState(false);
    const [onAirGamer, setOnAirGamer] = useState("");
    const [count, setCount] = useState(0);
    const isMobile = useRecoilValue(isMobileState);

    useEffect(() => {
        getWholeGamerInfo()
            .then((result) => {
                let copy: any = _.cloneDeep(initTierValue);
                // 서버에서 받아온 게이머리스트를 티어별로 분류
                for (const e of result) {
                    copy[e.standardTier]?.push(e);
                }

                setInitialGamerList(copy);
                setGamerList(copy);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);
    // [1]
    // 필터링 기능 함수
    useEffect(() => {
        // gamerList를 가 아닌 initialGamerList를 전달하는이유: gamerList를 전달했을때 아래 filter함수에서 빈값을 리턴하는 경우 마지막 라인의 setGamerList 가
        // gamerList를 빈값으로 업데이트 되기때문에, 다음 동작에서 빈값에 대해 filter함수를 수행하게 되므로 setGamerList에 영향을 받지않고 서버에서 받아온
        // 초기상태를 보관하고있는 initialGamerList를 전달해주어야함
        let copy = _.cloneDeep(initialGamerList);
        let count = 0;
        for (const key in copy) {
            if (searchValue.race !== "전체" && searchValue.race !== "") {
                copy[key] = copy[key].filter(
                    (e: any) => e.race === searchValue.race
                );
            }
            if (searchValue.tier !== "전체" && searchValue.tier !== "") {
                copy[key] = copy[key].filter(
                    (e: any) => e.standardTier === searchValue.tier
                );
            }
            if (searchValue.univ !== "전체" && searchValue.univ !== "") {
                if (searchValue.univ === "무소속") {
                    copy[key] = copy[key].filter(
                        (e: any) => e.university === "무소속"
                    );
                } else {
                    copy[key] = copy[key].filter(
                        (e: any) => e.university === searchValue.univ
                    );
                }
            }
            if (searchValue.onair) {
                copy[key] = copy[key].filter((e: any) => e.afreeca);
            }

            count += copy[key].length;
        }
        setGamerList(copy);
        setCount(count);
    }, [searchValue]);

    useEffect(() => {
        try {
            const elem = document.querySelector<HTMLElement>(
                `.gamer-${searchValue.inputText}`
            );

            const position = (elem?.offsetParent as HTMLElement).offsetTop;

            if (position) {
                scrollTo(0, (position as number) - 500);
                elem?.click();
            } else {
                setBackgroundClick(true);
            }
        } catch {
            setBackgroundClick(true);
        }
    }, [searchValue.inputText]);

    function renderGamer(e: any, i: any) {
        const current = currentRecord[e._id];
        return (
            <div
                key={i}
                className={`gamer  ${
                    selectedGamer &&
                    !backgroundClick &&
                    (current || selectedGamer === e._id ? "" : "no-played")
                } `}
            >
                {showThumbNail && onAirGamer === e._id && (
                    <div className="afreeca-container">
                        <div className="title">{e["afreeca"]["title"]}</div>
                        <img
                            className="thumbnail"
                            src={e["afreeca"]["imgPath"]}
                        ></img>
                    </div>
                )}

                {e.afreeca && (
                    <img
                        className="onair"
                        src="/on-air.png"
                        alt=""
                        onMouseEnter={() => {
                            setOnAirGamer(e._id);
                            setShowThumbNail(true);
                        }}
                        onMouseLeave={() => {
                            setOnAirGamer("");

                            setShowThumbNail(false);
                        }}
                    />
                )}

                <img
                    className={`gamer-image gamer-${e._id} ${
                        selectedGamer === e._id && !backgroundClick
                            ? "selected"
                            : ""
                    }`}
                    src={`/images/gamer/${e._id}.png`}
                    onClick={(event) => {
                        event.stopPropagation(); // 해주지않으면 아래에서 setBackgroundClick(false)를 했던것을 다시 상위이벤트에서 setBackgroundClick(true)를 해주게됨
                        setBackgroundClick(false);
                        setCurrentRecord(e.record);
                        setSelectedGamer(e._id);
                    }}
                />
                <span className={`${e.race}`}>{e._id}</span>

                <div
                    className={`record ${
                        current && !backgroundClick ? "active" : ""
                    }`}
                >
                    <div>
                        {current?.["win"]}
                        {current?.["lose"]}
                    </div>
                    <div>{current?.["rate"]}</div>
                </div>
            </div>
        );
    }

    return (
        <Wrapper>
            <div className="search-bar">
                <GamerSearchBar count={count} />
            </div>
            {isMobile ? (
                <div className="w-[320px] mx-auto">
                    <ins
                        className="kakao_ad_area"
                        style={{ display: "none" }}
                        data-ad-unit="DAN-dpnzA4C94ch8HynZ"
                        data-ad-width="320"
                        data-ad-height="100"
                    ></ins>
                </div>
            ) : (
                <div className="w-[728px]  mx-auto">
                    <ins
                        className="kakao_ad_area"
                        style={{ display: "none" }}
                        data-ad-unit="DAN-orPlGTMAwqXbMtbn"
                        data-ad-width="320"
                        data-ad-height="100"
                    ></ins>
                </div>
            )}
            <div
                className="tier-container"
                onClick={() => {
                    setBackgroundClick(true);
                }}
            >
                {tierList.map((e, i) => (
                    <>
                        {gamerList[e].length !== 0 && (
                            <div className="tier-subject" key={i}>
                                {e} 티어
                            </div>
                        )}

                        <div className="gamer-container">
                            {gamerList[e].map((e: any, i: any) =>
                                renderGamer(e, i)
                            )}
                        </div>
                    </>
                ))}
            </div>
        </Wrapper>
    );
}
