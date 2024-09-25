// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import React from 'react'

import { PaperProvider } from 'react-native-paper'
import RegisterScreent from './src/screens/RegisterScreent'
import LoginScreent from './src/screens/LoginScreent'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/navigator/StackNavigator';
const App = () => {
  return (
    <NavigationContainer>
    <PaperProvider>
  <StackNavigator/>
    </PaperProvider>
    </NavigationContainer>
   
  )
}

export default App
