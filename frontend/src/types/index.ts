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
  favAmount: number;
}

export interface Comment {
  name: string;
  image: string;
  date: string;
  subject: string;
  text: string;
  isRecommend: boolean;
}

export interface UserState {
  token: string | null;
  user: firebase.User | null;
}

export interface ClassData {
  classSummary: ClassSummary;
  comments: Comment[];
  link: string;
}
