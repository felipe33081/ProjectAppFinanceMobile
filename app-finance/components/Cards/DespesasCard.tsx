import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Platform  } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const DespesasCard: React.FC<CardProps> = ({ style }) => {
  const { textsColor, backgroundCardsColor, generalBackgroundColor } = useDynamicColors();

  return (
    <View style={[styles.card, style, { backgroundColor: backgroundCardsColor }]}>
      <Text style={[styles.depesasCardText, { color: textsColor }]}>Graficos vem aqui com categorias</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    //backgroundColor: Colors.CardsbackgroundColor, // Lighter background color
    borderRadius: 20,
    padding: 10,
    margin: 10,
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
    // fontWeight: 'bold', // Uncomment if you want bold font
    marginTop: 0,
    textAlign: 'center',
    fontFamily: 'Kanit'
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    margin: 15,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
  },
  depesasCardText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 18,
    textAlign: "center"
  },
});

export default DespesasCard;