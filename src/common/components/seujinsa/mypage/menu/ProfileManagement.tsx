import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState, isMobileState } from "../../../../recoil/states";
import ConfirmButton from "../../shared/ConfirmButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import path from "path";
import { checkNickNameExist } from "../../../../utils/api-util";
import { PropagateLoader } from "react-spinners";

export default function ProfileManagement() {
  const [userState, setUserState] = useRecoilState(userInfoState);
  const [image, setImage] = useState<any>(null);
  const [profile, setProfile] = useState("");
  const [nickName, setNickName] = useState<any>("");
  const [introduction, setIntroduction] = useState<any>("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(false);
  const isMobile = useRecoilValue(isMobileState);

  function checkTextValid(str: string) {
    const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 체크
    if (!pattern_spc.test(str)) {
      return true;
    } else {
      return false;
    }
  }
  const onImageChange = async (e: any) => {
    if (userState._id) {
      if (e.target.files && e.target.files[0]) {
        let insertedImage = e.target.files[0];
        let ext = path.extname(insertedImage.name).toLowerCase();
        if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
          alert("jpg, png, jpeg 형식의 이미지만 업로드 가능합니다.");
          return;
        }
        if (insertedImage.size > 5 * 1024 * 1024) {
          alert("5MB 이하 이미지만 업로드 할 수 있습니다.");
          return;
        }
        const formData = new FormData();
        formData.append("profile", insertedImage, `${userState._id}.png`);
        setFormData(formData);
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const subjectCSS = "mb-[10px] text-[15px]";
  const inputCSS =
    "focus:bg-white focus:border-gray-300 outline-none w-full rounded-[10px] bg-gray-100  border border-gray-40 px-[12px] focus:bg-gray-10 focus:border-gray-70 focus:border-2 focus:outline-none focus:text-gray-70 appearance-none";

  useEffect(() => {
    if (!userState.nickName) {
      setNickName(userState._id?.split("@")[0]);
    } else {
      setNickName(userState.nickName);
    }
    setIntroduction(userState.introduction);
    var http = new XMLHttpRequest();
    http.open(
      "HEAD",
      `${process.env.NEXT_PUBLIC_DB_URL}/image/${userState._id}.png`,
      false
    );
    http.send();
    if (http.status != 500) {
      setProfile(
        `${process.env.NEXT_PUBLIC_DB_URL}/image/${userState._id}.png`
      );
    }
  }, []);

  async function updateUserInfo() {
    setLoading(true);
    try {
      const user_res = await fetch(
        `${process.env.NEXT_PUBLIC_DB_URL}/user-info`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: userState._id,
            nickName: nickName.trim(),
            introduction: introduction,
          }),
        }
      );
      const profile_res = await fetch(
        `${process.env.NEXT_PUBLIC_DB_URL}/profile-image`,
        {
          method: "post",
          body: formData,
        }
      );

      if (user_res.status === 200 && profile_res.status === 200) {
        setUserInfo({
          ...userInfo,
          nickName: nickName.trim(),
          introduction: introduction,
        });
        toast.success("정보가 수정되었습니다.", {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const json = await profile_res.json();
        toast.error(json.msg, {
          autoClose: 1500,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`relative h-full w-full max-w-[428px] self-center flex flex-col ${
        isMobile && "p-[20px]"
      }`}
    >
      <ToastContainer />

      {loading && (
        <div className="modal-background flex justify-center items-center">
          <PropagateLoader color="gold" />
        </div>
      )}

      <div className={subjectCSS}>프로필 이미지</div>
      <div className="relative mb-[30px] w-[100px]  ">
        <label htmlFor="file-input">
          <img
            src={
              image || profile
                ? image || profile + "?" + Date.now()
                : "/default-profile.png"
            }
            className={`w-[100px] h-[100px] rounded-full cursor-pointer object-contain`}
          />
          <img
            src="./edit-profile.svg"
            className="absolute bottom-0 left-[70px] cursor-pointer"
          />
          <input
            id="file-input"
            type="file"
            onChange={onImageChange}
            className="hidden"
            accept=".png,.jpg,.jpeg"
          />
        </label>
      </div>
      <div className={subjectCSS}>닉네임</div>
      <input
        type="text"
        className={`${inputCSS} h-[48px] `}
        value={nickName}
        maxLength={8}
        placeholder={"닉네임을 입력해주세요"}
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      />
      <div>
        <span className="text-[12px] text-gray-70 float-right">
          {nickName.length}/8
        </span>
      </div>
      <div className={subjectCSS}>소개글</div>
      <textarea
        maxLength={100}
        className={`${inputCSS} h-[100px] resize-none text-black`}
        value={introduction}
        placeholder={"소개글을 입력해주세요"}
        onChange={(e) => {
          setIntroduction(e.target.value);
        }}
      />
      <div>
        <span className="text-[12px] text-gray-70 float-right">
          {introduction.length}/100
        </span>
      </div>
      <ConfirmButton
        text="수정"
        onClick={async () => {
          if (nickName == null || nickName.trim() === "") {
            toast.error("닉네임은 한글자 이상으로 설정할 수 있습니다.", {
              autoClose: 1500,
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
          if (!checkTextValid(nickName)) {
            toast.error("닉네임에 특수문자를 설정할 수 없습니다.", {
              autoClose: 1500,
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
          if (userInfo.nickName !== nickName) {
            if (await checkNickNameExist(nickName.trim())) {
              toast.error("이미 존재하는 닉네임 입니다.", {
                autoClose: 1500,
                position: toast.POSITION.TOP_CENTER,
              });
              return;
            }
          }

          updateUserInfo();
        }}
      />
    </div>
  );
}
