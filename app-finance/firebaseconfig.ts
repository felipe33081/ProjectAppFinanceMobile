import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyA1Wcrp1gr52evIwpdbdtoBO5p1zWm4vr4",
    authDomain: "finance-control-app-2b85a.firebaseapp.com",
    //databaseURL: "https://nam5.firebaseio.com",
    projectId: "finance-control-app-2b85a",
    storageBucket: "finance-control-app-2b85a.appspot.com",
    messagingSenderId: "446259213089",
    appId: "1:446259213089:android:906fdb4d7966891a244460"
};
export const firebaseInitialize = initializeApp(firebaseConfig);