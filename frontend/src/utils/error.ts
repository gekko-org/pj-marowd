// TODO:(@reud) エラーページへの遷移, Backend側にエラーの通知。
export const errorHandler = (e: Error) => {
  console.log(e.message);
};
