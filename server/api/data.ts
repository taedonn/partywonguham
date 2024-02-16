import { firestore } from '../utils/firebase';

export default defineEventHandler(async e => { 
    const ref = firestore.doc(`animals/dogs`);
    const snapshot = await ref.get();
    const data = snapshot.data();
    return data;
})