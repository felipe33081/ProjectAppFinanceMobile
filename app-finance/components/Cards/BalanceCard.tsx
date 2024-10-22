import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import { useDynamicColors } from '@/hooks/useDynamicColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Definindo o enum para os meses
enum MonthsEnum {
  JAN = 1,
  FEB,
  MAR,
  APR,
  MAY,
  JUN,
  JUL,
  AUG,
  SEP,
  OCT,
  NOV,
  DEC,
}

// Função para obter o rótulo de um mês a partir do enum
const getMonthLabel = (month: number): string => {
  switch (month) {
    case MonthsEnum.JAN: return 'JAN';
    case MonthsEnum.FEB: return 'FEV';
    case MonthsEnum.MAR: return 'MAR';
    case MonthsEnum.APR: return 'ABR';
    case MonthsEnum.MAY: return 'MAI';
    case MonthsEnum.JUN: return 'JUN';
    case MonthsEnum.JUL: return 'JUL';
    case MonthsEnum.AUG: return 'AGO';
    case MonthsEnum.SEP: return 'SET';
    case MonthsEnum.OCT: return 'OUT';
    case MonthsEnum.NOV: return 'NOV';
    case MonthsEnum.DEC: return 'DEZ';
    default: return '';
  }
};

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

const BalanceCard = () => {
  const { backgroundCardsColor, textsColor } = useDynamicColors();
  const [eyeVisible, setEyeVisible] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Mês começa de 1
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [modalVisible, setModalVisible] = useState(false);

  useFonts({
    Kanit: require('../../assets/fonts/Kanit-Light.ttf'),
  });

  async function HandleEyeVisible() {
    setEyeVisible(!eyeVisible);
  };

  const handleMonthYearSelect = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    
    //console.log(month + "-" + year)
    setModalVisible(false);
  };

  return (
    <View>
      <View style={[styles.card, { backgroundColor: backgroundCardsColor }]}>
        
        {/* Mês e Ano como botão */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={[styles.title, { color: textsColor }]}>
            {getMonthLabel(selectedMonth)} {selectedYear}
            <AntDesign name="down" size={24} color="#fff"/>
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.subtitle, { color: '#8f8d98' }]}>Saldo em Conta</Text>
        
        {eyeVisible ? 
          <Text style={[styles.balanceText, { color: textsColor }]}>R$3.700,00</Text> : 
          <Text style={[styles.balanceText, { color: textsColor }]}>*******</Text>
        }

        <TouchableOpacity style={styles.button} onPress={HandleEyeVisible}>
          <MaterialCommunityIcons 
            name={eyeVisible ? "eye-outline" : "eye-off-outline"} 
            size={22} 
            color="#8f8d98" 
          />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
          {/* Seção de Receitas */}
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            <AntDesign name="upcircle" size={38} color="#4eb251" />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.kanitMedium, { color: '#8f8d98' }]}>Receitas</Text>
              {eyeVisible ? 
                <Text style={{ color: '#4eb251', fontSize: 18, fontFamily: 'Kanit' }}>R$ 1.000,00</Text> :
                <Text style={{ color: '#4eb251', fontSize: 18, fontFamily: 'Kanit' }}>*******</Text>
              }
            </View>
          </View>

          {/* Seção de Despesas */}
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'flex-start', width: 220, paddingLeft: 30 }}>
            <AntDesign name="downcircle" size={38} color="#f74236" />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.kanitMedium, { color: '#8f8d98' }]}>Despesas</Text>
              {eyeVisible ? 
                <Text style={{ color: '#f74236', fontSize: 18, fontFamily: 'Kanit' }}>R$ 7.500,00</Text> : 
                <Text style={{ color: '#f74236', fontSize: 18, fontFamily: 'Kanit' }}>*******</Text>
              }
            </View>
          </View>
        </View>
      </View>

      {/* Modal para selecionar mês e ano */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Seletor de Ano */}
            <View style={styles.yearPicker}>
              <AntDesign name="left" size={24} color="#fff" onPress={() => setSelectedYear(selectedYear - 1)} />
              <Text style={styles.modalText}>{selectedYear}</Text>
              <AntDesign name="right" size={24} color="#fff" onPress={() => setSelectedYear(selectedYear + 1)} />
            </View>

            {/* Seletor de Mês */}
            <View style={styles.monthPicker}>
              {Object.values(MonthsEnum).filter(value => typeof value === 'number').map((monthValue) => (
                <TouchableOpacity
                  key={monthValue}
                  onPress={() => handleMonthYearSelect(monthValue as number, selectedYear)}
                  style={styles.monthButton}
                >
                  <Text style={[styles.modalText, selectedMonth === monthValue ? styles.selectedMonth : null]}>
                    {getMonthLabel(monthValue as number)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMonthYearSelect(new Date().getMonth() + 1, new Date().getFullYear())}>
                <Text style={styles.currentText}>MÊS ATUAL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#3c3c44',
    padding: 20,
    borderRadius: 10,
  },
  yearPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  monthButton: {
    width: '30%',
    marginBottom: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
  },
  selectedMonth: {
    color: '#8858ce',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cancelText: {
    color: '#8858ce',
    fontSize: 16,
  },
  currentText: {
    color: '#8858ce',
    fontSize: 16,
  },
});

export default BalanceCard;