// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
require("dotenv").config();
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
// 아래 옵션을 지정해주어야 에러가 안뜸
// https://ko.javascript.info/fetch-crossorigin 참고
var corsOptions = {
  // 자격 증명이 함께 전송되는 요청을 보낼 땐 origin에 *을 쓸 수 없고 아래처럼 정확한 url정보가 명시되어야한다.
  // 이런 제약이 있어야 어떤 origin에서 요청이 왔는지에 대한 정보를 서버가 신뢰할 수 있기 때문이다.
  // 자격 증명 정보가 담긴 요청을 서버에서 받아들이기로 동의했다면 아래 2개 옵션을 추가해준다.
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions)); // cors 에러 해결 미들웨어
app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true })); // form 태그에서 name이 지정된 input 태그의 값을 가져오기위한 미들웨어
app.use(express.json()); // fetch함수로 보내진 json데이터를 받기위한 미들웨어
const MongoClient = require("mongodb").MongoClient;

let db;
MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.vlqqn.mongodb.net/todoapp?retryWrites=true&w=majority",
  function (err:any, client:any) {
    if (err) return console.log(err);

    db = client.db("todoapp");

    app.listen(process.env.PORT, function () {
      console.log(`listening on ${process.env.PORT}`);
    });
  }
);

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name:req.query.api })
  console.log(req.query)
}
