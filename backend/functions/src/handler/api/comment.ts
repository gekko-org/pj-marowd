import * as functions from "firebase-functions";
import * as express from "express";
import { GetToken } from "../../utils";
import * as admin from "firebase-admin";
import { Firestore } from "../../common";
import * as moment from "moment";

export const GetComment = async (
  req: functions.Request,
  resp: express.Response
): Promise<void> => {
  console.log(`subject_query= ${req.query["class_name"]}`);
  try {
    if (req.query["comment_id"]) {
      // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
      const tokenStr = GetToken(req);
      const token = await admin.auth().verifyIdToken(tokenStr);

      const qss = await Firestore.collection("ClassSummary")
        .doc(req.query["class_name"])
        .collection("comment")
        .doc(token.uid)
        .get();
      if (!qss.data()) {
        console.log(
          `No comment were found match with ${req.query["class_name"]}`
        );
        resp.sendStatus(404).send("Not Found");
        return;
      }
      resp.sendStatus(200).send(JSON.stringify(qss.data()));
      return;
    } else {
      const querySnapshot = await Firestore.collection("ClassSummary")
        .doc(req.query["class_name"])
        .collection("comment")
        .get();
      // for @kanade9 ここany型以外に出来ない？(recordsがany[]になるの厳しい・・・) elem.data()はfirestoreにあるレコードの認識なのでinterface作って、data: () => <interface> になってほしい！
      const records = querySnapshot.docs.map((elem: { data: () => any }) =>
        elem.data()
      );
      console.log(records);
      resp.send(JSON.stringify(records));
      return;
    }
  } catch (exception) {
    console.log("class not found probably wrong or empty query");
    console.log(exception);
    resp.sendStatus(404).send("Not Found");
    return;
  }
};

export const PostComment = async (
  req: functions.Request,
  resp: express.Response
): Promise<void> => {
  console.log("json received");
  const body = req.body;

  const tokenStr = GetToken(req);
  const token = await admin.auth().verifyIdToken(tokenStr);
  const data = {
    // for @kanade9 eslintだと全角スペースを入れると怒られるのでご参考までに・・・(下の文章に含まれていたので消しました。)
    // nameは授業名です。titleはコメントのタイトル ex. 神授業です!!等
    name: body.name,
    title: body.title,
    comment: body.comment,
    created_at: moment()
      .add(9, "h")
      .format(),
    updated_at: moment()
      .add(9, "h")
      .format(),
    edited_by: token.uid,
    image: body.image,
    is_recommend: body.is_recommend
  };
  // IDでなくユーザのuidを用いてデータベースに格納する
  try {
    await Firestore.collection("ClassSummary")
      .doc(body.name)
      .collection("comment")
      .doc(token.uid)
      .set(data);
    console.log(data);
    resp.sendStatus(200).send(JSON.stringify({ status: "OK" }));
    return;
  } catch (exception) {
    console.log("An error occurred. Comment cannot add in database");
    console.log(exception);
    resp.sendStatus(500).send("Internal Server Error");
    return;
  }
};

export const DeleteComment = async (
  req: functions.Request,
  resp: express.Response
): Promise<void> => {
  console.log(req.query["class_name"]);

  const tokenStr = GetToken(req);
  const token = await admin.auth().verifyIdToken(tokenStr);
  try {
    await Firestore.collection("ClassSummary")
      .doc(req.query["class_name"])
      .collection("comment")
      .doc(token.uid)
      .delete();
    resp.sendStatus(204);
    return;
  } catch (exception) {
    console.log("An error occurred. Comment cannot delete from database");
    console.log(exception);
    resp.sendStatus(500);
    return;
  }
};
