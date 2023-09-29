import React, { useEffect , useState} from 'react';
import { View, StyleSheet, Text ,ActivityIndicator,FlatList} from 'react-native';
import Button from '../components/button';
import { database } from '../utils/database';

function ViewAllTasks({ navigation }) {

  //const {taskId} = route.params;
  const [tasks, setTask] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function fetchDatabase() {
        try {
          const taskFromDatabase = await database.getTasks();
          if (taskFromDatabase.length === 0) {
            //setError('Task not found');
            //setTask(taskFromDatabase);
            console.log(taskFromDatabase)
            //setIsLoading(false);
            return;
          }
          //setIsLoading(false);
          console.log("asd2"+taskFromDatabase[0].title)
          setTask(taskFromDatabase);
          setIsLoading(false);
        }catch(e){
          setError(`An error occurred getting the tasks: ${e.message}`);
        }
      }
      fetchDatabase();
    },
    []
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading Data...</Text>
      </View>
    );
  }
  if (error) {
    return <Text>Error loading tasks: {error.message}</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.id}</Text>
    <Text style={styles.cardDescription}>{item.title}</Text>
  </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.title}>ViewAllTasks</Text>
        <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
        <Button title="HomeScreen task" onPress={() => navigation.navigate('HomeScreen')} />

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
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // para Android
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#777',
  },
  cardDate: {
    fontSize: 14,
    color: '#999',
  },
});
export default ViewAllTasks;