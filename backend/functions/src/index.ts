import * as functions from 'firebase-functions';
import * as express from 'express';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const fdb = admin.firestore();

const ref = db.ref('server/account-data/');

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

// クライアントから送られてきたIDトークンを元に処理を行う

// request.body.name　で送られてきたリクエストにアクセスできる。
export const GetComment = functions.https.onRequest((request, response) => {

  // const comment = fdb.collection('ClassSummary').doc(request.query['class_name']).collection('comment').doc('1');
  // const comment = fdb.collection('ClassSummary').doc(request.query['class_name']);
  // console.log(request.query['class_name'],request.query['comment_id']);
  // console.log(comment);
  const Ref = fdb.document('ClassSummary/{request.query[\'class_name\']}');
  const doc = Ref.get();
  if (doc.exists) {
    console.log(doc.id);
    console.log(doc.data());
  } else {
    console.log('error');
  }
  response.status(200);
  // console.log(request.query['class_name'],request.query['comment_id']);
});

export const test = functions.https.onRequest((request, response) => {
  const aTuringRef = fdb.collection('users').doc('aturing');
  aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  });
  response.status(200);
  return 0;
});

export const testget = functions.https.onRequest((request, response) => {
  fdb.collection('users').get()
    .then((snapshot: { forEach: (arg0: (doc: any) => void) => void; }) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err: any) => {
      console.log('Error getting documents', err);
    });
  return 0;
});
// request.query['class_name']
export const comments = functions.https.onRequest((request, response) => {
  // fdb.collection('ClassSummary').doc('科目名クエリ').collection('comment').get()
  const class_query=request.query['class_name'];
  console.log(class_query);
  fdb.collection('ClassSummary').doc(class_query).collection('comment').get()
    .then((snapshot: { forEach: (arg0: (doc: any) => void) => void; }) => {
      snapshot.forEach((doc) => {
        console.log(doc.data());
        response.send(doc.data());
      });
    })
    .catch((err: any) => {
      console.log('Error getting documents', err);
      response.send(404)
    });
  return 0;
});

export const testget3 = functions.https.onRequest((request, response) => {
  const eee=fdb.collection('ClassSummary').doc('最適化数学').collection('comment').doc('1');
  console.log(eee.data());
  // console.log(ddd.id, '=>', ddd.data());
  console.log(request.query['class_name'],request.query['comment_id']);

  return 0;
});

export const testget4 = functions.https.onRequest((request, response) => {
  console.log(request.query['class_name'],request.query['comment_id']);
  return 0;
});

export const testget5 = functions.https.onRequest((request, response) => {
  const data= fdb.collection('ClassSummary').doc('最適化数学').collection('comment').where('comment', '==', request.query['comment_id']).get();
  console.log(data.id);
  console.log(data.data());
  response.send(data.data());
  return 0;
});

export const testget6 = functions.https.onRequest((request, response) => {
  const data= fdb.collection('ClassSummary').doc('最適化数学').where('comment', '==', request.query['comment_id']).get();
  console.log(data.id);
  console.log(data.data());
  response.send(data.data());
  return 0;
});

export const testget7 = functions.https.onRequest((request, response) => {
  const data= fdb.collection('ClassSummary').doc('最適化数学').collection('comment').where('comment', '==', 1).get();
  console.log(data.id);
  console.log(data.data());
  response.send(data.data());
  return 0;
});

export const comments2 = functions.https.onRequest((request, response) => {
  // fdb.collection('ClassSummary').doc('最適化数学').collection('comment').get()
  const jsonStr = '{"Comments":[]}';
  const obj = JSON.parse(jsonStr);
  const class_query=request.query['class_name'];
  console.log(class_query);
  fdb.collection('ClassSummary').doc(class_query).collection('comment').get()
    .then((snapshot: { forEach: (arg0: (doc: any) => void) => void; }) => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        obj['Comments'].push(doc.data());
      });
    })
    .catch((err: any) => {
      console.log('Error getting documents', err);
    });
  // @ts-ignore
  jsonStr = JSON.stringify(obj);
  response.send(jsonStr);
  return 0;
});

export const comments4 = functions.https.onRequest((request, response) => {
  // fdb.collection('ClassSummary').doc('最適化数学').collection('comment').get()
  const jsonStr = '{"Comments":[]}';
  const obj = JSON.parse(jsonStr);
  const class_query=request.query['class_name'];
  console.log(class_query);
  fdb.collection('ClassSummary').doc(class_query).collection('comment').get()
    .then((snapshot: { forEach: (arg0: (doc: any) => void) => void; }) => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        obj['Comments'].push(doc.data());
      });
    })
    .catch((err: any) => {
      console.log('Error getting documents', err);
    });
  // @ts-ignore
  jsonStr = JSON.stringify(obj);
  response.send(jsonStr);
  return 0;
});

export const comments3 = functions.https.onRequest(async (request, response) => {
  // const jsonStr = '';
  // const obj = JSON.parse(jsonStr);
  const class_query = request.query['class_name'];

  try {
    const snapshot = await fdb.collection('ClassSummary').doc(class_query).collection('comment').get();
    const data = snapshot.data();
    console.log(data);
    response.send(data);
  } catch (error) {
    response.status(500).send(error);
  }
});

export const sample = functions.https.onRequest(sampleRequest);
async function sampleRequest(req:functions.Request,resp:express.Response) {
  const qss = await fdb.collection('ClassSummary').doc('最適化数学').collection('comment').get();
  const records = qss.docs.map((elem: { data: () => void; }) => elem.data());
  console.log(records);
  resp.send(JSON.stringify(records));
}
