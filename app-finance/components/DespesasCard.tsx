import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const DespesasCard: React.FC<CardProps> = ({ children, style }) => {
  const { textsColor, backgroundCardsColor, generalBackgroundColor } = useDynamicColors();

  return (
    <View style={[styles.card, style, { backgroundColor: backgroundCardsColor }]}>
      {/* {title && <Text style={[styles.title, { color: textsColor }]}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>} */}
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
});

export default DespesasCard;