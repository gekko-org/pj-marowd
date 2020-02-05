// 参考: https://qiita.com/potato4d/items/cfddeb8732fec63cb29c#oauth-%E3%81%A8%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E6%B0%B8%E7%B6%9A%E5%8C%96
import firebase from './firebase';

// TODO: reject時の動作を書く
function auth(): Promise<firebase.User | boolean> {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      resolve(user || false);
    });
  });
}
export default auth;
