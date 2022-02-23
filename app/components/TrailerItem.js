import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

export default function TrailerItem(props) {
    // See our emulator screen size
    const marginValue = props.itemIndex %2 == 0 ? 10 : 0;


    return (
        <TouchableWithoutFeedback  onPress={props.onPressFunction}>
            <View style={{ marginRight: marginValue, marginTop: 10, }} >
                <Image
                style={styles.ImagePlayButton} 
                source={require('./../../assets/play-button.png')} />
                <Image resizeMode={'cover'} 
                style={styles.ImageMovie} 
                    source={{ uri: props.poster }} />
                <Text style={styles.TrailerName}>{props.data.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    ImagePlayButton: {
        position: 'absolute',
        top: 5,
        left: 5, 
        zIndex: 1,
        width: 36,
        height: 36,
    },
    TrailerName:{
        flexWrap: 'wrap', 
        width: 180,
    },
    ImageMovie:{
        width: 180, 
        height: 100,
        borderRadius: 20,
        marginBottom: 5,
    }
})


