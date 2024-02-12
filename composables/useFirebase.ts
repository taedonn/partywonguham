import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const useFirebase = () => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: config.firebaseApiKey + "",
        authDomain: config.firebaseAuthDomain + "",
        databaseURL: config.firebaseDatabaseUrl + "",
        projectId: config.firebaseId + "",
        storageBucket: config.firebaseStorageBucket + "",
        messagingSenderId: config.firebaseMessagingSenderId + "",
        appId: config.firebaseAppId + "",
        measurementId: config.firebaseMeasurementId + "",
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const firestore = getFirestore(firebaseApp);

    return {
        firebaseApp,
        firestore,
    }
}