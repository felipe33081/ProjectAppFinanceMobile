import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

interface ButtonProps {
  title: string;
}

const AddCardButton: React.FC<ButtonProps> = ({ title }) => {
  const { buttonsColors } = useDynamicColors();

  function Handle () {
    console.log('Teste do botão de adicionar Conta');
  }

  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: buttonsColors}]} onPress={Handle}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    width: 300
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    //fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
    fontSize: 19,
    fontFamily: 'Kanit'
  },
});

export default AddCardButton;