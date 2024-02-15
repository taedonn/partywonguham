import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const useFirebase = () => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: config.public.firebaseApiKey + '',
        authDomain: config.public.firebaseAuthDomain + '',
        databaseURL: config.public.firebaseDatabaseUrl + '',
        projectId: config.public.firebaseId + '',
        storageBucket: config.public.firebaseStorageBucket + '',
        messagingSenderId: config.public.firebaseMessagingSenderId + '',
        appId: config.public.firebaseAppId + '',
        measurementId: config.public.firebaseMeasurementId + '',
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const firestore = getFirestore(firebaseApp);

    return {
        firebaseApp,
        firestore,
    }
}