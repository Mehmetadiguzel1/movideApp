import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

export default function TrailerItem(props) {
    // See our emulator screen size
    const deviceWidth = Dimensions.get('window').width;
    const posterWidth = (deviceWidth - 50) / 2;
    console.log(posterWidth / 2);
    const leftPosition = (posterWidth - 24) / 4;

    return (
        <View style={{ marginRight: 5, }} >
            <Image
            style={{ 
                position: 'absolute',
                top: 20,
                left: leftPosition, 
                zIndex: 1,
                width: 64,
                height: 64,
            
            }} 
            source={require('./../../assets/play.png')} />
            <Image resizeMode={'cover'} 
            style={{
                width: posterWidth, 
                height: 100,
                borderRadius: 20,
                marginBottom: 5,
                }} 
                source={{uri:'https://image.tmdb.org/t/p/original/' + props.poster}} />
            <Text style={{flexWrap: 'wrap', width: posterWidth}}>{props.data.name}</Text>
        </View>
    )
}



