import * as firebase from 'firebase/app';
import { ClassSummary } from '@/src/types';

export async function GetClassSummaries(): Promise<ClassSummary[]> {
  const db = firebase.firestore();
  const cn = db.collection('ClassSummary');
  const classSummaries:ClassSummary[] = [];
  await cn.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      classSummaries.push({
        title: doc.id,
        faculty: doc.data().faculty,
        grade: doc.data().grade,
        professor: doc.data().professor,
        isRandom: doc.data().isRandom,
        department: doc.data().depaertment,
        rating: doc.data().rating,
        lastUpdatedBy: doc.data().lastUpdatedBy,
        term: doc.data().term,
        favAmount: doc.data().favAmount
      })
    })
  }).catch((err) => alert(err));
  return new Promise<ClassSummary[]>(resolve => resolve(classSummaries))
}
