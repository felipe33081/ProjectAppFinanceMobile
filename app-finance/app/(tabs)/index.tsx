import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import BalanceCard from '@/components/Cards/BalanceCard';
import DetailsCard from '@/components/Cards/DetailsCard';
import DespesasCard from '@/components/Cards/DespesasCard';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function HomeScreen() {
  const { textsColor } = useDynamicColors();

  const image = require('../../assets/images/1000_F_916875522_4MAi6kU4XNpdmCHLqX2R66btNzflaqgV (1).jpg');

  useFonts({
    Kanit: require('../../assets/fonts/Kanit-Light.ttf'),
  });

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View>
        <View>
          <BalanceCard />
        </View>

        <View>
          <Text style={[styles.titleCardText, { color: textsColor }]}>Depesas por categoria</Text>
          <DespesasCard />
        </View>

        <View>
          <Text style={[styles.titleCardText, { color: textsColor }]}>Detalhamento</Text>
          <DetailsCard title='Maior valor de receita do mês' subtitle='Maior valor de despesa do mês' />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  titleCardText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 22,
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