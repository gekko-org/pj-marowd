import * as admin from "firebase-admin";
// @ts-ignore
import * as faker from "faker";

admin.initializeApp();
const Firestore = admin.firestore();
// const db = admin.firestore();

const makeMock = async (batchSize: number) => {
    console.log(1);
    const usersRef = await Firestore.collection("ClassSummary");

    const batch = Firestore.batch();
    for (let i = 0; i < batchSize; i++) {
        const classData = {
            created_at: faker.date.future(),
            department: faker.commerce.department(),
            faculty: faker.commerce.product(),
            favamount: faker.random.number(),
            grade: faker.random.number % 5,
            is_random: 'false',
            made_by: faker.random.uuid(),
            name: faker.commerce.productName(),
            professor: faker.name.lastName(),
            rating: faker.random.number() % 5 * 1.27,
            term: faker.random.number() % 3,
            update_by: faker.name.lastName(),
            update_at: faker.date.past()
        };
        batch.create(usersRef.doc(), classData);
    }
    await batch.commit();
    return;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
makeMock(5).then(r => console.log("done"));
