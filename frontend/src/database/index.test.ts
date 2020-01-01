import { getClassData, getComment, getComments, getExistClass, postComment } from '@/src/database/index';
import { AtedAt } from '@/src/types';

const dummyExistData = {
  status: 'OK'
};

// dummy class data(本運用時には削除)
const dummyClassData = {
  created_at: '2000-01-01 00:00:00',
  department: 'dummy department',
  faculty: 'dummy faculty',
  fav_amount: 0,
  grade: 0,
  is_random: false,
  made_by: 'dummy uid',
  name: 'dummy class',
  professor: 'dummy professor',
  rating: 0,
  term: 'dummy term',
  update_by: 'dummy uid',
  updated_at: '2000-01-01 00:00:00'
};

const dummyComment = {
  comment: 'dummy comment',
  created_at: '2000-01-01 00:00:00',
  image: 'http://example.com//dummy.png',
  is_recommend: false,
  made_by: 'dummy uid',
  name: 'dummy class',
  title: 'dummy title',
  updated_at: '2000-01-01 00:00:00'
};

const dummyCommentModel = {
  name: 'dummy name for ut',
  title: 'dummy title for ut',
  comment: 'dummy comment for ut',
  made_by: 'dummy uid',
  image: 'dummy image',
  is_recommend: true
};

const dummyStatusOK = {
  status: 'OK'
};

describe('その授業名の全てのコメントを取ってくる関数。getComments', () => {
  test('12/27 最適化数学のmockdataと一致すること。', async () => {
    const r = await getComments('dummy class');
    expect(r).toStrictEqual([dummyComment]);
  });
});

describe('授業名とuidからコメントを取ってくる関数。getComment', () => {
  test('12/31 dummy classのmade byのuidと一致すること。', async () => {
    const r = await getComment('dummy class', dummyComment.made_by);
    expect(r).toStrictEqual(dummyComment);
  });
});

describe('授業名からその授業の情報を取得する関数 getClassData', () => {
  test('12/31 dummy classの情報と一致すること。', async () => {
    const r = await getClassData(dummyClassData.name);
    expect(r).toStrictEqual(dummyClassData);
  });
});

describe('授業名からその授業が既に存在しているかを確認する関数 getExistClass', () => {
  test('12/31 ダミーの情報入力時にOKが帰ってくること ', async () => {
    const r = await getExistClass(dummyClassData.name);
    expect(r).toStrictEqual(dummyExistData);
  });
});

describe('コメントの投稿を行う関数 postComment', () => {
  test('1/1 ダミーの情報送信時にOKが帰ってくること ', async () => {
    const r = await postComment(dummyCommentModel);
    expect(r).toStrictEqual(dummyStatusOK);
  });
});


