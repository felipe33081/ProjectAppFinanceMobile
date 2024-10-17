import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CardProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

const BalanceCard: React.FC<CardProps> = () => {
  const { backgroundCardsColor, textsColor, barNotificationColor } = useDynamicColors();
  const [eyeVisible, setEyeVisible] = useState(true);

  useFonts({
    Kanit: require('../../assets/fonts/Kanit-Light.ttf'),
  });

  async function HandleEyeVisible() {
    if (eyeVisible == true) {
      setEyeVisible(false);
    }
    if (eyeVisible == false) {
      setEyeVisible(true);
    }
  };

  return (
    <View >
      <StatusBar
        animated={false}
        backgroundColor={barNotificationColor}
        hidden={false}
      />
      <View style={[styles.card, { backgroundColor: backgroundCardsColor }]}>

        <Text style={[styles.title, { color: textsColor }]}>Outubro</Text>
        <Text style={[styles.subtitle, { color: '#8f8d98' }]}>Saldo em Conta</Text>

        {eyeVisible == true && <Text style={[styles.balanceText, { color: textsColor }]}>R$3.700,00</Text>}
        {eyeVisible == false && <Text style={[styles.balanceText, { color: textsColor }]}>*******</Text>}

        <View >
          <Pressable style={[styles.button]} onPress={HandleEyeVisible}>
            {eyeVisible == true && <MaterialCommunityIcons name="eye-outline" size={22} color="#8f8d98" />}
            {eyeVisible == false && <MaterialCommunityIcons name="eye-off-outline" size={22} color="#8f8d98" />}
          </Pressable>
        </View>

        {/* View  */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
          {/* Seção de Receitas */}
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <AntDesign name="upcircle" size={38} color="#4eb251" />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.kanitMedium, { color: '#8f8d98' }]}>Receitas</Text>
              {eyeVisible == true && <Text style={{ color: '#4eb251', fontSize: 18, fontFamily: 'Kanit' }}>R$ 1.000,00</Text>}
              {eyeVisible == false && <Text style={{ color: '#4eb251', fontSize: 18, fontFamily: 'Kanit' }}>*******</Text>}
            </View>
          </View>

          {/* Seção de Despesas */}
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: 220, paddingLeft: 30 }}>
            <AntDesign name="downcircle" size={38} color="#f74236" />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.kanitMedium, { color: '#8f8d98' }]}>Despesas</Text>
              {eyeVisible == true && <Text style={{ color: '#f74236', fontSize: 18, fontFamily: 'Kanit' }}>R$ 7.500,00</Text>}
              {eyeVisible == false && <Text style={{ color: '#f74236', fontSize: 18, fontFamily: 'Kanit' }}>*******</Text>}
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    //backgroundColor: 'rgba(255, 255, 255, 0.8)', // Lighter background color
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    paddingBottom: 25,
    marginBottom: 25,
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
    fontSize: 30,
    paddingBottom: 0,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    padding: 10,
  }
});

export default BalanceCard;