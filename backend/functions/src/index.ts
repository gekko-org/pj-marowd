import * as functions from 'firebase-functions';
import * as express from 'express';

const bodyParser = require('body-parser');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const fdb = admin.firestore();

const ref = db.ref('server/account-data/');

const app = express();
// const commentData = express();
const moment = require('moment');

app.use(bodyParser.json());

async function Verification(req: express.Request, resp: express.Response, next: () => void) {
    // req.headers.authorization のオブジェクトが未定義となるためにts-ignore
    // @ts-ignore

    // AuthorizationヘッダーはBearer <id_token>の形式のため、id_tokenを取り出すために7文字目以降の文字列を切り出している
    const tokenstr = req.headers.authorization.toString().slice(7);

    try {
        const token = await admin.auth().verifyIdToken(tokenstr);

        if (token.uid == req.query['uid']) {
            next();
        } else {
            console.log('Error: Id token does not match \'query uid\' ');
            resp.status(401).send('Unauthorized');
        }
    } catch (exception) {
        console.log('Error: Firebase ID token has kid claim which does not correspond to a known public key. so get a fresh token from your client app and try again');
        resp.status(401).send('Unauthorized');
    }
}

app.use(Verification);

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

// build multiple CRUD interfaces:
app.get('/classData', async (req: functions.Request, resp: express.Response) => {
    console.log('subject_query= ' + req.query['class_name']);
    try {
        const documentSnapshot = await fdb.collection('ClassSummary').doc(req.query['class_name']).get();
        const record = documentSnapshot.data();
        if (!record) {
            console.log('class not found probably wrong or empty query');
            resp.status(404).send('Not Found');
        }
        resp.send(JSON.stringify(record));
    } catch (exception) {
        console.log('class not found probably wrong or empty query');
        resp.status(404).send('Not Found');
    }
});

app.post('/classData', async (req: functions.Request, resp: express.Response) => {
    console.log('json received');
    const body = req.body;

    // Check the validity of the token
    const uid = admin.auth.decodedToken(body.token).uid;
    if (!uid) {
        resp.status(401).send('Unauthorized');
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
        'edited_by': body.edited_by,
        'created_at': class_created_time,
        'updated_at': moment().add(9, 'h').format(),
    };
    try {
        await fdb.collection('ClassSummary').doc(body.name).set(data);
        console.log(data);
        resp.status(200).send(JSON.stringify({'status': 'OK'}));
    } catch (exception) {
        console.log('An error occurred. Class data cannot add in database');
        resp.status(500).send('Internal Server Error');
    }
});

app.get('/commentData', async (req: functions.Request, resp: express.Response) => {
    console.log('subject_query= ' + req.query['class_name'] + ' uid=' + req.query['uid']);
    try {
        const qss = await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').doc(req.query['uid']).get();
        if (!qss.data()) {
            console.log('No comment were found match with ' + req.query['class_name'] + ' and this uid');
            resp.status(404).send('Not Found');
        }
        resp.status(200).send(JSON.stringify(qss.data()));
    } catch (exception) {
        console.log('class not found probably wrong or empty query');
        resp.status(404).send('Not Found');
    }
});

app.post('/commentData', async (req: functions.Request, resp: express.Response) => {
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
        'edited_by': body.edited_by,
        'image': body.image,
        'is_recommend': body.is_recommend
    };
    // IDでなくユーザのuidを用いてデータベースに格納する
    try {
        await fdb.collection('ClassSummary').doc(body.name).collection('comment').doc(body.made_by).set(data);
        console.log(data);
        resp.status(200).send(JSON.stringify({'status': 'OK'}));
    } catch (exception) {
        console.log('An error occurred. Comment cannot add in database');
        resp.status(500).send('Internal Server Error');
    }
});


app.delete('/commentData', async (req: functions.Request, resp: express.Response) => {
    console.log(req.query['class_name'], '+', req.query['uid']);
    try {
        await fdb.collection('ClassSummary').doc(req.query['class_name']).collection('comment').doc(req.query['uid']).delete();
        resp.status(200);
    } catch (exception) {
        console.log('An error occurred. Comment cannot delete from database');
        resp.status(500).send('Internal Server Error');
    }
});

// Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app);
