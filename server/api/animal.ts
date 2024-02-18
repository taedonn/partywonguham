import { db } from '../utils/firebase';

export default defineEventHandler(async e => { 
    const ref = db.doc(`animals/dogs`);
    const snapshot = await ref.get();
    const data = snapshot.data();
    return data;
})