import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar } from 'react-native';
import BalanceCard from '@/components/Cards/BalanceCard';
import DetailsCard from '@/components/Cards/DetailsCard';
import DespesasCard from '@/components/Cards/DespesasCard';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function HomeScreen() {
  const { textsColor, barNotificationColor } = useDynamicColors();

  useFonts({
    Kanit: require('../../assets/fonts/Kanit-Light.ttf'),
  });

  return (
    <View>
      <View>
        <BalanceCard/>
      </View>

      <View>
        <Text style={[styles.titleCardText, { color: textsColor }]}>Detalhamento</Text>
        <DetailsCard title='Maior valor de receita do mês' subtitle='Maior valor de despesa do mês'/>
      </View>

      <View>
        <Text style={[styles.titleCardText, { color: textsColor }]}>Depesas por categoria</Text>
        <DespesasCard/>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  
  titleCardText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18,
    marginTop: 25,
    paddingLeft: 18
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
  }
});