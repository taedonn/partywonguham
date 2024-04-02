import { db } from '../../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default defineEventHandler(async e => {
    try {
        const ref = db.collection("posts");
    } catch (err) {
        console.log(err);
    }
});