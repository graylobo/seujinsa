import React, { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/states";
export default function QnAContent({
  qnaInfo,
  setQnaInfo,
  setQnaClick,
  setEditorModalOpen,
  setTitle,
  setBody,
  setIsEdit,
}: any) {
  const userInfo = useRecoilValue(userInfoState);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="fixed  h-device inset-0 z-50 flex items-center justify-center p-[20px]">
      {confirm && <ConfirmModal qnaInfo={qnaInfo} setQnaClick={setQnaClick} />}
      <div className="bg-gray-100 rounded-[10px] relative py-[28px] px-[20px] max-w-[700px] w-full z-20 overflow-y-hidden min-h-[400px]  max-h-[[90%]%] flex flex-col">
        <div
          onClick={() => {
            setQnaClick(false);
          }}
          className="cursor-pointer absolute right-[16px] top-[16px]"
        >
          x
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="text-18 font-bold">{qnaInfo?.title}</h1>
          </div>
          <div className="flex items-center my-[16px] justify-between">
            <div className="flex items-center">
              <div className="w-[24px] h-[24px] ">
                <img
                  src={`${process.env.NEXT_PUBLIC_DB_URL}/image/${qnaInfo.emailID}.png`}
                  className={"rounded-[100%] w-full h-full"}
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
              </div>
              <span className="font-bold text-[14px] mx-[8px]">
                {qnaInfo.nickName}
              </span>
              <span className="text-[13px] text-gray-70">{qnaInfo.date}</span>
            </div>
            {qnaInfo.emailID === userInfo._id && (
              <div className="text-[14px] text-red-600 flex items-center whitespace-nowrap">
                <span
                  onClick={() => {
                    setEditorModalOpen(true);
                    setTitle(qnaInfo.title);
                    setBody(qnaInfo.body);
                    setIsEdit(true);
                  }}
                  className="mr-[12px] cursor-pointer"
                >
                  수정
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setConfirm(true);
                  }}
                >
                  삭제
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="qna-content overflow-y-scroll max-h-[400px]">
          <div className="whitespace-pre-line h-full w-full py-[20px] outline-none bg-gray-100 text-[14px]">
            <div
              className="w-full py-[20px] outline-none custom-editor"
              dangerouslySetInnerHTML={{ __html: qnaInfo.body }}
            ></div>
          </div>
          <div className="border-b border-gray-500 my-[20px]"></div>
          <div className="flex mb-[24px]">
            <input
              className=" outline-none w-full rounded-[10px] bg-gray-200 h-[48px] border border-gray-400 px-[12px] focus:bg-gray-100 focus:border-gray-700 focus:border-[2px] focus:outline-none focus:text-gray-700 appearance-none"
              type="text"
              placeholder="댓글을 입력해주세요."
            />
            <button className="ml-[16px] max-w-[96px] h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-gray-100">
              작성
            </button>
          </div>
          <div className="overflow-y-hidden h-full"></div>
        </div>
      </div>
      <style jsx>{`
        .qna-content::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}