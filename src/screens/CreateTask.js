import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Text,
  SafeAreaView,
  Keyboard,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import Button from '../components/button';
import { useIsFocused } from '@react-navigation/native';
import { database } from '../utils/database';
import DateTimePicker from '@react-native-community/datetimepicker'
import COLORS from '../components/Colors'
import Input from '../components/Input';
import Medicamento from '../models/Medicamento'

function CreateTask({ navigation }) {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateInput, setDateInput] = useState("");

  const [inputs, setInputs] = useState({
    nombre_medicamento: '',
    dosis: '',
    periodo: '',
    fecha_hora: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused(); // Obtiene el estado de enfoque de la pantalla

  useEffect(() => {
    if (!isFocused) {
      setInputs({
        nombre_medicamento: '',
        dosis: '',
        periodo: '',
        fecha_hora: '',
    });
      setDateInput(''); // Limpiar el TextInput cuando la pantalla pierde el enfoque
    }
  }, [isFocused]);


  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      setDateInput(currentDate.toDateString());
      handleOnchange(currentDate.toDateString(),"fecha_hora")
      toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  }

  async function createTask(medicamento) {
    
    try {
      
      await database.setupMedicamentosAsync(medicamento);
      Alert.alert(
        'Success',
        'Medication created',
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

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.nombre_medicamento) {
      handleError('Please input nombre_medicamento', 'nombre_medicamento');
      isValid = false;
    } 

    if (!inputs.dosis) {
      handleError('Please input dosis', 'dosis');
      isValid = false;
    }

    if (!inputs.periodo) {
      handleError('Please input periodo number', 'periodo');
      isValid = false;
    } 

    if (!inputs.fecha_hora) {
      handleError('Please input fecha_hora', 'fecha_hora');
      isValid = false;
    }

    if (isValid) {
      createTask(new Medicamento(inputs.nombre_medicamento, inputs.dosis, inputs.periodo, inputs.fecha_hora));
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.primary, flex: 1}}>
      
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
          Register Medication
        </Text>
        <Text style={{color: COLORS.black, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Medication
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'nombre_medicamento')}
            onFocus={() => handleError(null, 'nombre_medicamento')}
            iconName="medical-bag"
            label="Medication Name"
            placeholder="Enter your medication name"
            error={errors.email}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'dosis')}
            onFocus={() => handleError(null, 'dosis')}
            iconName="receipt"
            label="Recommended Dosage (milligrams, grams, milliliters)"
            placeholder="Enter your Dosage Recommended"
            error={errors.fullname}
          />

          <Input
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'periodo')}
            onFocus={() => handleError(null, 'periodo')}
            iconName="sort-bool-descending"
            label="Period"
            placeholder="Enter your period to administer the dose"
            error={errors.periodo}
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
                <Input
                  placeholder="Sat Aug 21 2023"
                  onChangeText={onChange}
                  iconName="calendar"
                  label="Expiration date of the medication"
                  value={dateInput}
                  editable={false}
                  error={errors.fecha_hora}
                />
              </Pressable>
            )}
          <Button title="Register" onPress={validate} />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.black },
  buttons: { flex: 1 },
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  keyboardAvoidingView: { flex: 1, justifyContent: 'space-between' },
  
});
export default CreateTask;