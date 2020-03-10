// for @kanade9 後々トークンをもっと簡単に取ってくる方法見つけたときにこの関数を変更すれば良いだけになる様に切り出しておく
import { Request } from "express";

export const GetToken = (req: Request): string => {
  // AuthorizationヘッダーはBearer <id_token>の形式のため、id_tokenを取り出すために7文字目以降の文字列を切り出している
  console.log(`METOD: ${req.method}`);
  console.log(`headers: ${JSON.stringify(req.headers)}`);
  console.log(JSON.stringify(req.headers.authorization));
  // req.headers.authorization.split(" ")[1]でBearer以降の文字列を取り出している。
  return req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
};
