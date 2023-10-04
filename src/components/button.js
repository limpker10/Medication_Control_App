import React from 'react';
import {TouchableOpacity, Text, StyleSheet,useColorScheme} from 'react-native';
import Colors from './Colors';
export default function Button({onPress, title}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});