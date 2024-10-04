import React, { useState } from 'react';
import { Switch, TextInput, View, StyleSheet, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { getFirestore, collection, getDocs, addDoc, query } from 'firebase/firestore/lite';
import { firebaseInitialize } from '../firebaseconfig';
import SelectDropdown from 'react-native-select-dropdown'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const db = getFirestore(firebaseInitialize);

const transactionsCollection = collection(db, 'transactions');

const emojisWithIcons = [
    { title: 'Saída', icon: 'emoticon-sad-outline' },
    { title: 'Entrada', icon: 'emoticon-excited-outline' }
];

export const AddTransactionButton = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleChange = (field, value) => {
        setNewTransaction({
            ...newTransaction,
            [field]: value,
        });
    };

    // Estado para armazenar os dados da nova transação
    const [newTransaction, setNewTransaction] = useState({
        title: '',
        inputType: '',
        date: '',
        amount: 0
    });

    // Função para adicionar a nova transação ao Firebase
    const handleAddTransaction = () => {
        addDoc(transactionsCollection, newTransaction)
            .then(docRef => {
                console.log('Document written with ID: ', docRef.id);
                // Limpar os campos do formulário após adicionar a transação
                setNewTransaction({
                    title: '',
                    inputType: '',
                    date: '',
                    amount: 0
                });
                setModalVisible(false);
            })
            .catch(error => {
                console.error('Error adding document: ', error);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <Modal isVisible={isModalVisible}>
                <View style={{ padding: 20 }}>
                    <TextInput
                        label="Título"
                        value={newTransaction.title}
                        onChangeText={(text) => handleChange('title', text)}
                    />
                    <SelectDropdown
                        data={emojisWithIcons}
                        value={newTransaction.inputType}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            handleChange('inputType', selectedItem.title); // Passa o título selecionado
                          }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    {selectedItem && (
                                        <Icons name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                    )}
                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {(selectedItem && selectedItem.title) || 'Selecione o tipo'}
                                    </Text>
                                    <Icons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                    <Icons name={item.icon} style={styles.dropdownItemIconStyle} />
                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                    />
                    <TextInput
                        label="Data"
                        value={newTransaction.date}
                        onChangeText={(text) => handleChange('date', text)}
                    />
                    <TextInput
                        label="Valor"
                        value={newTransaction.amount}
                        onChangeText={(number) => handleChange('amount', number)}
                        keyboardType="numeric"
                    />
                </View>
                <Button title="Adicionar" onPress={handleAddTransaction} />
            </Modal>
            <Button
                icon={<Icon name="add" size={30} color="white" />}
                rounded
                onPress={toggleModal}
                containerStyle={{ position: 'absolute', bottom: 20, right: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: 200,
      height: 50,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });