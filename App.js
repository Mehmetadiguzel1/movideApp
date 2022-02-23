import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainRoot from './app/pages/MainRoot';
import MovieDetail from './app/pages/MovieDetail';
import * as Font from 'expo-font';


const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded, setFontLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        //TODO: Load fonts
        await Font.loadAsync({
          "poppins-r": require("./assets/fonts/Poppins-Regular.ttf"),
          "poppins-l": require("./assets/fonts/Poppins-Light.ttf"),
          "poppins-sb": require("./assets/fonts/Poppins-SemiBold.ttf"),
          "poppins-b": require("./assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="MainRoot"
          component={MainRoot}
          options={{ title: "MainRoot" }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{ title: "MovieDetail" }}
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
