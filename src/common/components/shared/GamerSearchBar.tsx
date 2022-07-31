import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { searchState } from "../../recoil/states";
import _ from "lodash";

const Wrapper = styled.nav`
    #filter-box {
        margin-left: 250px;
        color: red;
    }
    .container {
        opacity: 0.8;
        width: 300px;
        height: 130px;
        background-color: white;
        color: black;
        padding: 10px;
        border-radius: 10px;
        position: relative;

        .line1 {
            margin-bottom: 5px;
        }
        .line2 {
            margin-bottom: 5px;
        }

        .checkbox-container {
            display:flex;
            margin-left:90px;
            
            .onair-box {
                width:130px;
            }
            .spon-box{
                width:100px;
                .disable{
                    color:gray;
                }

            }
            .record-exist-box{
                width:180px;

                .disable{
                    color:gray;
                }
            }
        }

        .name-input {
            width: 100px;
            margin-right: 10px;
            border: 1px solid lightgray;
            border-radius: 3px;
        }
        select {
            border: 1px solid lightgray;
            padding: 1px;
            border-radius: 3px;
        }
        .count {
            top: 40px;
            right: 30px;
            margin-left: 193px;
        }
    }
`;

const raceList = ["전체", "저그", "프로토스", "테란"];
const tierList = [
    "전체",
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
];
const univList = [
    "전체",
    "무소속",
    "캄성여대",
    "우끼끼즈",
    "바스포드",
    "CP",
    "철와대",
    "NSU",
    "JSA",
    "무친대",
    "아마대",
    "츠나대",
    "MSG",
    "파이스트(폐교)",
    "학버드(폐교)",
    "미다스(폐교)",
    "염석대(폐교)",
];
export default function GamerSearchBar({ count,gamerCount,selectedGamer }: any) {
    const [state, setState] = useRecoilState(searchState);
    const [filterOn, setFilterOn] = useState(true);
    return (
        <Wrapper>
            <div className="filter-container">
                <input
                    type="checkbox"
                    id="filter-box"
                    checked={filterOn}
                    onChange={(e) => {
                        setFilterOn(e.target.checked);
                    }}
                />
                <label htmlFor="filter-box">필터</label>
            </div>
            {filterOn && (
                <div className="container">
                    <div className="line1">
                        <span>이름: </span>
                        <input
                            type="text"
                            className="name-input"
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    inputText: e.target.value,
                                });
                            }}
                        />
                        <span className="race">종족: </span>
                        <select
                            className="race-select"
                            onChange={(e) => {
                                setState({ ...state, race: e.target.value });
                            }}
                        >
                            {raceList.map((e) => (
                                <option className="race-option" value={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="line2">
                        <span>티어: </span>
                        <select
                            className="mr-[18px]"
                            onChange={(e) => {
                                setState({ ...state, tier: e.target.value });
                            }}
                        >
                            {tierList.map((e) => (
                                <option value={e}>{e}</option>
                            ))}
                        </select>
                        <span>대학: </span>
                        <select
                            onChange={(e) => {
                                setState({ ...state, univ: e.target.value });
                            }}
                        >
                            {univList.map((e) => (
                                <option value={e}>{e}</option>
                            ))}
                        </select>
                    </div>
                    <div className="checkbox-container">
                        <div className="onair-box">
                            <input
                                type="checkbox"
                                id="onair"
                                checked={state.onair}
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        onair: e.target.checked,
                                    });
                                }}
                            />
                            <label htmlFor="onair">방송중</label>
                        </div>
                        <div className="spon-box">
                            <input
                                type="checkbox"
                                id="spon"
                                checked={state.spon}
                                disabled={!state.onair}
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        spon: e.target.checked,
                                    });
                                }}
                            />
                            <label className={!state.onair?"disable":""} htmlFor="spon">스폰</label>
                        </div>
                        <div className="record-exist-box">
                            <input
                                type="checkbox"
                                id="record-exist"
                                checked={state.recordExist}
                                disabled={!selectedGamer}
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        recordExist: e.target.checked,
                                    });
                                }}
                            />
                            <label className={`${!selectedGamer?"disable":""}`} htmlFor="record-exist">전적존재</label>
                        </div>
                    </div>

                    <div className="count">count:{gamerCount||count}</div>
                </div>
            )}
        </Wrapper>
    );
}
