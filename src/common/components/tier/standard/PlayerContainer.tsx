import React, { useEffect, useState } from "react";
import { getWholeGamerInfo } from "../../../utils/api-util";
import styled from "@emotion/styled";

const Wrapper = styled.main`
    margin-top: 100px;

    .테란{
        color:blue;
    }
    .저그{
        color:red;
    }   
    .프로토스{
        color:yellow;
    }
.tier-subject{
    font-size:30px;
}
    .tier-container {
        display: grid;
        align-items: center;
        justify-items: center;
    }
    .gamer-image {
        width: 70px;
        height: 70px;
    }
    .gamer-container {
        display: grid;
        grid-template-columns: repeat(10, 1fr);

        place-items:center;
        div {
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

    const tierBasedGamerList: any = {
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

    useEffect(() => {
        getWholeGamerInfo()
            .then((result) => {
                for (const e of result) {
                    tierBasedGamerList[e.standardTier].push(e);
                }
                setGamerList(tierBasedGamerList);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }, []);

    console.log("gamer", gamerList);

    return (
        <Wrapper>
            <div className="tier-container">
                {tierList.map((e, i) => (
                    <>
                        <div className="tier-subject" key={i}>{e}티어</div>
                        <div className="gamer-container">
                            {gamerList[e].map((e: any) => (
                                <div>
                                    <img
                                        className="gamer-image"
                                        src={`/images/gamer/${e._id}.png`}
                                        alt=""
                                    />
                                    <span className={`${e.race}`}>{e._id}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </Wrapper>
    );
}
