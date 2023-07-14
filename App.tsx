
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './components/Splash';
import Add from './components/Add';
import SwiggyAddress from './components/SwiggyAddress';

const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      // <NavigationContainer>
      //   <Stack.Navigator screenOptions={{headerShown: false}}>
      //     <Stack.Screen name="Splash" component={Splash} />
      //     <Stack.Screen name="Add" component={Add} />
      //   </Stack.Navigator>
      // </NavigationContainer>

      <SwiggyAddress/>
    );
  }
}

export default App;