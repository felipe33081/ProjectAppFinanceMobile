import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, StatusBar } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Certifique-se de importar do pacote correto
import { useDynamicColors } from '@/hooks/useDynamicColors';

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

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<'Todas' | 'Receitas' | 'Despesas'>('Todas');
  const [selectedMonth, setSelectedMonth] = useState('Outubro');
  const [newTransaction, setNewTransaction] = useState<Transaction | null>(null);
  const { textTitleCards, barNotificationColor, textsColor, backgroundCardsColor } = useDynamicColors()

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const filterTransactions = (type: 'Todas' | 'Receitas' | 'Despesas') => {
    setFilter(type);
    if (type === 'Todas') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(t => t.type === type.slice(0, -1)));
    }
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

  console.log(selectedMonth)

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight || 0 }}>
      <View style={[styles.barTop, { backgroundColor: backgroundCardsColor }]}>
        <TouchableOpacity onPress={() => filterTransactions('Todas')}>
          <Text style={[styles.barTopText, { color: textsColor }]}>Contas</Text>
        </TouchableOpacity>
        <Picker
          selectedValue={selectedMonth}
          style={[styles.headerDate, { color: textsColor }]}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={month} />
          ))}
        </Picker>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barTop: {
    marginBottom: 20,
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
});

export default TransactionsScreen;