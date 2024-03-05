import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const config = useRuntimeConfig();

const app = initializeApp({
    credential: cert(config.public.firebaseServiceAccountKey)
});

export const db = getFirestore(app);