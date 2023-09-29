import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import Button from '../components/button';
import { useIsFocused } from '@react-navigation/native';
import { database } from '../utils/database';
import DateTimePicker from '@react-native-community/datetimepicker'

function CreateTask({ navigation }) {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateInput, setDateInput] = useState("");

  const isFocused = useIsFocused(); // Obtiene el estado de enfoque de la pantalla

  useEffect(() => {
    if (!isFocused) {
      setTitle('');
      setDateInput(''); // Limpiar el TextInput cuando la pantalla pierde el enfoque
    }
  }, [isFocused]);

  function handleTitleChange(text) {
    setTitle(text);
  };

  function handleNumericChange(text) {
    setNumber(text);
  };
  

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      setDateInput(currentDate.toDateString());
      toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  }

  async function createTask() {
    if (title === '') {
      setError('A title for task is required');
      return;
    }
    try {
      await database.setupUsersAsync();
      Alert.alert(
        'Success',
        'Task created',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('ViewAllTasks')
          }
        ],
        { cancelable: false }
      );
      setError(null);
    } catch (e) {
      setError(`An error occurred saving the task: ${e.message}`);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.title}>CreateTask</Text>
        <Button title="HomeScreen task" onPress={() => navigation.navigate('HomeScreen')} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
            <TextInput
              placeholder="Enter title"
              onChangeText={handleTitleChange}
              style={styles.textInput}
              value={title}
            />

            <TextInput
              style={styles.textInput}
              keyboardType='numeric'
              onChangeText={handleNumericChange}
              value={number}
              maxLength={10}
            />

            {showPicker && (
              <DateTimePicker
                mode='date'
                display='spinner'
                value={date}
                onChange={onChange}
              />
            )}

            {!showPicker && (
              <Pressable
                onPress={toggleDatePicker}
              >
                <TextInput
                  placeholder="Sat Aug 21 2023"
                  placeholderTextColor="#B9B4B4"
                  onChangeText={setDateInput}
                  style={styles.textInput}
                  value={dateInput}
                  editable={false}
                />
              </Pressable>
            )}
            <Button title="Create task" onPress={createTask} />
            {error && <Text>{error}</Text>}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  buttons: { flex: 1 },
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  keyboardAvoidingView: { flex: 1, justifyContent: 'space-between' },
  textInput: {
    padding: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    borderColor: '#EAB83E',
    borderWidth: 1
  }
});
export default CreateTask;