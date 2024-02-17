import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
    credential: cert('./service-account.json')
});

export const db = getFirestore(app);