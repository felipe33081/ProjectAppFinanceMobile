import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useDynamicColors } from '@/hooks/useDynamicColors';

const screenWidth = Dimensions.get('window').width;

// Dados de exemplo para o gráfico de pizza
const data = [
  {
    name: 'Alimentação',
    amount: 650,
    color: '#8858ce',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Casa',
    amount: 276,
    color: '#36a2eb',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Lazer',
    amount: 220,
    color: '#ff6384',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Outros',
    amount: 290,
    color: '#c9cbcf',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const DespesasCard = () => {
  const { textsColor, backgroundCardsColor } = useDynamicColors();

  return (
    <View style={[styles.card, { backgroundColor: backgroundCardsColor }]}>
      <View style={styles.chartContainer}>
        <View style={styles.legendContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={[styles.legendText, { color: textsColor }]}>
                {item.name}
              </Text>
              <Text style={[styles.legendAmount, { color: textsColor }]}>
                R${item.amount},00
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 15,
    margin: 10,
    marginBottom: 25,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Kanit',
    fontWeight: '500',
    color: '#7F7F7F',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendContainer: {
    flex: 1,
    marginLeft: 20, // Espaçamento entre gráfico e legenda
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para garantir que o texto e os valores fiquem separados
    marginVertical: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    flex: 1,
    fontFamily: 'Kanit',
    color: '#7F7F7F',
  },
  legendAmount: {
    fontSize: 14,
    fontFamily: 'Kanit',
    color: '#7F7F7F',
  },
});

export default DespesasCard;
