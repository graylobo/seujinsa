import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { searchState } from "../../recoil/states";
import _ from "lodash";

const Wrapper = styled.nav`
    .container {
        width: 300px;
        height: 70px;
        background-color: white;
        color: black;
        padding: 10px;
        border-radius: 10px;
        position:relative;
    }

    .name-input {
        width: 100px;
        margin-right: 10px;
        border: 1px solid black;
    }
    .race-select {
        border: 1px solid black;
        padding: 1px;
    }
    .count{
        position:absolute;
        top:40px;
        right:30px;;
    }
`;

const raceList = ["전체", "저그", "프로토스", "테란"];
export default function GamerSearchBar({ count }: any) {
    const [state, setState] = useRecoilState(searchState);
    return (
        <Wrapper>
            <div className="container">
                <span>이름: </span>
                <input
                    type="text"
                    className="name-input"
                    onChange={(e) => {
                        setState({ ...state, inputText: e.target.value });
                    }}
                />
                <span className="race">종족: </span>
                <select className="race-select" onChange={(e)=>{
                    setState({...state,race:e.target.value})
                }}>
                    {raceList.map((e) => (
                        <option className="race-option" value={e}>{e}</option>
                    ))}
                </select>

                <span className="count">count:{count}</span>
            </div>
        </Wrapper>
    );
}
