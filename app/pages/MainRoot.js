import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./../pages/Home";
import Favorite from "./../pages/Favorite";
import Settings from "./../pages/Settings";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

class MainRoot extends Component {

    state = {
        isLoading:true,
        genres:[]
    }


    componentDidMount () {
        return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=def30dcb6753a6abdcf8682057b1ed85")
        .then(response => response.json())
        .then(responseJson => {

            this.setState({
                isLoading: false,
                genres: responseJson.genres,
            })

        })
        .catch(error => console.error(error));
    }

  render() {

    const HomeComponent = (props) => <Home genres={this.state.genres} />;
    if (this.state.isLoading){
        <SafeAreaView style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator />
        </SafeAreaView>
    }
    return (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false, tabBarActiveTintColor: '#FE9901', tabBarInactiveTintColor: '#484747',  
            }}>
            <Tab.Screen options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={20} />
                ),
            }} name="Home" component={HomeComponent} />
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