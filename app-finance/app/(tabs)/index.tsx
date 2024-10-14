import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import AddCardButton from '@/components/AddCardButton';
import BalanceCard from '@/components/BalanceCard';
import DetailsCard from '@/components/DetailsCard';
import DespesasCard from '@/components/DespesasCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function HomeScreen() {
  const { textsColor, barNotificationColor } = useDynamicColors();
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  useFonts({
    Kanit: require('../../assets/fonts/Kanit-Light.ttf'),
  });

  return (
    <View>
      <View>
        <StatusBar
          animated={true}
          backgroundColor={barNotificationColor}
          hidden={false}
        />
        <BalanceCard title="Outubro" subtitle="Saldo em Conta">
          <Text style={styles.balanceText}>R$370,00</Text>

          <View >
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <MaterialCommunityIcons name="eye-outline" size={22} color="#495057" />
            </TouchableOpacity>
          </View>

          {/* View  */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            {/* Seção de Receitas */}
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
              <AntDesign name="upcircle" size={38} color="#4eb251" />
              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.kanitMedium, { color: textsColor }]}>Receitas</Text>
                <Text style={{ color: '#4eb251', fontSize: 18, fontFamily: 'Kanit' }}>R$ 1.000,00</Text>
              </View>
            </View>

            {/* Seção de Despesas */}
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: 220 }}>
              <AntDesign name="downcircle" size={38} color="#f74236" />
              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.kanitMedium, { color: textsColor }]} selectionColor={textsColor}>Despesas</Text>
                <Text style={{ color: '#f74236', fontSize: 18, fontFamily: 'Kanit' }}>R$ 750,00</Text>
              </View>
            </View>
          </View>

        </BalanceCard>
      </View>

      <View>
        <Text style={[styles.titleCardText, { color: textsColor }]}>Detalhamento</Text>
        <DetailsCard title='Maior valor de receita do mês' subtitle='Maior valor de despesa do mês'>
          {/* <MaterialCommunityIcons name="credit-card-plus-outline" size={38} color="#495057" style={{ paddingVertical: 10 }} /> */}
          <AddCardButton title="Adicionar nova conta"  />
        </DetailsCard>
      </View>

      <View>
        <Text style={[styles.titleCardText, { color: textsColor }]}>Depesas por categoria</Text>
        <DespesasCard>
          <Text style={[styles.depesasCardText, { color: textsColor }]}>Graficos</Text>
          {/* <AddCardButton title="Adicionar Novo Cartão" onPress={() => { }} /> */}
        </DespesasCard>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  kanitMedium: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18
  },
  balanceText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18,
    paddingBottom: 0
  },
  titleCardText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18,
    marginTop: 25,
    paddingLeft: 18
  },
  depesasCardText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#2b2a2a',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
  }
});