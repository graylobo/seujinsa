import React, { useEffect, useState } from "react";
import QuillEditor from "../shared/QuillEditor";
import { useRecoilValue, useRecoilState } from "recoil";
import { userInfoState, QnAProps, qnaInfoState } from "../../../recoil/states";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SyncLoader } from "react-spinners";
import QnAContent from "../modal/QnAContent";
import { getDateFormat } from "../../../utils/date";

export default function QNA() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(""); // Quill 에디터의 innerHTML을 담는 state
  const [mountBody, setMountBody] = useState(false); // 리렌더링 용도 state
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [canUpload, setCanUpload] = useState(false); // 건의사항 누르면 나오는 등록버튼 활성화 여부
  const [qnaList, setQnaList] = useState([]);
  const userInfo = useRecoilValue(userInfoState);
  const [loading, setLoading] = useState(false);
  const [isQnaClick, setQnaClick] = useState(false);
  const [qnaInfo, setQnaInfo] = useRecoilState(qnaInfoState);
  const [isEdit, setIsEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  async function postQNA() {
    try {
      setEditLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/qna`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: userInfo._id,
          nickName: userInfo.nickName,
          date: getDateFormat(),
          title: title,
          body: body,
        }),
      });
      if (res.status === 200) {
        toast.success("게시글이 등록되었습니다.", {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
        setEditorModalOpen(false);
      }
    } catch (error) {
      alert(error);
    }
    setEditLoading(false);
  }
  async function editQNA() {
    setEditLoading(true);
    const data: QnAProps = {
      _id: qnaInfo._id,
      emailID: userInfo._id,
      nickName: userInfo.nickName,
      date: getDateFormat(),
      title: title,
      body: body,
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/qna-edit`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        setEditorModalOpen(false);
        setIsEdit(false);
        setTitle("");
        setBody("");
        setQnaInfo(data);
        toast.success("게시글이 수정되었습니다.", {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(await res.text(), {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      alert(error);
    }
    setEditLoading(false);
  }

  function onModalOpen() {
    if (userInfo.isLogin) {
      setEditorModalOpen(true);
    } else {
      toast.error("로그인 상태에서 등록이 가능합니다.", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  useEffect(() => {
    getQNA();
  }, [isQnaClick]);
  async function getQNA() {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/qna`);
      if (res.status === 200) {
        const json = await res.json();
        setQnaList(json);
      }
    } catch (error) {
      alert(error);
    }

    setLoading(false);
  }
  useEffect(() => {
    if (!editorModalOpen) {
      setTitle("");
      setBody("");
    }
    getQNA();
  }, [editorModalOpen]);

  useEffect(() => {
    if (title.trim().length !== 0 && body.trim().length !== 0) {
      setCanUpload(true);
    } else if (title.trim().length === 0) {
      setCanUpload(false);
    }
  }, [title, body]);

  function qnaClickHandler(qnaInfo: QnAProps) {
    setQnaClick(true);
    setQnaInfo(qnaInfo);
  }
  return (
    <section className="mt-[56px]">
      <ToastContainer />
      {editLoading && (
        <div className="modal-background flex justify-center items-center">
          <SyncLoader color="red" size={15} />
        </div>
      )}
      <div className={editorModalOpen ? "qna-modal-background" : ""}></div>
      <div className="px-[20px] pt-[24px] h-full flex flex-col">
        <div className="max-w-[700px] w-full mx-auto">
          <h1 className="font-bold text-[22px] mb-[8px]">건의 사항</h1>
          
        </div>
        <div className="grid grid-cols-1 gap-[20px] py-[20px] max-w-[700px] w-full mx-auto">
          {loading && (
            <div className="fixed left-[50%] top-[30%] translate-x-[-50%]">
              {<SyncLoader size={10} color={"red"} />}
            </div>
          )}

          {qnaList.map((e: QnAProps) => (
            <div
              key={e._id}
              className="w-full bg-[#E9E9E9] rounded-[10px] p-[16px] last:mb-[56px] cursor-pointer text-black"
              onClick={() => {
                qnaClickHandler(e);
              }}
            >
              <p className="font-bold">{e.title}</p>

              <div className="flex items-center mt-[16px] mb-[8px]">
                <div className="w-[24px] h-[24px] ">
                  <img
                    src={`${process.env.NEXT_PUBLIC_DB_URL}/image/${
                      e.emailID
                    }.png?${Date.now()}`}
                    className={"rounded-[100%] w-full h-full"}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = "/default-profile.png";
                    }}
                  />
                </div>
                <span className="font-bold text-[14px] mx-[8px]">
                  {e.nickName}
                </span>
                <span className="text-[13px] text-gray-700">{e.date}</span>
              </div>
              <div className="whitespace-pre-line w-full py-[20px] outline-none text-[14px] cursor-pointer">
                <div
                  dangerouslySetInnerHTML={{ __html: e.body }}
                  className="w-full py-[20px] outline-none custom-editor"
                ></div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
      {isQnaClick && (
        <div className="qna-modal-background">
          <QnAContent
            qnaInfo={qnaInfo}
            setQnaInfo={setQnaInfo}
            setQnaClick={setQnaClick}
            setEditorModalOpen={setEditorModalOpen}
            setTitle={setTitle}
            setBody={setBody}
            setIsEdit={setIsEdit}
          />
        </div>
      )}

      <div className="max-w-700 mx-auto fixed left-0 right-0 bottom-[56px] w-full px-[20px] z-10 py-[12px] flex justify-center">
        <button
          onClick={() => {
            onModalOpen();
          }}
          className=" h-[48px] w-full max-w-[500px] py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-50 text-gray-100"
        >
          건의 등록
        </button>
      </div>
      {/* 모달시작 */}
      {editorModalOpen && (
        <div className="modal-box ">
          <div className="absolute right-0 top-0">
            <div
              className="close close2"
              onClick={() => {
                setEditorModalOpen(false);
              }}
            ></div>
          </div>

          <div className="mb-[16px]">
            <label htmlFor="" className="text-[14px] mb-[8px] inline-block">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className=" outline-none w-full rounded-[10px] bg-gray-200 h-[48px] border border-gray-400 px-[12px] focus:bg-gray-100 focus:border-gray-700 focus:border-[2px] focus:outline-none focus:text-gray-700 appearance-none"
            />
          </div>
          <p className="text-[14px]">내용</p>
          <div className="w-full rounded-[10px] resize-none pb-[40px] h-[300px] text-gray-800 my-[16px] outline-none z-500">
            <QuillEditor
              body={body}
              handleQuillChange={setBody}
              mountBody={mountBody}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <button
              onClick={() => {
                setEditorModalOpen(false);
              }}
              className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors hover:border-0 bg-gray-100 hover:bg-red-100 border border-red-600 text-red-600"
            >
              취소
            </button>
            {isEdit ? (
              <button
                disabled={!canUpload}
                onClick={() => {
                  editQNA();
                }}
                className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-gray-100"
              >
                수정
              </button>
            ) : (
              <button
                disabled={!canUpload}
                onClick={() => {
                  postQNA();
                }}
                className=" h-[48px] w-full py-[12px] rounded-[8px] outline-none transition-colors bg-red-600 hover:bg-red-800 disabled:bg-gray-500 text-gray-100"
              >
                등록
              </button>
            )}
          </div>
        </div>
      )}

      {/* 모달종료 */}
      <style jsx>{`
        .qna-modal-background {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index:50;
        }
        .modal-box {
          padding: 20px;
          position: fixed;
          top: 100px;
          bottom:100px;

          left: 50%;
          transform: translate(-50%);
          z-index:50;
          background-color: white;
          display: flex;
          border-radius: 10px;
          width: 100%;
          max-width: 700px;
          max-height: 90%
          min-height: 400px;
          flex-direction: column;
          overflow-y:scroll;
          
        }
        .modal-box::-webkit-scrollbar {
           display: none;
        }
      `}</style>
    </section>
  );
}
