import * as express from "express";
import { GetToken } from "./utils";
import * as admin from "firebase-admin";
import { Ref } from "./common";

export const Verification = async (
  req: express.Request,
  resp: express.Response,
  next: () => void
): Promise<void> => {
  // for @kanade9 これでreq.headers.authorizationに値が入っているかどうか見てからtokenStrに値を設定出来る
  const tokenStr = GetToken(req);
  console.log(`token: ${tokenStr}`);
  try {
    const token = await admin.auth().verifyIdToken(tokenStr);
    // 送られてきたtokenを元にユーザを認証する。
    Ref.child("users/" + token.uid).once(
      "value",
      (snapshot: { exists: () => boolean }) => {
        // for @kanade9 多分booleanが返る https://stackoverflow.com/questions/42892486/what-to-do-when-snapshot-exists-returns-false
        if (snapshot.exists()) {
          next();
        } else {
          console.log("Error: Id token does not match 'query uid' ");
          // for @kanade9 sendは不要のはず・・・
          resp.sendStatus(401);
        }
      }
    );
  } catch (exception) {
    console.log(
      "Error: Firebase ID token has kid claim which does not correspond to a known public key. so get a fresh token from your client app and try again"
    );
    console.log(exception);
    resp.sendStatus(401);
  }
};
