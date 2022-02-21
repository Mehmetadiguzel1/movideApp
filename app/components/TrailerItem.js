import { StyleSheet, Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

export default function TrailerItem(props) {
    // See our emulator screen size
    const deviceWidth = Dimensions.get('window').width;
    const posterWidth = (deviceWidth - 50) / 2;
    const leftPosition = (posterWidth - 24) / 4;
    const marginValue = props.itemIndex %2 == 0 ? 10 : 0;


    return (
        <TouchableWithoutFeedback  onPress={props.onPressFunction}>
            <View style={{ marginRight: marginValue, marginTop: 10, }} >
                <Image
                style={{ 
                    position: 'absolute',
                    top: 20,
                    left: leftPosition, 
                    zIndex: 1,
                    width: 56,
                    height: 56,
                    
                
                }} 
                source={require('./../../assets/play-button.png')} />
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
        </TouchableWithoutFeedback>
    );
}



