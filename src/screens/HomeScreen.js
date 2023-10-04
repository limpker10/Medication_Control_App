import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Button from '../components/button';
import Colors from '../components/Colors';

function HomeScreen({navigation}) {
 

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.title}>Medication Control</Text>
        <Button title="See all medications" onPress={() => navigation.navigate('ViewAllTasks')} />
        <Button title="Add medications" onPress={() => navigation.navigate('CreateTask')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.primary},
  buttons: {flex: 1},
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default HomeScreen;