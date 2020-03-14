import * as admin from "firebase-admin";

export const Database = admin.database();
export const Firestore = admin.firestore();
export const Ref = Database.ref("server/account-data/");
