import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';

export default function MovieDetail({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>{route.params.item.title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: Constants.statusBarHeight,

    }
})