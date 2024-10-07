import { getFirestore, collection, getDocs, addDoc, query } from 'firebase/firestore/lite';
import { firebaseInitialize } from '../firebaseconfig';

const db = getFirestore(firebaseInitialize);

const transactionsCollection = collection(db, 'transactions');

export const fetchTransactions = async () => {
    try {
        // Create a query to order transactions by date (descending)
        const q = query(transactionsCollection);
        const querySnapshot = await getDocs(q);

        const fetchedTransactions = querySnapshot.docs.map(doc => ({
            id: doc.id, // Add ID for easier management
            ...doc.data(),
        }));

        return fetchedTransactions;

    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};