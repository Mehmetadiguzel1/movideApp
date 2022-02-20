import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./../pages/Home";
import Favorite from "./../pages/Favorite";
import Settings from "./../pages/Settings";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

class MainRoot extends Component {
  render() {
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false, tabBarActiveTintColor: '#e91e63'}}>
            <Tab.Screen options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={20} />
                ),
            }} name="Home" component={Home} />
            <Tab.Screen options={{
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="heart" color={color} size={20} />
                ),
            }} name="Favorite" component={Favorite} />
            <Tab.Screen options={{
                tabBarLabel: 'Favorite',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cog" color={color} size={20} />
                ),
            }} name="Settings" component={Settings} />
        </Tab.Navigator>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    }
})

export default MainRoot;