import { db } from '../../utils/firebase';

export default defineEventHandler(async e => {
    try {
        const id = getRouterParam(e, 'id');
        const ref = db.doc(`posts/${id}`);
        const snapshot = await ref.get();
        const data = snapshot.data();
        return data;
    } catch (err) {
        console.log(err);
    }
});