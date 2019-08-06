import * as functions from 'firebase-functions';

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const db = admin.database();
const ref = db.ref("server/account-data/");


export const WelcomeLog = functions.auth.user().onCreate((user) => {
    console.log('Hello ' + user.displayName + ' logged in' + 'called by TS');

    // データベースに書き込む。一意に定まるユーザのuidを主キーとして設定し、メアドと名前を格納する
    ref.child('users/' + user.uid).set({
        mail: user.email,
        name: user.displayName,
    });
});



