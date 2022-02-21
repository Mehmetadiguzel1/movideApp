import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default function MovieDetail({ navigation, route }) {
  const movieItem = route.params.item;
  var genres = "";
  movieItem.genres.map((genre, index ) => {
    genres += genre + (index < movieItem.genres.length -1 ? ", " : "");
  });
  return (
    <View style={styles.container}>
      <ScrollView>
        
        <TouchableWithoutFeedback onPress={() => navigation.pop()} >
          
          <MaterialCommunityIcons 
        style={{ position: "absolute", top: Constants.statusBarHeight +10, left: 20, zIndex:1, paddingRight: 20, paddingBottom:20}} name="chevron-left" size={24} color={"#fff"} />
        </TouchableWithoutFeedback>

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
              <Text>{genres}</Text>
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