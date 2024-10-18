import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDynamicColors } from '@/hooks/useDynamicColors';

interface ButtonProps {
  title: string;
}

const AddNewAccountButton: React.FC<ButtonProps> = ({ title }) => {
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
    marginTop: 25,
    margin: 20,
    width: 300,
    height: 45,
    alignItems: "center",
    paddingVertical: 6
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    //fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'Kanit',
  },
});

export default AddNewAccountButton;