import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainRoot from './app/pages/MainRoot';
import MovieDetail from './app/pages/MovieDetail';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
export default function App() {
  // Fonts Style 
  let [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
  if(!fontsLoaded){
    <View></View>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen
          name="Home"
          component={MainRoot}
          options={{ title: 'MainRoot' }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{ title: 'MovieDetail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
