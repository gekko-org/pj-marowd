import { DefaultApi } from '@/gen';
import firebase from 'firebase';

export const Api = async (user: firebase.User) => {
  return new DefaultApi({
    apiKey: `Bearer ${await user.getIdToken()}`
  });
};
