import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require("nodemailer");

const emailContent = (number:number) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Document</title>
</head>
<body>
    <div>
        <img src="https://mcusercontent.com/3517daadd568a1142665a73ba/images/48aab9c5-24dc-4c15-99d8-7517143808e1.png"
        alt="">
    <div>이메일 인증하기</div>
    <div>인증번호: ${number}</div>
    </div>
    
</body>
</html>`;


type Data = {
  name: string
}
let generateRandom = function (min:number, max:number) {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
  };
  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    let user_email = req.body.email; //받아온 email user_email에 초기화
  const number = generateRandom(111111, 999999);
  // 메일발송 함수
  let transporter = nodemailer.createTransport({
    service: "gmail", //사용하고자 하는 서비스
    port: 587,
    host: "smtp.gmail.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: "seujinsa@gmail.com", //gmail주소입력
      pass: "tmwlstk7102!", //gmail패스워드 입력
    },
  });

  let info = await transporter.sendMail({
    from: "seujinsa@gmail.com", //보내는 주소 입력
    to: user_email, //위에서 선언해준 받는사람 이메일
    subject: "[스진사] 이메일 계정 인증", //메일 제목
    html: emailContent(number), //내용
  });

  res.status(200).json({ authNum: number });
}
