import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

function MovieItem(props) {
    return (
        <View style={styles.item} >
            <Image style={styles.poster} source={{uri:"https://image.tmdb.org/t/p/original/" + props.item.poster_path}}/>
            <Text style={{width: 180}} >{props.item.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "column",
        flexWrap: 'wrap',
        marginRight: 10,
    },
    poster: {
        width: 180,
        height: 255,
        borderRadius: 10,
        marginBottom: 10,
    },
})



export default MovieItem;