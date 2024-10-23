import getAuth from '@react-native-firebase/auth';
import { initializeApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA1Wcrp1gr52evIwpdbdtoBO5p1zWm4vr4",
    authDomain: "finance-control-app-2b85a.firebaseapp.com",
    projectId: "finance-control-app-2b85a",
    storageBucket: "finance-control-app-2b85a.appspot.com",
    messagingSenderId: "446259213089",
    appId: "1:446259213089:android:906fdb4d7966891a244460"
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);