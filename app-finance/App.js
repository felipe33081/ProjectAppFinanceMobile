import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Card from './components/Card';
import Balance from './components/Balance';
import Transactions from './components/Transactions';
import { AddTransactionButton } from './components/AddTransactionButton';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.staticSection}>
        <Card />
        <Balance />
      </View> 
      
      <Transactions />
      
      <AddTransactionButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingTop: 16 + Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    overflowX: 'hidden',
  },
  staticSection: {
    paddingHorizontal: 16,
  },
});
