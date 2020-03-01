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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

async function Verification(req: express.Request, resp: express.Response, next: () => void) {
    // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
    // @ts-ignore

    // AuthorizationヘッダーはBearer <id_token>の形式のため、id_tokenを取り出すために7文字目以降の文字列を切り出している
    const tokenstr = req.headers.authorization.toString().slice(7);

    try {
        const token = await admin.auth().verifyIdToken(tokenstr);
        // 送られてきたtokenを元にユーザを認証する。
        ref.child('users/' + token.uid).once("value", (snapshot: { exists: () => any; }) => {
            if (snapshot.exists()) {
                next();
            } else {
                console.log('Error: Id token does not match \'query uid\' ');
                resp.status(401).send('Unauthorized');
            }
        });
    } catch (exception) {
        console.log('Error: Firebase ID token has kid claim which does not correspond to a known public key. so get a fresh token from your client app and try again');
        console.log(exception);
        resp.status(401).send('Unauthorized');
    }
}

app.use(Verification);

export const RegisterLog = functions.auth.user().onCreate((user) => {
    console.log(`Hello ${user.displayName}  logged in`);

    // データベースに書き込む。一意に定まるユーザのuidを主キーとして設定し、メアドと名前を格納する。
    ref.child('users/' + user.uid).set({
        mail: user.email,
        name: user.displayName
    });
    return;
});

export const UnRegisterLog = functions.auth.user().onDelete((user) => {
    console.log(`Hello ${user.displayName}  account deleted`);
    ref.child('users/' + user.uid).remove();
    return;
});


app.get('/class_data', async (req: functions.Request, resp: express.Response) => {
    console.log(`subject_query= ${req.query['class_name']} `);
    try {
        // queryでクラス名が指定されなかった場合は全ての授業データを取得する
        if (!req.query['class_name']) {
            const querySnapshot = await fdb.collection('ClassSummary').get();
            const records = querySnapshot.docs.map((elem: { data: () => any; }) => elem.data());
            console.log(records);
            resp.send(JSON.stringify(records));
            return;

        } else {
            const documentSnapshot = await fdb.collection('ClassSummary').doc(req.query['class_name']).get();
            const record = documentSnapshot.data();
            resp.send(JSON.stringify(record));
            return;
        }
    } catch (exception) {
        console.log('class not found probably wrong or empty query');
        console.log(exception);
        resp.status(404).send('Not Found');
        return
    }
});

app.post('/class_data', async (req: functions.Request, resp: express.Response) => {
    resp.setHeader('Content-Type', 'text/plain');
    console.log('json received');
    // req.setEncoding('utf8');
    console.log(req.body['name']);
    const body = req.body;
    console.log(body);

    // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
    // @ts-ignore
    const tokenstr = req.headers.authorization.toString().slice(7);
    const token = await admin.auth().verifyIdToken(tokenstr);

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
        'edited_by': token.uid,
        'created_at': moment().add(9, 'h').format(),
        'updated_at': moment().add(9, 'h').format(),
    };
    console.log(data);
    try {
        await fdb.collection('ClassSummary').doc(body.name).set(data);
        console.log(data);
        resp.status(200).send(JSON.stringify({'status': 'OK'}));
        return;
    } catch (exception) {
        console.log('An error occurred. Class data cannot add in database');
        console.log(exception);
        resp.status(500).send('Internal Server Error');
        return;
    }
});

app.get('/comment', async (req: functions.Request, resp: express.Response) => {
    console.log(`subject_query= ${req.query['class_name']}`);
    try {
        if (req.query['comment_id']) {
            // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
            // @ts-ignore
            const tokenstr = req.headers.authorization.toString().slice(7);
            const token = await admin.auth().verifyIdToken(tokenstr);

            const qss = await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').doc(token.uid).get();
            if (!qss.data()) {
                console.log(`No comment were found match with ${req.query['class_name']}`);
                resp.status(404).send('Not Found');
                return;
            }
            resp.status(200).send(JSON.stringify(qss.data()));
            return;

        } else {

            const querySnapshot = await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').get();
            const records = querySnapshot.docs.map((elem: { data: () => any; }) => elem.data());
            console.log(records);
            resp.send(JSON.stringify(records));
            return;
        }
    } catch (exception) {
        console.log('class not found probably wrong or empty query');
        console.log(exception);
        resp.status(404).send('Not Found');
        return;
    }
});

app.post('/comment', async (req: functions.Request, resp: express.Response) => {
    console.log('json received');
    const body = req.body;

    // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
    // @ts-ignore
    const tokenstr = req.headers.authorization.toString().slice(7);
    const token = await admin.auth().verifyIdToken(tokenstr);
    const data = {
        // nameは授業名です。titleはコメントのタイトル ex.　神授業です!!等
        'name': body.name,
        'title': body.title,
        'comment': body.comment,
        'created_at': moment().add(9, 'h').format(),
        'updated_at': moment().add(9, 'h').format(),
        'edited_by': token.uid,
        'image': body.image,
        'is_recommend': body.is_recommend
    };
    // IDでなくユーザのuidを用いてデータベースに格納する
    try {
        await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(token.uid).set(data);
        console.log(data);
        resp.status(200).send(JSON.stringify({'status': 'OK'}));
        return;
    } catch (exception) {
        console.log('An error occurred. Comment cannot add in database');
        console.log(exception);
        resp.status(500).send('Internal Server Error');
        return;
    }
});


app.delete('/comment', async (req: functions.Request, resp: express.Response) => {
    console.log(req.query['class_name']);
    // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
    // @ts-ignore
    const tokenstr = req.headers.authorization.toString().slice(7);
    const token = await admin.auth().verifyIdToken(tokenstr);
    try {
        await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').doc(token.uid).delete();
        resp.status(204).send({'status': 'OK'});
        return;
    } catch (exception) {
        console.log('An error occurred. Comment cannot delete from database');
        console.log(exception);
        resp.status(500).send('Internal Server Error');
        return;
    }
});

exports.api = functions.https.onRequest(app);
