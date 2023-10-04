import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import Button from '../components/button';
import { database } from '../utils/database';
import Colors from '../components/Colors';
import Icon, { Icons } from '../components/Icons';
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
          console.log("asd2" + taskFromDatabase[0].title)
          setTask(taskFromDatabase);
          setIsLoading(false);
        } catch (e) {
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
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.id}</Text>
        <Icon name="beaker-plus-outline" type={Icons.MaterialCommunityIcons} size={24} color="#000" />
      </View>
      <Text style={styles.cardDescription}><Text style={styles.label}>Medicamento:</Text> {item.nombre_medicamento}</Text>
      <Text style={styles.cardDescription}><Text style={styles.label}>Dosis:</Text> {item.dosis}</Text>
      <Text style={styles.cardDescription}><Text style={styles.label}>Fecha y Hora:</Text> {item.fecha_hora}</Text>
      <Text style={styles.cardDescription}><Text style={styles.label}>Periodo:</Text> {item.periodo} horas</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.title}>Medications</Text>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary },
  buttons: { flex: 1 },
  title: {
    marginTop: 16,
    marginBottom: 16,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  card: {
    backgroundColor: Colors.light,
    padding: 20,
    margin: 10,
    borderRadius: 20, 
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, 
    shadowRadius: 4,  
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    marginVertical: 2,
  },
  cardDate: {
    fontSize: 14,
    color: '#999',
  },
  label: {
    fontWeight: 'bold',
  },
});
export default ViewAllTasks;