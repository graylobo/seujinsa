import React from "react";
import ReactLoading from "react-loading";

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
  return (
    <div className="contentWrap">
      <h2 className="message">{message}</h2>
      <ReactLoading type={type} color={color} height={"80%"} width={"80%"} />
      <style jsx>{`
        .contentWrap {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .message {
          font-weight: bold;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}
