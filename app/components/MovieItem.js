import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MovieDetail from '../pages/MovieDetail'
function MovieItem(props) {

    const navigation = useNavigation();
    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate("MovieDetail", { item: props.item})}>
            <View style={styles.item} >
                <Image style={styles.poster} source={{uri:"https://image.tmdb.org/t/p/original/" + props.item.poster_path}}/>
                <Text style={styles.MovieCardName} >{props.item.title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "column",
        flexWrap: 'wrap',
        marginRight: 10,
    },
    MovieCardName:{
        width: 180, 
    },
    poster: {
        width: 180,
        height: 255,
        borderRadius: 10,
        marginBottom: 10,
    },
})



export default MovieItem;