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
        resp.sendStatus(404);
        return;
      }
      resp.status(200).send(JSON.stringify(qss.data()));
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
      const filteredData = records.filter(item => {
        return !!item.title;
      });
      console.log(filteredData);
      resp.status(200).send(JSON.stringify(filteredData));
      return;
    }
  } catch (exception) {
    console.log("class not found probably wrong or empty query");
    console.log(exception);
    resp.sendStatus(404);
    return;
  }
};

export const PostComment = async (
  req: functions.Request,
  resp: express.Response
): Promise<void> => {
  console.log("json received");
  const body = req.body;
  // console.log(body);

  const tokenStr = GetToken(req);
  const token = await admin.auth().verifyIdToken(tokenStr);
  const data = {
    // for @kanade9 eslintだと全角スペースを入れると怒られるのでご参考までに・・・(下の文章に含まれていたので消しました。)
    // nameは授業名です。titleはコメントのタイトル ex. 神授業です!!等
    // firestoreではnull値を許容するのでここでnull値の設定も行う
    name: body.name,
    title: body.title || null,
    image: body.image,
    edited_by: token.uid,
    comment: body.comment || null,
    is_recommend: body.is_recommend || null,
    created_at: moment()
      .add(9, "h")
      .format(),
    updated_at: moment()
      .add(9, "h")
      .format(),
    rating: body.rating || null
  };
  // commentがすでに存在するかどうかを確認する。存在する場合には更新を行う。
  let formerRating = 0;
  let Rating = 0;
  if (body.rating) {
    Rating = body.rating;
  }
  try {
    let formerDataSnapshot = await Firestore.collection("ClassSummary")
      .doc(body.name)
      .collection("comment")
      .doc(token.uid)
      .get();

    const formerData = formerDataSnapshot.data();
    if (!formerData) {
      resp.sendStatus(404);
      return;
    }
    data.created_at = formerData.created_at;
    if (formerData.rating) {
      formerRating = formerData.rating;
    }
  } catch (exception) {
    console.log("A new comment is created.");
  }

  // 親の授業データにレーティングとつけた人数を追加する
  try {
    const documentSnapshot = await Firestore.collection("ClassSummary")
      .doc(body.name)
      .get();
    const classDataRecord = documentSnapshot.data();
    if (!classDataRecord) {
      resp.sendStatus(404);
      return;
    }
    const newSumRating = classDataRecord.sum_rating + Rating - formerRating;
    const newRatingCounted =
      classDataRecord.rating_counted + Number(!formerRating);

    console.log(
      "newSumrating" + newSumRating,
      +"newRatingCounted" + newRatingCounted
    );

    await Firestore.collection("ClassSummary")
      .doc(body.name)
      .update({ sum_rating: newSumRating, rating_counted: newRatingCounted });
  } catch (exception) {
    console.log(exception);
    resp.sendStatus(404);
    return;
  }
  // 以下、コメント投稿の処理
  // IDでなくユーザのuidを用いてデータベースに格納する
  try {
    await Firestore.collection("ClassSummary")
      .doc(body.name)
      .collection("comment")
      .doc(token.uid)
      .set(data);
    // console.log(data);
    resp.sendStatus(200);
    return;
  } catch (exception) {
    console.log("An error occurred. Comment cannot add in database");
    console.log(exception);
    resp.sendStatus(500);
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
