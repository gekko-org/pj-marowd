import { Ref } from "./common";

// TODO:ここの型パッと思いつかなかったのでいったんany,後で変更予定
export const LoginLogger = async (user: any): Promise<void> => {
  console.log(`Hello ${user.displayName}  logged in`);

  // データベースに書き込む。一意に定まるユーザのuidを主キーとして設定し、メアドと名前を格納する。
  // for @kanade9 Promise<Void>が返ってくるっぽいのでasync/await使ったほうがいいと思う
  await Ref.child("users/" + user.uid).set({
    mail: user.email,
    name: user.displayName
  });
  return;
};

// TODO:ここの型パッと思いつかなかったのでいったんany,後で変更予定
export const LogoutLogger = async (user: any): Promise<void> => {
  console.log(`Hello ${user.displayName}  account deleted`);
  Ref.child("users/" + user.uid).remove();
  return;
};
