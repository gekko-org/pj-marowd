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
const classData = express();
const commentData = express();
const moment = require('moment');


// Automatically allow cross-origin requests
classData.use(cors({ origin: true }));
classData.use(bodyParser.json());

async function Verification(req: express.Request, resp: express.Response, next: () => void) {
  // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
  // @ts-ignore

  // slice(7)の7はtokenの不要な文字列を削除するため
  const tokenstr = req.headers.authorization.toString().slice(7);

  try {
    const token = await admin.auth().verifyIdToken(tokenstr);

    if (token.uid == req.query['uid']) {
      next();
    } else {
      resp.send('Error: Id token does not match \'query uid\' ');
    }
  } catch (exception) {
    resp.send('Error: Firebase ID token has kid claim which does not correspond to a known public key. so get a fresh token from your client app and try again');
  }
}

classData.use(Verification);
commentData.use(Verification);

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
    // query:class_name がDBにない場合レスポンスを返さない場合があるのでその処理
    if (!record) {
      resp.send('401 Unauthorized');
    }
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
classData.get('/', async (req: functions.Request, resp: express.Response) => {
  console.log('subject_query= ' + req.query['class_name']);
  try {
    const documentSnapshot = await fdb.collection('ClassSummary').doc(req.query['class_name']).get();
    const record = documentSnapshot.data();
    if (record == undefined) {
      resp.send('class not found probably wrong or empty query');
    }
    resp.send(JSON.stringify(record));
  } catch (exception) {
    resp.send('class not found probably wrong or empty query');
  }
});

classData.post('/', async (req: functions.Request, resp: express.Response) => {
  console.log('json received');
  const body = req.body;

  // Check the validity of the token
  const uid = admin.auth.decodedToken(body.token).uid;
  if (uid == undefined) {
    resp.send('token error');
  } else {
    console.log(uid);
  }

  let class_created_time = null;
  const doc = await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(body.made_by).get();
  if (doc.exists) {
    class_created_time = doc.data().created_at;
  } else {
    class_created_time = moment().add(9, 'h').format();
  }
  const data = {
    'name': body.name,
    'faculty': body.faculty,
    'department': body.department,
    'fav_amount': body.fav_amount,
    'grade': body.grade,
    'professor': body.professor,
    'is_random': body.is_random,
    'rating': body.rating,
    'term': body.term,
    'update_by': body.update_by,
    'created_at': class_created_time,
    'updated_at': moment().add(9, 'h').format(),
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
exports.class_data = functions.https.onRequest(classData);

commentData.get('/', async (req: functions.Request, resp: express.Response) => {
  console.log('subject_query= ' + req.query['class_name'] + ' uid=' + req.query['uid']);
  try {
    const qss = await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').doc(req.query['uid']).get();
    if (qss.data() == undefined) {
      resp.send('No comment were found match with ' + req.query['class_name'] + ' and this uid');
    }
    resp.send(JSON.stringify(qss.data()));
  } catch (exception) {
    resp.send('class not found probably wrong or empty query');
  }
});

commentData.post('/', async (req: functions.Request, resp: express.Response) => {
  console.log('json received');
  const body = req.body;
  let created_time = null;
  const doc = await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(body.made_by).get();
  if (doc.exists) {
    created_time = doc.data().created_at;
  } else {
    created_time = moment().add(9, 'h').format();
  }

  const data = {
    'name': body.name,
    'title': body.title,
    'comment': body.comment,
    'created_at': created_time,
    'updated_at': moment().add(9, 'h').format(),
    'made_by': body.made_by,
    'image': body.image,
    'is_recommend': body.is_recommend
  };
  // IDでなくユーザのuidを用いてデータベースに格納する
  try {
    await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(body.made_by).set(data);
    console.log(data);
    resp.send(JSON.stringify({ 'status': 'OK' }));
  } catch (exception) {
    resp.send('An error occurred. Comment cannot add in database');
  }
});


commentData.delete('/', async (req: functions.Request, resp: express.Response) => {
  console.log(req.query['class_name'], '+', req.query['uid']);
  try {
    await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').doc(req.query['uid']).delete();
  } catch (exception) {
    resp.send('An error occurred. Comment cannot delete from database');
  }
});
exports.comment = functions.https.onRequest(commentData);
