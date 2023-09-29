import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
//Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from '../components/Icons';
import Colors from '../components/Colors';

import HomeScreen from '../screens/HomeScreen';
import CreateTask from '../screens/CreateTask';
import ViewAllTasks from '../screens/ViewAllTasks';

import { database } from '../utils/database';
const TabArr = [
  { route: 'HomeScreen', label: 'HomeScreen', type: Icons.Feather, icon: 'home', component: HomeScreen, tabBarColor: Colors.primary },
  { route: 'CreateTask', label: 'CreateTask', type: Icons.Feather, icon: 'search', component: CreateTask, tabBarColor: Colors.green },
  { route: 'ViewAllTasks', label: 'ViewAllTasks', type: Icons.Feather, icon: 'plus-square', component: ViewAllTasks, tabBarColor: Colors.red },
  //{ route: 'Like', label: 'Like', type: Icons.Feather, icon: 'heart', component: Screen, tabBarColor: Colors.yellow },
  //{ route: 'Account', label: 'Account', type: Icons.FontAwesome, icon: 'user-circle-o', component: Screen, tabBarColor: Colors.purple },
];

const Tab = createBottomTabNavigator();


export default function Navigation() {

  useEffect(function () {
    async function loadDataAsync() {
      try {
        //await database.dropDatabaseTablesAsync()
        await database.setupDatabaseAsync()
        //await database.setupUsersAsync()

      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen key={index} name={_.route} component={_.component}
            options={{
              tabBarColor: _.tabBarColor,
              tabBarIcon: ({color, size}) => (
                <Icon name={_.icon} type={_.type} size={size} color={color} />
              )
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})