import * as firebase from '@/node_modules/firebase';

export interface ClassSummary {
  title: string;
  faculty: string;
  grade: string;
  professor: string;
  isRandom: boolean;
  department: string;
  rating: number;
  lastUpdatedBy: string;
  term: string;
}

export interface UserState {
  token: string;
  user: firebase.User | null;
}

export interface UserStateHandler {
  userState: UserState;
}
