import axios from 'axios';
import {
  GetClassDataModel,
  GetExistClassModel,
  GetCommentsResult,
  PostCommentModel,
  PostCommentResultModel, PostClassDataModel
} from '@/src/types';

const BASE_URL = 'https://us-central1-pj-marowd.cloudfunctions.net/';

// GET /comments?className=<className>
export async function getComments(className: string) {
  const res = await axios.get<GetCommentsResult[]>(BASE_URL + 'comments/', {
    params: {
      class_name: className
    }
  });
  console.log(res.data);
  return res.data;
}

// GET /comments?className=<className>&comment_id=<commentId>
export async function getComment(className: string, uid: string) {
  const res = await axios.get<GetCommentsResult>(BASE_URL + 'comment/', {
    params: {
      class_name: className,
      uid: uid
    }
  });
  console.log(res.data);
  return res.data;
}

// GET /class_data?className=<className>
export async function getClassData(className: string) {
  const res = await axios.get<GetClassDataModel>(BASE_URL + 'class_data/', {
    params: {
      class_name: className
    }
  });
  console.log(res.data);
  return res.data;
}

export async function getExistClass(className: string) {
  const res = await axios.get<GetExistClassModel>(BASE_URL + 'exist_data/', {
    params: {
      class_name: className
    }
  });
  console.log(res.data);
  return res.data;
}

export async function postComment(postCommentModel: PostCommentModel) {
  const res = await axios.post<PostCommentResultModel>(
    BASE_URL + 'comment/',
    postCommentModel
  );
  console.log(res.data);
  return res.data;
}

export async function postClassData(postClassDataModel: PostClassDataModel) {
  const res = await axios.post<PostCommentResultModel>(
    BASE_URL + 'class_data/',
    postClassDataModel
  );
  console.log(res.data);
  return res.data;
}
