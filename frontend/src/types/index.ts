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
}

export interface GetClassDataModel {
  created_at: Date;
  updated_at: Date;
  fav_amount: number;
  rating: number;
  grade: number;
  department: string;
  made_by: string;
  faculty: string;
  professor: string;
  term: string;
  is_random: boolean;
  name: string;
  update_by: string;
}

export interface GetExistClassModel {
  status: string;
}

export interface GetCommentsResult {
  title: string;
  created_at: AtedAt;
  made_by: string;
  updated_at: AtedAt;
  comment: string;
}

export interface AtedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface PostCommentModel {
  name: string;
  title: string;
  comment: string;
  made_by: string;
  image: string;
  is_recommend: boolean;
}

export interface PostCommentResultModel {
  status: string;
}

export interface PostClassDataModel {
  name: string;
  faculty: string;
  department: string;
  fav_amount: number;
  grade: string;
  professor: string;
  is_random: boolean;
  rating: string;
  term: string;
  update_by: string;
  made_by: string;
}

export interface PostClassDataResultModel {
  status: string;
}
