import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TransactionProps {
  id: number;
  date: string;
  description: string;
  value: number;
  category: string;
}

const TransactionCard: React.FC<TransactionProps> = ({
  id,
  date,
  description,
  value,
  category,
}) => {
  return (
    <View style={styles.card}>
      <Text>Data: {date}</Text>
      <Text>Descrição: {description}</Text>
      <Text>Valor: R$ {value.toFixed(2)}</Text>
      <Text>Categoria: {category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default TransactionCard;