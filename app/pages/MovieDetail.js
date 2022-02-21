import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
export default function MovieDetail({ navigation, route }) {
  const movieItem = route.params.item;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.poster} resizeMode={"cover"} source={{uri: "https://image.tmdb.org/t/p/original/" + movieItem.backdrop_path}} />

        <View style={{ 
          flex: 1, 
          backgroundColor:"#B0B0B0",
          padding: 20,
          }}>
          <View style={{ 
            flex:1, 
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center",
            }}>

            <View style={{ flexWrap: "wrap", flexDirection: "column"}}>
              <Text>{movieItem.title}</Text>
              <Text>{movieItem.title}</Text>
            </View>
            <View style={{ 
              width:48, 
              height:48, 
              backgroundColor:"white", 
              borderRadius:24,
              justifyContent:"center",
              alignItems:"center",
              
              }}>
                <Text>{movieItem.vote_average}</Text>
            </View>
          </View>
          <Text style={styles.header}>Overview</Text>
          <Text>{movieItem.overview}</Text>
          <Text style={styles.header}>Teaser & Trailers</Text>

        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: Constants.statusBarHeight,

    },
    poster:{
      height: 230,
    },
    header:{
      fontSize: 26,
      fontWeight:"bold",
      marginTop: 10,
    }
})