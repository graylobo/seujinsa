import React, { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/states";
import { getDateFormat } from "../../utils/date";

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
  const [postDeleteConfirm, setPostDeleteConfirm] = useState(false);
  const [commentDeleteConfirm, setCommentDeleteConfirm] = useState(false);
  const [comment, setComment] = useState("");
  const [content, setContent] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);

  async function postComment() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/qna-comment`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: qnaInfo._id,
        emailID: userInfo._id,
        nickName: userInfo.nickName,
        date: getDateFormat(),
        comment: comment,
        commentId: String(Date.now()),
      }),
    });

    if (res.status === 200) {
      setComment("");
      getQNA();
    }
  }
  useEffect(() => {
    getQNA();
  }, []);
  useEffect(() => {
    getQNA();
  }, [confirmModal]);
  async function getQNA() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/comment/${qnaInfo._id}`
    );
    if (res.status === 200) {
      const json = await res?.json();
      setContent(json);
    }
  }
  async function deleteQnaPost() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/qna/${qnaInfo._id}/`,
      {
        method: "delete",
      }
    );

    return res;
  }
  async function deleteComment() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/comment/${qnaInfo._id}/${commentId}`,
      {
        method: "delete",
      }
    );
    return res;
  }
  console.log("content:", content);
  return (
    <div className="fixed  h-device inset-0 z-50 flex items-center justify-center p-[20px]">
      {postDeleteConfirm && confirmModal && (
        <ConfirmModal
          qnaInfo={qnaInfo}
          setConfirmModal={setConfirmModal}
          confirmMessage={"게시글을 삭제하시겠습니까?"}
          successMessage={"게시글이 삭제되었습니다."}
          action={deleteQnaPost}
        />
      )}
      {commentDeleteConfirm && confirmModal && (
        <ConfirmModal
          qnaInfo={qnaInfo}
          setConfirmModal={setConfirmModal}
          confirmMessage={"댓글을 삭제하시겠습니까?"}
          successMessage={"댓글이 삭제되었습니다."}
          action={deleteComment}
        />
      )}
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
                    setPostDeleteConfirm(true);
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
              disabled={!userInfo.isLogin}
              value={comment}
              placeholder={
                userInfo.isLogin
                  ? "댓글을 입력해주세요."
                  : "로그인 후 작성해주세요."
              }
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={() => {
                postComment();
              }}
              disabled={!userInfo.isLogin}
              className="ml-[16px] max-w-[96px] h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-gray-100"
            >
              작성
            </button>
          </div>
          <div className="overflow-y-hidden h-full">
            {content?.map((e: any, i: number) => (
              <div className="text-[14px] mb-[16px] last:mb-0">
                <div className="flex items-center justify-between mb-[12px]">
                  <div className="flex items-center cursor-pointer">
                    <div className="flex flex-row-reverse w-[24px] h-[24px]">
                      <img
                        src={`${process.env.NEXT_PUBLIC_DB_URL}/image/${
                          e?.emailID
                        }.png?${Date.now()}`}
                        className={"rounded-[100%] w-full h-full"}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = "/default-profile.png";
                        }}
                      />
                    </div>
                    <span className="mx-[8px] text-[14px] font-bold">
                      {e.nickName}
                    </span>
                    <span>{e.date}</span>
                  </div>
                  {e.emailID === userInfo._id && (
                    <div className="text-red-600">
                      <span className="mr-[12px] cursor-pointer">수정</span>
                      <span
                        onClick={() => {
                          setCommentId(e.commentId);
                          setConfirmModal(true);
                          setCommentDeleteConfirm(true);
                        }}
                        className="cursor-pointer"
                      >
                        삭제
                      </span>
                    </div>
                  )}
                </div>
                <div>{e.comment}</div>
              </div>
            ))}
          </div>
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
