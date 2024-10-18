import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  StatusBar,
  Platform
} from 'react-native';
import BalanceCard from '@/components/Cards/BalanceCard';
import DetailsCard from '@/components/Cards/DetailsCard';
import DespesasCard from '@/components/Cards/DespesasCard';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';

export default function HomeScreen() {
  const { textTitleCards, barNotificationColor } = useDynamicColors();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const image = require('../../assets/images/yu13.jpg');

  useFonts({
    Kanit: require('../../assets/fonts/Kanit-Light.ttf'),
  });

  useEffect(() => {
    if (refreshing) {
      console.log('teste refreshing');
    }
  }, [refreshing]);

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
      <StatusBar
        backgroundColor={barNotificationColor}
        hidden={false}
      />
      <View>
        <BalanceCard />
      </View>

      <ScrollView
        decelerationRate='fast'
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <Text style={[styles.titleCardText, { color: textTitleCards }]}>Depesas por categoria</Text>
          <DespesasCard />
        </View>

        <View>
          <Text style={[styles.titleCardText, { color: textTitleCards }]}>Detalhamento</Text>
          <DetailsCard title='Maior valor de receita do mês' subtitle='Maior valor de despesa do mês' />
        </View>
      </ScrollView>
    </View>
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