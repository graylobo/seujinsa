import React, { useEffect, useRef, useState } from "react";
import { getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";
import GamerSearchBar from "../../shared/GamerSearchBar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    isMobileState,
    loadingState,
    searchState,
} from "../../../recoil/states";
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
        z-index: 2;
    }

    .tier-container {
        margin-top: 100px;
        display: grid;
        justify-items: center;
        align-items: center;
        .tier-subject {
            font-size: 30px;
            margin-bottom: 30px;
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
                margin-bottom: 60px;
                height: 100px;
                position: relative;
                .afreeca-icon {
                    position: absolute;
                    right: 0;
                    top: 0;
                    display: none;
                    &.active {
                        display: block;
                    }
                }
                .record {
                    display: none;
                    &.active {
                        display: block;
                    }
                }
                .afreeca-container {
                    position: absolute;
                    border: 3px solid red;
                    border-radius: 10px;

                    min-width: 600px;
                    top: 30%;
                    display: flex;
                    justify-content: center;
                    z-index: 2;

                    .title {
                        font-size: 25px;
                        position: absolute;
                        top: 10px;
                    }
                    .thumbnail {
                        width: 100%;
                    }
                }

                &.no-played {
                    opacity: 0.3;
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
    const [searchValue, setSearchValue] = useRecoilState(searchState);
    const [gamerList, setGamerList] = useState<any>(initTierValue);
    const [initialGamerList, setInitialGamerList] =
        useState<any>(initTierValue); // 서버에서 받아온 초기 데이터 (setGamerList 와 구분짓는 이유: [1]useEffect참고 )
    const [selectedGamer, setSelectedGamer] = useState("");
    const [currentRecord, setCurrentRecord] = useState<any>({});
    const [backgroundClick, setBackgroundClick] = useState(false);
    const [showThumbNail, setShowThumbNail] = useState(false);
    const [onAirGamer, setOnAirGamer] = useState("");
    const [count, setCount] = useState(0);
    const setLoading = useSetRecoilState(loadingState);
    const isMobile = useRecoilValue(isMobileState);
    const selectedRef = useRef<any>();

    useEffect(() => {
        setLoading({ loading: true, msg: "게이머리스트 가져오는중..." });

        getWholeGamerInfo()
            .then((result) => {
                let copy: any = _.cloneDeep(initTierValue);
                // 서버에서 받아온 게이머리스트를 티어별로 분류
                for (const e of result) {
                    copy[e.standardTier]?.push(e);
                }
                copy = setPriority(copy);
                setInitialGamerList(copy);
                setGamerList(copy);
                setLoading({ loading: false });
            })
            .catch((err) => {
                console.log("err", err);
            });

        return () => {
            setLoading({ loading: false });
        };
    }, []);

    function setPriority(arr: any) {
        let copy = _.cloneDeep(arr);
        const priority: any = { 저그: 1, 테란: 2, 프로토스: 3 };
        for (const key in copy) {
            copy[key] = copy[key].sort((a: any, b: any) => {
                return priority[a.race] - priority[b.race];
            });
        }
        return copy;
    }

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
            if (searchValue.recordExist) {
                copy[key] = copy[key].filter((e: any) => {
                    if (selectedGamer !== e._id) {
                        return e._id in currentRecord;
                    }
                    return e;
                });
            }

            count += copy[key].length;
        }
        copy = setPriority(copy);
        setGamerList(copy);
        setCount(count);
    }, [searchValue, selectedGamer]);

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

    let prev = useRef(0);

    useEffect(() => {
        try {
            if (!searchValue.recordExist) {
                if (prev.current > 0) {
                    // html이 렌더링 되기전에 scroll을 하면 안되므로
                    setTimeout(() => {
                        scrollTo(
                            0,
                            (prev.current as number) - window.innerHeight / 2
                        );
                        prev.current = 0;
                    }, 0);
                }
            } else {
                prev.current = (
                    selectedRef?.current.offsetParent as HTMLElement
                ).offsetTop;
            }
        } catch {
            setBackgroundClick(true);
        }
    }, [searchValue.recordExist]);

    function renderGamer(e: any, i: any) {
        const current = currentRecord[e._id]; // 현재 클릭한 게이머와 전적이 있는 게이머

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
                        onClick={() => {
                            window.open(
                                `https://play.afreecatv.com/${e["afreeca"]["bjID"]}`
                            );
                        }}
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
                    ref={
                        selectedGamer === e._id && !backgroundClick
                            ? selectedRef
                            : null
                    }
                    src={`/images/gamer/${e._id}.png`}
                    onClick={(event) => {
                        event.stopPropagation(); // 해주지않으면 아래에서 setBackgroundClick(false)를 했던것을 다시 상위이벤트에서 setBackgroundClick(true)를 해주게됨
                        setBackgroundClick(false);
                        setCurrentRecord(e.record);
                        setSelectedGamer(e._id);
                    }}
                />

                <img
                    className={`afreeca-icon ${
                        selectedGamer === e._id && e["afreeca"]?.["bjID"]
                            ? "active"
                            : ""
                    }`}
                    src="/afreeca.png"
                    onClick={() => {
                        window.open(
                            `https://bj.afreecatv.com/${e["afreeca"]["bjID"]}`
                        );
                    }}
                    alt=""
                />
                <span className={`${e.race}`}>{e._id}</span>

                <div
                    className={`record ${
                        current && !backgroundClick ? "active" : "" // 상대전적이 있고 배경화면 클릭한게 아니면 전적 보여주기
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

    const searchBarProps = { count, selectedGamer };
    return (
        <Wrapper>
            <div className="search-bar">
                <GamerSearchBar {...searchBarProps} />
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
                    setSelectedGamer("");
                    setSearchValue({ ...searchValue, recordExist: false });
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
