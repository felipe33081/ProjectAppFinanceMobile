import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { fetchTransactions } from './FetchTransactions';

import TransactionItem from './TransactionItem';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]); // State to store fetched transactions

  useEffect(() => {
    const fetchData = async () => {
      setTransactions(await fetchTransactions());
    };
    fetchData();
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
