import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dashboard from './screens/Dashboard.jsx'
import { createStackNavigator } from '@react-navigation/stack';
import SeeDetails from './screens/SeeDetails.jsx';
import AddDetails from './screens/AddDetails.jsx';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddDetails" component={AddDetails} />
      <Stack.Screen name="SeeDetails" component={SeeDetails} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})