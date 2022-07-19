import React, { useEffect, useState } from "react";
import { getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";
import GamerSearchBar from "../../shared/GamerSearchBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState } from "../../../recoil/states";
import _ from "lodash";

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
        z-index:1;
    }

    .tier-container {
        display: grid;
        justify-items: center;
        align-items: center;
        .tier-subject {
            font-size: 30px;
        }
        .gamer-container {
            grid-template-columns: repeat(10, 1fr);
            place-items: center;
            display: grid;

            .gamer {
                width: 100px;
                margin-bottom: 50px;
                height: 100px;
                position: relative;

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
    "애기",
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
    애기: [],
    미지정: [],
};

export default function PlayerContainer() {
    const searchValue = useRecoilValue(searchState);
    const [gamerList, setGamerList] = useState<any>(initTierValue);
    const [initialGamerList, setInitialGamerList] = useState<any>(initTierValue); // 서버에서 받아온 초기 데이터 (setGamerList 와 구분짓는 이유: [1]useEffect참고 )
    const [selectedGamer, setSelectedGamer] = useState("");
    const [currentRecord, setCurrentRecord] = useState<any>({});
    const [backgroundClick, setBackgroundClick] = useState(false);
    const [count, setCount] = useState(0)

    useEffect(() => {
        getWholeGamerInfo()
            .then((result) => {
                let copy: any = _.cloneDeep(initTierValue);
                // 서버에서 받아온 게이머리스트를 티어별로 분류
                for (const e of result) {
                    copy[e.standardTier].push(e);
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
            console.log('searchValue.race',searchValue.race)
            copy[key] = copy[key].filter((e: any) => e._id.includes(searchValue.inputText));
            if(searchValue.race!=="전체"){
                copy[key]  = copy[key].filter((e:any)=>e.race===searchValue.race);
            }
            
            count += copy[key].length;
        }
        setGamerList(copy);
        setCount(count)
    }, [searchValue]);

    

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
                <GamerSearchBar count={count}/>
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
                            { gamerList[e].map((e: any, i: any) =>
                                renderGamer(e, i)
                            )}
                        </div>
                    </>
                ))}
            </div>
        </Wrapper>
    );
}
