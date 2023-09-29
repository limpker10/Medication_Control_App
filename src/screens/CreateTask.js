import React , {useState}from 'react';
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import Button from '../components/button';
import { database } from '../utils/database';

function CreateTask({ navigation }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  function handleTitleChange(text) {
    setTitle(text);
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
        {cancelable: false}
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
          <Button title="Create task"  onPress={createTask} />
          {error && <Text>{error}</Text>}
        </KeyboardAvoidingView>
      </ScrollView>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  buttons: {flex: 1},
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  keyboardAvoidingView: {flex: 1, justifyContent: 'space-between'},
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