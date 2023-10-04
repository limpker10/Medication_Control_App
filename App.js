import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet
} from 'react-native';
import Colors from './src/components/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ROUTES from './src/constants/routes';

import Navigation from './src/navigation/bottonTabNavigation';
import HomeScreen from './src/screens/HomeScreen';
import CreateTask from './src/screens/CreateTask';
import ViewAllTasks from './src/screens/ViewAllTasks';

export default function App() {
  const Stack = createStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerBackTitleVisible : false}}>
          <Stack.Screen name={ROUTES.HOME_TAB} component={Navigation} options={{headerShown: false}} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ViewAllTasks" component={ViewAllTasks} />
          <Stack.Screen name="CreateTask" component={CreateTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
