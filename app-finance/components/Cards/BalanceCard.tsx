import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, StatusBar } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, query } from 'firebase/firestore/lite';
import { firebaseInitialize } from '../../firebaseconfig';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const db = getFirestore(firebaseInitialize);

const transactionsCollection = collection(db, 'transactions');

interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const BalanceCard: React.FC<CardProps> = ({ title, subtitle, children, style }) => {
  const [transactions, setTransactions] = useState<any[]>([]); // Estado para armazenar as transações
  const { backgroundCardsColor, textsColor, barNotificationColor } = useDynamicColors();
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  useFonts({
    Kanit: require('../../assets/fonts/Kanit-Light.ttf'),
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
      <StatusBar
        animated={true}
        backgroundColor={barNotificationColor}
        hidden={false}
      />
      <Text style={[styles.title, { color: textsColor }]}>Outubro</Text>
      <Text style={[styles.subtitle, { color: '#8f8d98' }]}>Saldo em Conta</Text>
      <View style={styles.content}>{children}</View>

      <Text style={[styles.balanceText, { color: textsColor }]}>R$370,00</Text>

      <View >
        <Pressable style={[styles.button]} onPress={onPress}>
          <MaterialCommunityIcons name="eye-outline" size={22} color="#8f8d98" />
        </Pressable>
      </View>

      {/* View  */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
        {/* Seção de Receitas */}
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          <AntDesign name="upcircle" size={38} color="#4eb251" />
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.kanitMedium, { color: '#8f8d98' }]}>Receitas</Text>
            <Text style={{ color: '#4eb251', fontSize: 18, fontFamily: 'Kanit' }}>R$ 1.000,00</Text>
          </View>
        </View>

        {/* Seção de Despesas */}
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: 220 }}>
          <AntDesign name="downcircle" size={38} color="#f74236" />
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.kanitMedium, { color: '#8f8d98' }]}>Despesas</Text>
            <Text style={{ color: '#f74236', fontSize: 18, fontFamily: 'Kanit' }}>R$ 7.500,00</Text>
          </View>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    //backgroundColor: backgroundCardsColor, // Lighter background color
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 60,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  kanitMedium: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18
  },
  balanceText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18,
    paddingBottom: 0,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    padding: 10,
  }
});

export default BalanceCard;