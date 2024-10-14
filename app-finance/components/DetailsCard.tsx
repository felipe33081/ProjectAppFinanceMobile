import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const DetailsCard: React.FC<CardProps> = ({ title, subtitle, children, style }) => {
  const { textsColor, backgroundCardsColor, generalBackgroundColor } = useDynamicColors();

  return (
    <View style={[styles.card, style, { backgroundColor: backgroundCardsColor }]}>
      {title && <Text style={[styles.title, { color: textsColor }]}>{title}</Text>}
      <Text style={[styles.text, { color: '#4eb251' }]}>Categoria: Salário - Valor: R$ 7.500,00</Text>

      {subtitle && <Text style={[styles.subtitle, { color: textsColor }]}>{subtitle}</Text>}
      <Text style={[styles.text, { color: '#f74236' }]}>Categoria: Alimentação - Valor: R$ 253,00</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    //backgroundColor: Colors.CardsbackgroundColor, // Lighter background color
    borderRadius: 20,
    padding: 0,
    margin: 10,
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
    // fontWeight: 'bold', // Uncomment if you want bold font
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Kanit'
  },
  subtitle: {
    fontSize: 20,
    marginTop: 25,
    textAlign: 'center',
    fontFamily: 'Kanit'
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Kanit'
  },
  content: {
    flex: 1,
    margin: 18,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
  },
});

export default DetailsCard;