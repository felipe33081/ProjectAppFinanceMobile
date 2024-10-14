import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ViewStyle } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, query } from 'firebase/firestore/lite';
import { firebaseInitialize } from '../firebaseconfig';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';

const db = getFirestore(firebaseInitialize);

const transactionsCollection = collection(db, 'transactions');

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const BalanceCard: React.FC<CardProps> = ({ title, subtitle, children, style }) => {
  const [transactions, setTransactions] = useState<any[]>([]); // Estado para armazenar as transações
  const { backgroundCardsColor, textsColor, generalBackgroundColor } = useDynamicColors();

  useFonts({
    Kanit: require('../assets/fonts/Kanit-Light.ttf'),
  });

  useEffect(() => {
    async function FetchTransactions() {
      try {
        // Cria uma consulta para ordenar as transações por data (decrescente)
        const q = query(transactionsCollection);
        const querySnapshot = await getDocs(q);

        const fetchedTransactions = querySnapshot.docs.map(doc => ({
          id: doc.id, // Adiciona ID para gerenciamento mais fácil
          ...doc.data(),
        }));

        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        return []; // Retorna uma lista vazia em caso de erro
      }
    };

    FetchTransactions();
  }, []);

  console.log(transactions);

  return (
    <View style={[styles.card, style, { backgroundColor: backgroundCardsColor }]}>
      {title && <Text style={[styles.title, { color: textsColor }]}>{title}</Text>}
      {subtitle && <Text style={[styles.subtitle, { color: textsColor }]}>{subtitle}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    //backgroundColor: backgroundCardsColor, // Lighter background color
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 18,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5
  },
  title: {
    fontSize: 20,
    fontFamily: 'Kanit',
    fontWeight: 'bold', // Uncomment if you want bold font
    marginBottom: 10,
    textAlign: 'center',
    color: '#e4e5e8'
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Kanit',
    color: '#2b2a2a',
    marginBottom: 0,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
  }
});

export default BalanceCard;