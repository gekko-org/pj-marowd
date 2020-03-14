import * as functions from "firebase-functions";
import * as express from "express";
import { Firestore } from "../../common";
import { GetToken } from "../../utils";
import * as admin from "firebase-admin";
import * as moment from "moment";

export const GetClassDataHandler = async (
  req: functions.Request,
  resp: express.Response
): Promise<void> => {
  console.log(`subject_query= ${req.query["class_name"]} `);
  try {
    // queryでクラス名が指定されなかった場合は全ての授業データを取得する
    if (!req.query["class_name"]) {
      const querySnapshot = await Firestore.collection("ClassSummary").get();
      // for @kanade9 ここany型以外に出来ない？(recordsがany[]になるの厳しい・・・) elem.data()はfirestoreにあるレコードの認識なのでinterface作って、data: () => <interface> になってほしい！
      const records = querySnapshot.docs.map((elem: { data: () => any }) =>
        elem.data()
      );
      console.log(records);
      resp.status(200).send(JSON.stringify(records));
      return;
    } else {
      const documentSnapshot = await Firestore.collection("ClassSummary")
        .doc(req.query["class_name"])
        .get();
      const record = documentSnapshot.data();
      resp.status(200).send(JSON.stringify(record));
      return;
    }
  } catch (exception) {
    console.log("class not found probably wrong or empty query");
    console.log(exception);
    resp.sendStatus(404);
    return;
  }
};

export const PostClassDataHandler = async (
  req: functions.Request,
  resp: express.Response
): Promise<void> => {
  resp.setHeader("Content-Type", "text/plain");
  console.log("json received");
  // req.setEncoding('utf8');
  console.log(req.body["name"]);
  const body = req.body;
  console.log(body);

  const tokenStr = GetToken(req);
  const token = await admin.auth().verifyIdToken(tokenStr);

  const data = {
    name: body.name,
    faculty: body.faculty,
    department: body.department,
    fav_amount: 0,
    grade: body.grade,
    professor: body.professor,
    is_random: body.is_random,
    rating: 0,
    term: body.term,
    edited_by: token.uid,
    created_at: moment()
      .add(9, "h")
      .format(),
    updated_at: moment()
      .add(9, "h")
      .format()
  };
  console.log(data);
  try {
    await Firestore.collection("ClassSummary")
      .doc(body.name)
      .set(data);
    console.log(data);
    resp.sendStatus(200);
    return;
  } catch (exception) {
    console.log("An error occurred. Class data cannot add in database");
    console.log(exception);
    resp.sendStatus(500);
    return;
  }
};
