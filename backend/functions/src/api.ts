/* eslint-disable camelcase */
import * as functions from "firebase-functions";
import * as express from "express";
// for @kanade9 こうすればrequireなしでかけるはず
import * as admin from "firebase-admin";
// import前にInitializeする必要がある https://qiita.com/nerikosans/items/2960ff3b073919f5e64c
admin.initializeApp(functions.config().firebase);
import * as bodyParser from "body-parser";
import { CorsResolveMiddleWare, OptionHandler } from "./cors";
import { Verification } from "./auth";
import { LoginLogger, LogoutLogger } from "./logger";
import {
  GetClassDataHandler,
  PostClassDataHandler
} from "./handler/api/classData";
import { DeleteComment, GetComment, PostComment } from "./handler/api/comment";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to resolve cors
app.use(CorsResolveMiddleWare);
app.options("*", OptionHandler);

// for authentication
app.use(Verification);

app.get("/class_data", GetClassDataHandler);
app.post("/class_data", PostClassDataHandler);

app.get("/comment", GetComment);
app.post("/comment", PostComment);
app.delete("/comment", DeleteComment);

exports.api = functions.https.onRequest(app);

// for logging
export const RegisterLog = functions.auth.user().onCreate(LoginLogger);
export const UnRegisterLog = functions.auth.user().onDelete(LogoutLogger);
