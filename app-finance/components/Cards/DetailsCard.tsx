import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import AddNewAccountButton from '../AddNewAccountButton';

interface CardProps {
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
}

const DetailsCard: React.FC<CardProps> = ({ title, subtitle, style }) => {
  const { textsColor, backgroundCardsColor } = useDynamicColors();

  return (
    <View style={[styles.card, style, { backgroundColor: backgroundCardsColor }]}>
      {title && <Text style={[styles.title, { color: textsColor }]}>{title}</Text>}
      <Text style={[styles.text, { color: '#4eb251' }]}>Categoria: Salário - Valor: R$ 7.500,00</Text>

      {subtitle && <Text style={[styles.subtitle, { color: textsColor }]}>{subtitle}</Text>}
      <Text style={[styles.text, { color: '#f74236' }]}>Categoria: Alimentação - Valor: R$ 253,00</Text>

      <View style={styles.button}>
        <AddNewAccountButton title="Adicionar nova conta" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    //backgroundColor: Colors.CardsbackgroundColor, // Lighter background color
    borderRadius: 20,
    padding: 10,
    margin: 10,
    marginBottom: 25,
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
  button: {
    alignItems: 'center',
  }
});

export default DetailsCard;