import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, query } from 'firebase/firestore/lite';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { firebaseInitialize } from '../firebaseconfig';

import TransactionItem from './TransactionItem';

const db = getFirestore(firebaseInitialize);

const transactionsCollection = collection(db, 'transactions');

export default function Transactions() {
  const [transactions, setTransactions] = useState([]); // State to store fetched transactions

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Create a query to order transactions by date (descending)
        const q = query(transactionsCollection);
        const querySnapshot = await getDocs(q);

        const fetchedTransactions = querySnapshot.docs.map(doc => ({
          id: doc.id, // Add ID for easier management
          ...doc.data(),
        }));

        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions(); // Call the function on component mount
  }, []);

  return (
    <FlatList
      data={transactions}
      style={{ flex: 1 }}
      renderItem={({ item }) => <TransactionItem data={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Últimas transações</Text>
        </View>
      )}
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ecf0f1',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#666',
  },
});
