import React from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { searchState } from "../../recoil/states";

const Wrapper = styled.nav``;
export default function GamerSearchBar() {
    const [state,setState] = useRecoilState(searchState);
    return (
        <Wrapper>
            <div>
                <span>이름:</span>
                <input type="text" onChange={(e)=>{
                    setState({...state,inputText:e.target.value});
                }}/>
            </div>
        </Wrapper>
    );
}
