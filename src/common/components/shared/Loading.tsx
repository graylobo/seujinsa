import React from "react";
import ReactLoading from "react-loading";
import { useRecoilValue } from "recoil";
import { loadingState } from "../../recoil/states";

interface Props {
    type?: any;
    color?: string;
    message: string;
}
export default function Loading({
    type = "spin",
    color = "#E13431",
    message,
}: Props) {
    const loading = useRecoilValue(loadingState);
    console.log("ll", loading.msg);
    return loading.loading ? (
        <div className="contentWrap">
            <div className="background"></div>
            <div className="message">
                    {message ? message : loading.msg ? loading.msg : ""}
                </div>
            <div className="loading-bar">
               
                <ReactLoading
                    type={type}
                    color={color}
                    height={"100px"}
                    width={"100px"}
                />
            </div>
            <style jsx>{`
                .background {
                    position: fixed;
                    z-index: 998;
                    width: 100vw;
                    height: 100vw;
                    background-color: gray;
                    opacity: 0.5;
                }
                .loading-bar {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 999;
                }
                .message {
                    position: fixed;
                    width: 100vw;
                    height:20px;
                    font-weight: bold;
                    bottom: -30px;
                    top: 60%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1000;
                    text-align : center;
                }
            `}</style>
        </div>
    ) : (
        <></>
    );
}
