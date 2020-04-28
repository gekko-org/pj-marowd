// 評価平均をパーセントで返す。
import { ModelClass } from '@/gen';
import { Term } from '@/common';

export const getRate = (m: ModelClass): number => {
  return m.rating / 5;
};

export const getTermStr = (m: ModelClass): string => {
  if (m.term === Term.Spring) {
    return '春学期';
  }
  if (m.term === Term.Autumn) {
    return '秋学期';
  }
  return 'その他';
};

export const getColor = (m: ModelClass): string => {
  if (m.term === Term.Spring) {
    return '#fce4ec';
  }
  if (m.term === Term.Autumn) {
    return '#fff3e0';
  }
  return '#fafafa';
};

// 名前が長すぎる(8文字より多い)場合 ... に変換する関数。
export const longNameFixer = (s: string): string => {
  if (s.length <= 8) {
    return s;
  }
  return s.substr(0,8) + '...';
}