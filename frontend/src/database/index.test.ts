import { getComment, getComments } from '@/src/database/index';

describe('全てのコメントを取ってくる関数。getComments', () => {
  test('12/18 最適化数学のmockdataと一致すること。', async () => {
    const r = await getComments('最適化数学');
    expect(r).toStrictEqual([
      {
        title: '取るべき！',
        created_at: { _seconds: 1566531023, _nanoseconds: 0 },
        made_by: 'zs6UiuI9GGNwafqbPwqBWjyI5dety1',
        updated_at: { _seconds: 1566725402, _nanoseconds: 0 },
        comment: 'この授業は取るべきです。A+狙えます。'
      }
    ]);
  });
});

describe('コメントidからコメントを取ってくる関数。getComments', () => {
  test('12/18 最適化数学のmockdataのcomment_id=1と一致すること。', async () => {
    const r = await getComment('最適化数学', 1);
    expect(r).toStrictEqual({
      title: '取るべき！',
      created_at: { _seconds: 1566531023, _nanoseconds: 0 },
      made_by: 'zs6UiuI9GGNwafqbPwqBWjyI5dety1',
      updated_at: { _seconds: 1566725402, _nanoseconds: 0 },
      comment: 'この授業は取るべきです。A+狙えます。'
    });
  });
});
