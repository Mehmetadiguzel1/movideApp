import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

export default function TrailerItem(props) {
    // See our emulator screen size
    const deviceWidth = Dimensions.get('window').width;
    const posterWidth = (deviceWidth - 50) / 2;
    console.log(posterWidth / 2);

    return (
        <View style={{ marginRight: 5, }} >
            <Image resizeMode={'cover'} style={{width: posterWidth, height: 100,}} source={{uri:'https://image.tmdb.org/t/p/original/' + props.poster}} />
            <Text style={{flexWrap: 'wrap', width: posterWidth}}>{props.data.name}</Text>
        </View>
    )
}



