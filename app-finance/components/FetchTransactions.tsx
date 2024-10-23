import { getFirestore, collection, getDocs, addDoc, query } from '@react-native-firebase/firestore';
import { FIREBASE_APP } from '@/firebaseconfig';

const db = getFirestore(FIREBASE_APP);

const transactionsCollection = collection(db, 'transactions');

async function FetchTransactions() {
    try {
        // Cria uma consulta para ordenar as transações por data (decrescente)
        const q = query(transactionsCollection);
        const querySnapshot = await getDocs(q);

        const fetchedTransactions = querySnapshot.docs.map(doc => ({
            id: doc.id, // Adiciona ID para gerenciamento mais fácil
            ...doc.data(),
        }));

        return fetchedTransactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return []; // Retorna uma lista vazia em caso de erro
    }
};

export default FetchTransactions();