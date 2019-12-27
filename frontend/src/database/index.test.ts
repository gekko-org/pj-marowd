import { getComment, getComments } from '@/src/database/index';

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


describe('その授業名の全てのコメントを取ってくる関数。getComments', () => {
  test('12/27 最適化数学のmockdataと一致すること。', async () => {
    const r = await getComments('dummy class');
    expect(r).toStrictEqual([dummyComment]);
  });
});

describe('授業名とuidからコメントを取ってくる関数。getComments', () => {
  test('12/27 (未実施)dummy classのmade byのuidと一致すること。', async () => {
    const r = await getComment('dummy class', dummyComment.made_by);
    expect(r).toStrictEqual(dummyComment);
  });
});
