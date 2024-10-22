import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Certifique-se de importar do pacote correto
import { useDynamicColors } from '@/hooks/useDynamicColors';

interface Transaction {
  id: string;
  type: 'Receita' | 'Despesa';
  category: string;
  description: string;
  date: string;
  amount: number;
  paid: boolean;
  account: string;
}

const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Receita',
    category: 'Salário',
    description: 'Salário mensal',
    date: '21 out. 2024',
    amount: 7500,
    paid: true,
    account: 'Carteira',
  },
  {
    id: '2',
    type: 'Despesa',
    category: 'Alimentação',
    description: 'Alimentação',
    date: '21 out. 2024',
    amount: 400,
    paid: false,
    account: 'Carteira',
  },
  {
    id: '3',
    type: 'Despesa',
    category: 'Transporte',
    description: 'Gasolina',
    date: '21 out. 2024',
    amount: 500,
    paid: true,
    account: 'Carteira',
  },
];

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

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDateVisible, setModalDateVisible] = useState(false);
  const [filter, setFilter] = useState<'Todas' | 'Receitas' | 'Despesas'>('Todas');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [newTransaction, setNewTransaction] = useState<Transaction | null>(null);
  const { textTitleCards, barNotificationColor, textsColor, backgroundCardsColor } = useDynamicColors();

  useEffect(() => {

    console.log(selectedMonth + "-" + selectedYear)
  }, []);

  useEffect(() => {
    const updateDate = () => {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      console.log(currentMonth + "-" + currentYear)
      // Verifica se o mês ou o ano mudou
      if (selectedMonth !== currentMonth || selectedYear !== currentYear) {
        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);
      }
    };
    // Chama a função a cada 1 hora para garantir que o mês é atualizado corretamente
    const interval = setInterval(updateDate, 3600000); // 1 hora = 3600000 ms

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [selectedMonth, selectedYear]);

  const filterTransactions = (type: 'Todas' | 'Receitas' | 'Despesas') => {
    setFilter(type);
    if (type === 'Todas') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(t => t.type === type.slice(0, -1)));
    }
  };

  const handleMonthYearSelect = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);

    console.log(month + "-" + year)
    setModalDateVisible(false);
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={[styles.transactionItem, { backgroundColor: backgroundCardsColor }]} onPress={() => setSelectedTransaction(item)}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={item.type === 'Receita' ? 'attach-money' : 'money-off'}
          size={30}
          color={item.type === 'Receita' ? '#4eb251' : '#f74236'}
        />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionCategory, { color: textsColor }]}>{item.category}</Text>
        <Text style={styles.transactionDescription}>{item.description} | {item.account}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>

      <View >
        <Text
          style={[
            styles.transactionAmount,
            { color: item.type === 'Receita' ? '#4eb251' : '#f74236' },
          ]}
        >
          R${item.amount.toFixed(2)}
        </Text>
        <View style={styles.paidStatus}>
          {item.paid ? (
            <View>
              <AntDesign name="checkcircle" size={20} color="#4eb251" />
            </View>
          ) : (
            <AntDesign name="closecircle" size={20} color="#f74236" />
          )}
        </View>
      </View>

    </TouchableOpacity>
  );

  const handleAddTransaction = () => {
    if (newTransaction) {
      setTransactions([...transactions, { ...newTransaction, id: `${transactions.length + 1}` }]);
      setModalVisible(false);
      setNewTransaction(null);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={[styles.barTop, { backgroundColor: backgroundCardsColor }]}>
        <Text style={[styles.barTopText, { color: textsColor }]}>Contas</Text>
      </View>

      {/* Mês e Ano como botão */}
      <View style={[styles.modalDate, { backgroundColor: backgroundCardsColor }]}>
        <TouchableOpacity onPress={() => setModalDateVisible(true)}>
          <Text style={[styles.title, { color: textsColor }]}>
            {getMonthLabel(selectedMonth)} {selectedYear}
            <AntDesign name="down" size={24} color={textsColor} />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.filterContainer, { backgroundColor: backgroundCardsColor }]}>
        <TouchableOpacity onPress={() => filterTransactions('Todas')}>
          <Text style={[styles.filterButton, filter === 'Todas' && styles.filterActive, { color: textsColor }]}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterTransactions('Receitas')}>
          <Text style={[styles.filterButton, filter === 'Receitas' && styles.filterActive, { color: textsColor }]}>Receitas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterTransactions('Despesas')}>
          <Text style={[styles.filterButton, filter === 'Despesas' && styles.filterActive, { color: textsColor }]}>Despesas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.transactionList}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal para adicionar transação */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova transação</Text>
            <TextInput
              placeholder="Descrição"
              onChangeText={(text) => setNewTransaction({ ...newTransaction!, description: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Categoria"
              onChangeText={(text) => setNewTransaction({ ...newTransaction!, category: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Valor"
              keyboardType="numeric"
              onChangeText={(text) => setNewTransaction({ ...newTransaction!, amount: parseFloat(text) })}
              style={styles.input}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para detalhes da transação */}
      <Modal
        visible={!!selectedTransaction}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTransaction?.type}</Text>
            <Text>Categoria: {selectedTransaction?.category}</Text>
            <Text>Descrição: {selectedTransaction?.description}</Text>
            <Text>Data: {selectedTransaction?.date}</Text>
            <Text>Valor: R${selectedTransaction?.amount.toFixed(2)}</Text>
            <Text>Conta: {selectedTransaction?.account}</Text>
            <Text>Pago: {selectedTransaction?.paid ? 'Sim' : 'Não'}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedTransaction(null)}>
              <AntDesign name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para selecionar mês e ano */}
      <Modal
        visible={modalDateVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalDateVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: backgroundCardsColor }]}>
            {/* Seletor de Ano */}
            <View style={styles.yearPicker}>
              <AntDesign name="left" size={24} color={textsColor} onPress={() => setSelectedYear(selectedYear - 1)} />
              <Text style={[styles.modalText, { color: textTitleCards }]}>{selectedYear}</Text>
              <AntDesign name="right" size={24} color={textsColor} onPress={() => setSelectedYear(selectedYear + 1)} />
            </View>

            {/* Seletor de Mês */}
            <View style={styles.monthPicker}>
              {Object.values(MonthsEnum).filter(value => typeof value === 'number').map((monthValue) => (
                <TouchableOpacity
                  key={monthValue}
                  onPress={() => handleMonthYearSelect(monthValue as number, selectedYear)}
                  style={[styles.monthButton]}
                >
                  <Text style={[styles.modalText, { color: textTitleCards }, selectedMonth === monthValue ? styles.selectedMonth : null]}>
                    {getMonthLabel(monthValue as number)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalDateVisible(false)}>
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
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#e4e5e8'
  },
  modalDate: {
    alignItems: 'center'
  },
  barTop: {
    padding: 10
  },
  barTopText: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 23,
    textAlign: 'center'
  },
  headerDate: {
    fontFamily: 'Kanit',
    fontWeight: '400',
    fontSize: 23
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 10
  },
  filterButton: {
    fontSize: 16,
  },
  filterActive: {
    fontWeight: 'bold',
  },
  transactionList: {
    paddingHorizontal: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  iconContainer: {
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  transactionDescription: {
    fontSize: 14,
    color: 'gray',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paidStatus: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#8858ce',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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

export default TransactionsScreen;