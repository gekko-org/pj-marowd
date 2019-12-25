import * as functions from 'firebase-functions';
import * as express from 'express';

const bodyParser = require('body-parser');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const fdb = admin.firestore();

const ref = db.ref('server/account-data/');

// const express = require('express');
const cors = require('cors');
const class_d = express();
const comment_d = express();


// Automatically allow cross-origin requests
class_d.use(cors({ origin: true }));
class_d.use(bodyParser.json());

export const WelcomeLog = functions.auth.user().onCreate((user) => {
  console.log('Hello ' + user.displayName + ' logged in' + 'called by TS');

  // データベースに書き込む。一意に定まるユーザのuidを主キーとして設定し、メアドと名前を格納する。
  ref.child('users/' + user.uid).set({
    mail: user.email,
    name: user.displayName
  });
  return 0;
});

export const DeleteLog = functions.auth.user().onDelete((user) => {
  console.log('Hello ' + user.displayName + ' account deleted ' + 'called by TS');

  ref.child('users/' + user.uid).remove();

  return 0;
});

//　DBに登録or削除する処理はここまで
//　ここから下はswaggerに記載した処理を行う

export const comments = functions.https.onRequest(Comments);

async function Comments(req: functions.Request, resp: express.Response) {
  console.log('subject_query= ' + req.query['class_name']);
  try {
    const qss = await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').get();
    const records = qss.docs.map((elem: { data: () => void; }) => elem.data());
    console.log(records);
    resp.send(JSON.stringify(records));
  } catch (exception) {
    resp.send('class not found probably wrong or empty query');
  }
}

// export const comment = functions.https.onRequest(Comment);
//
// async function Comment(req: functions.Request, resp: express.Response) {
//   console.log('subject_query= ' + req.query['class_name'] + ' comment_id=' + req.query['comment_id']);
//   try {
//     const qss = await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').get();
//     const record = qss.docs[req.query['comment_id'] - 1].data();
//     console.log(record);
//     resp.send(JSON.stringify(record));
//   } catch (exception) {
//     resp.send('class not found probably wrong or empty query');
//   }
// }

export const get_class = functions.https.onRequest(Class);

async function Class(req: functions.Request, resp: express.Response) {
  console.log('subject_query= ' + req.query['class_name']);
  try {
    const documentSnapshot = await fdb.collection('ClassSummary').doc(req.query['class_name']).get();
    const record = documentSnapshot.data();
    console.log(record);
    resp.send(JSON.stringify(record));
  } catch (exception) {
    resp.send('class not found probably wrong or empty query');
  }
}

export const exist_class = functions.https.onRequest(Exist_class);

async function Exist_class(req: functions.Request, resp: express.Response) {
  console.log('subject_query= ' + req.query['class_name']);
  // ここだけクエリが空だとError: could not handle the requestがレスポンスで返されるので統一のためにtryで囲む
  try {
    const doc = await fdb.collection('ClassSummary').doc(req.query['class_name']).get();
    if (doc.exists) {
      console.log('OK');
      resp.send({ 'status': 'OK' });
    } else {
      resp.send('class not found probably wrong or empty query');
    }
  } catch (exception) {
    resp.send('class not found probably wrong or empty query');
  }
}

// build multiple CRUD interfaces:
class_d.get('/', async (req: functions.Request, resp: express.Response) => {
  console.log('subject_query= ' + req.query['class_name']);
  try {
    const documentSnapshot = await fdb.collection('ClassSummary').doc(req.query['class_name']).get();
    const record = documentSnapshot.data();
    console.log(record);
    resp.send(JSON.stringify(record));
  } catch (exception) {
    resp.send('class not found probably wrong or empty query');
  }
});

class_d.post('/', async (req: functions.Request, resp: express.Response) => {
  console.log('json received');
  const body = req.body;
  const data = {
    'name': body.name,
    'faculty': body.faculty,
    'department': body.department,
    'favamount': body.favamount,
    'grade': body.grade,
    'professor': body.professor,
    'israndom': body.israndom,
    'rating': body.rating,
    'term': body.term,
    'lastupdateby': body.lastupdateby,
    'created_at': body.created_at,
    'updated_at': body.updated_at,
    'made_by': body.made_by
  };
  try {
    await fdb.collection('ClassSummary').doc(body.name).set(data);
    console.log(data);
    resp.send(JSON.stringify({ 'status': 'OK' }));
  } catch (exception) {
    resp.send('An error occurred. Class data cannot add in database');
  }
});

// Expose Express API as a single Cloud Function:
exports.class_data = functions.https.onRequest(class_d);

comment_d.get('/', async (req: functions.Request, resp: express.Response) => {
  console.log('subject_query= ' + req.query['class_name'] + ' uid=' + req.query['uid']);
  try {
    const qss = await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').get();
    const record = qss.docs[req.query['uid']].data();
    console.log(record);
    resp.send(JSON.stringify(record));
  } catch (exception) {
    resp.send('class not found probably wrong or empty query');
  }
});

comment_d.post('/', async (req: functions.Request, resp: express.Response) => {
  console.log('json received');
  const body = req.body;

  const data={
    "name": body.name,
    "comment_id": body.comment_id,
    "title": body.title,
    "comment": body.comment,
    "created_at": body.created_at,
    "updated_at": body.updated_at,
    "made_by": body.made_by,
    "image": body.image,
    "isRecommend": body.isRecommend,
  };
  // IDでなくユーザのuidを用いてデータベースに格納する
  try {
    await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(body.made_by);
    console.log(data);
    resp.send(JSON.stringify({ 'status': 'OK' }));
  } catch (exception) {
    resp.send('An error occurred. Comment cannot add in database');
  }
});
exports.comment = functions.https.onRequest(comment_d);
