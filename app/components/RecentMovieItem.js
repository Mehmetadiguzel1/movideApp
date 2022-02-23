import { StyleSheet, Text, View, Image, TouchableNativeFeedback, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function RecentMovieItem(props) {
    const navigation = useNavigation();
    const deviceWidth = Dimensions.get("window").width;
    const _width = deviceWidth - 50 - 171;
    return (
        <TouchableWithoutFeedback
        onPress={() => navigation.navigate("MovieDetail", { item: props.item })}
        >
        <View style={styles.item}>
            <Image
            style={styles.poster}
            source={{
                uri: props.item.poster_path,
            }}
            />
            <View style={{ marginLeft: 10, width: _width }}>
            <Text style={styles.textBody}>
                {props.item.title}
            </Text>
            <Text style={styles.typeMovieBody}>
                {props.item.genres.map(
                (genre, index) =>
                    genre + (index < props.item.genres.length - 1 ? ", " : "")
                )}
            </Text>
            <View style={styles.ratePointBody}>
                <MaterialCommunityIcons name="star" color={"#FE6D8E"} size={20} />
                <Text
                style={styles.rate}>
                {props.item.vote_average}
                </Text>
                <Text
                style={styles.voteDegree}>
                {" "}
                / 10
                </Text>
            </View>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    ratePointBody:{
        flexDirection: "row", flexWrap: "wrap", 
    },
    textBody: {
            width: 171, 
            fontWeight:'bold', 
            fontSize: 13
    },
    rate:{
        fontWeight:'bold',
        alignSelf: "center",
    },
    typeMovieBody:{
        fontWeight: 'bold', 
        fontSize: 12
    },
    voteDegree:{
        fontSize: 10,
        fontWeight:'bold',
        alignSelf: "flex-end",
    },
    poster: {
        width: 180,
        height: 255,
        borderRadius: 10,
        marginBottom: 10,
    },
})



export default RecentMovieItem;