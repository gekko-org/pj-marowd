import * as functions from 'firebase-functions';
import * as express from 'express';


const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const bodyParser = require('body-parser');
const moment = require('moment');
const db = admin.database();
const fdb = admin.firestore();
const ref = db.ref('server/account-data/');
const app = express();

app.use(bodyParser.json());

async function Verification(req: express.Request, resp: express.Response, next: () => void) {
    // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
    // @ts-ignore
    // AuthorizationヘッダーはBearer <id_token>の形式のため、id_tokenを取り出すために7文字目以降の文字列を切り出している
    const tokenstr = req.headers.authorization.toString().slice(7);
    console.log(tokenstr);
    const token = await admin.auth().verifyIdToken(tokenstr);
    const uid=token.uid;
    console.log(uid);
    ref.child('users/' + uid).once("value", (snapshot: { exists: () => any; }) => {
        if (snapshot.exists()) {
            next();
        } else {
            console.log('Error: Id token does not match \'query uid\' ');
            resp.status(401).send('Unauthorized');
        }
    });
}

app.use(Verification);

export const RegisterLog = functions.auth.user().onCreate((user) => {
    console.log('Hello ' + user.displayName + ' logged in' + 'called by TS');

    // データベースに書き込む。一意に定まるユーザのuidを主キーとして設定し、メアドと名前を格納する。
    ref.child('users/' + user.uid).set({
        mail: user.email,
        name: user.displayName
    });
    return 0;
});

export const UnRegisterLog = functions.auth.user().onDelete((user) => {
    console.log('Hello ' + user.displayName + ' account deleted ' + 'called by TS');

    ref.child('users/' + user.uid).remove();

    return 0;
});

// build multiple CRUD interfaces:
app.get('/class_data', async (req: functions.Request, resp: express.Response) => {
    console.log('subject_query= ' + req.query['class_name']);
    const err = "";
    const db_data = await fdb.collection('ClassSummary').doc(req.query['class_name']).get();
    const record = db_data.data();
    if (err !== "") {
        console.log('class not found probably wrong or empty query');
        resp.status(404).send('Not Found');
    } else {
        resp.send(JSON.stringify(record));
    }
});


app.post('/class_data', async (req: functions.Request, resp: express.Response) => {
    console.log('json received');
    const body = req.body;

    // Check the validity of the token

    const uid = admin.auth.decodedToken(body.token).uid;
    if (!uid) {
        resp.status(401).send('Unauthorized');
        return 0;
    } else {
        console.log(uid);
    }

    const doc = await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(body.made_by).get();
    const class_created_time = doc.data().created_at || moment().add(9, 'h').format();

    const data = {
        'name': body.name,
        'faculty': body.faculty,
        'department': body.department,
        'fav_amount': 0,
        'grade': body.grade,
        'professor': body.professor,
        'is_random': body.is_random,
        'rating': 0,
        'term': body.term,
        'edited_by': body.edited_by,
        'created_at': class_created_time,
        'updated_at': moment().add(9, 'h').format(),
    };
    let err = "";
    await fdb.collection('ClassSummary').doc(body.name).set(data).catch((e: string) => err = e);

    if (err !== "") {
        console.log('An error occurred. Class data cannot add in database' + err);
        resp.status(500).send('Internal Server Error');
        return 0;
    } else {
        console.log(data);
        resp.status(200).send(JSON.stringify({'status': 'OK'}));
        return 0;
    }
});

app.get('/comment', async (req: functions.Request, resp: express.Response) => {
    console.log('subject_query= ' + req.query['class_name'] + ' uid=' + req.query['uid']);
    let err = "";
    const qss = await fdb.collection('ClassSummary')
        .doc(req.query['class_name'])
        .collection('comment')
        .doc(req.query['uid']).get().catch((e: string) => err = e);

    if (err !== "") {
        console.log('class not found probably wrong or empty query');
        resp.status(404).send('Not Found');
        return 0;
    } else if (!qss.data()) {
        console.log('No comment were found match with ' + req.query['class_name'] + ' and this uid');
        resp.status(404).send('Not Found');
        return 0;

    } else {
        resp.status(200).send(JSON.stringify(qss.data()));
        return 0;
    }
});

app.post('/comment', async (req: functions.Request, resp: express.Response) => {
    console.log('json received');
    const body = req.body;
    const doc = await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(body.made_by).get();
    const created_time = doc.data().created_at || moment().add(9, 'h').format();
    const data = {
        // nameは授業名です。titleはコメントのタイトル ex.　神授業です!!等
        'name': body.name,
        'title': body.title,
        'comment': body.comment,
        'created_at': created_time,
        'updated_at': moment().add(9, 'h').format(),
        'edited_by': body.edited_by,
        'image': body.image,
        'is_recommend': body.is_recommend
    };
    // IDでなくユーザのuidを用いてデータベースに格納する
    let err = "";
    await fdb.collection('ClassSummary')
        .doc(body.name).collection('comment')
        .doc(body.made_by).set(data).data().catch((e: string) => err = e);

    if (err !== "") {
        console.log('An error occurred. Comment cannot add in database');
        resp.status(500).send('Internal Server Error');

    } else {
        console.log(data);
        resp.status(200).send(JSON.stringify({'status': 'OK'}));
    }
});


app.delete('/comment', async (req: functions.Request, resp: express.Response) => {
    console.log(req.query['class_name'], '+', req.query['uid']);
    let err = "";
    await fdb.collection('ClassSummary')
        .doc(req.query['class_name'])
        .collection('comment')
        .doc(req.query['uid']).delete().catch((e: string) => err = e);

    if (err !== "") {
        console.log('An error occurred. Comment cannot delete from database');
        resp.status(500).send('Internal Server Error');
    } else {
        resp.status(200);
    }
});

exports.api = functions.https.onRequest(app);
