/* eslint-disable */
import * as admin from 'firebase-admin';
import * as faker from 'faker';

const Firestore = admin.firestore();

let commentNum=100;
export const makeMock = async (batchSize: number) => {
    const usersRef = await Firestore.collection("ClassSummary");

    const batch = Firestore.batch();
    for (let i = 0; i < batchSize; i++) {

        const classData = {
            created_at: faker.date.future(),
            department: faker.commerce.department(),
            faculty: faker.commerce.productMaterial(),
            favamount: faker.random.number(),
            grade: faker.random.number() % 5,
            is_random: Boolean(faker.random.number() % 2),
            made_by: faker.random.uuid(),
            name: faker.commerce.productName(),
            professor: faker.name.lastName(),
            rating: (faker.random.number() % 5) * 1.27,
            term: faker.random.number() % 3,
            update_by: faker.random.uuid(),
            update_at: faker.date.past()
        };
        let className = faker.commerce.product();
        batch.create(usersRef.doc(className), classData);

      const commentRef = await Firestore.collection("ClassSummary").doc(className).collection('comment');
        for(let j=0;j<commentNum;j++){
          let uid = faker.random.uuid();
          const commentData ={
            comment: faker.lorem.sentences(),
            created_at:faker.date.future(),
            image:faker.image.animals(),
            is_recommend: Boolean(faker.random.number() % 2),
            made_by: uid,
            name: className,
            title: faker.lorem.words(),
            updated_at: faker.date.past()
          };
          batch.create(commentRef.doc(uid), commentData);
        }
    }
    await batch.commit();
    return;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
makeMock(1).then(r => console.log("done"));
