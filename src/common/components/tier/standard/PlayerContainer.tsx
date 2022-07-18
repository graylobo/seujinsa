import React, { useEffect, useState } from "react";
import { getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";
import GamerSearchBar from "../../shared/GamerSearchBar";
import { useRecoilValue } from "recoil";
import { searchState } from "../../../recoil/states";

const Wrapper = styled.main`
    margin-top: 100px;

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
        right: 100px;
    }

    .tier-container {
        display: grid;
        align-items: center;
        justify-items: center;
        .tier-subject {
            font-size: 30px;
        }
        .gamer-container {
            display: grid;
            grid-template-columns: repeat(10, 1fr);
            place-items: center;
            .gamer {
                margin-bottom: 50px;
                width: 100px;
                height: 100px;
                position: relative;
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
                    z-index: 10;
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
    "애기",
    "미지정",
];

export default function PlayerContainer() {
    const [gamerList, setGamerList] = useState<any>({
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
        애기: [],
        미지정: [],
    });

    const [selectedGamer, setSelectedGamer] = useState("");
    const [currentRecord, setCurrentRecord] = useState<any>({});
    const [backgroundClick, setBackgroundClick] = useState(false);
    const [filteredGamerList, setFilteredGamerList] = useState<any>({});
    const searchValue = useRecoilValue(searchState);

    useEffect(() => {
        getWholeGamerInfo()
            .then((result) => {
                let copy = { ...gamerList };
                // 서버에서 받아온 게이머리스트를 티어별로 분류
                for (const e of result) {
                    copy[e.standardTier].push(e);
                }
                setGamerList(copy);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);
    useEffect(() => {
        let copy = { ...gamerList };
        for (const key in copy) {
            copy[key] = copy[key].filter((e: any) => {
                return e._id.includes(searchValue.inputText);
            });
        }
        setFilteredGamerList(copy);
    }, [searchValue]);

    function filterHandler() {
        let copy = { ...gamerList };
    }

    function renderGamer(e: any, i: any) {
        const current = currentRecord[e._id];
        return (
            <div
                key={i}
                className={`gamer ${
                    selectedGamer &&
                    !backgroundClick &&
                    (current || selectedGamer === e._id ? "" : "no-played")
                } `}
            >
                <img
                    className={`gamer-image ${
                        selectedGamer === e._id && !backgroundClick
                            ? "selected"
                            : ""
                    }`}
                    src={`/images/gamer/${e._id}.png`}
                    onClick={(event) => {
                        event.stopPropagation();
                        setBackgroundClick(false);
                        setCurrentRecord(e.record);
                        setSelectedGamer(e._id);
                    }}
                />
                <span className={`${e.race}`}>{e._id}</span>
                {current && !backgroundClick && (
                    <>
                        <div>
                            {current["win"]}
                            {current["lose"]}
                        </div>
                        <div>{current["rate"]}</div>
                    </>
                )}
            </div>
        );
    }

    return (
        <Wrapper>
            <div className="search-bar">
                <GamerSearchBar />
            </div>
            <div
                className="tier-container"
                onClick={() => {
                    setBackgroundClick(true);
                }}
            >
                {tierList.map((e, i) => (
                    <>
                        <div className="tier-subject" key={i}>
                            {e} 티어
                        </div>
                        <div className="gamer-container">
                            {searchValue
                                ? filteredGamerList[e].map((e: any, i: any) =>
                                      renderGamer(e, i)
                                  )
                                : gamerList[e].map((e: any, i: any) =>
                                      renderGamer(e, i)
                                  )}
                        </div>
                    </>
                ))}
            </div>
        </Wrapper>
    );
}
