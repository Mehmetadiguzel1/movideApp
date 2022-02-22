import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function RecentMovieItem(props) {
    

    const navigation = useNavigation();
    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate("MovieDetail", { item: props.item})}>
            <View style={styles.item} >

                <Image style={styles.poster} source={{uri:"https://image.tmdb.org/t/p/original/" + props.item.poster_path}}/>

                <View style={styles.movieCardRowStyle}>
                    <Text style={styles.MovieCardName} >{props.item.title}</Text>
                    <Text style={{width: 100}}>
                        {props.item.genres.map((genre, index) => genre + (index < props.item.genres.length - 1 ? ", " : ""))}
                    </Text>

                <View style={styles.rate}>
                    <MaterialCommunityIcons name="star" size={17} color={"gold"} />
                    <Text style={{fontFamily:'PoppinsSemiBold', alignItems:'center',}}>{props.item.vote_average}</Text>
                    <Text style={styles.rateMax}> / 10</Text>
                </View>
                
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    rate:{
        flexDirection: 'row',
        flexWrap:"wrap",
    },
    rateMax:{
        fontSize: 10,
        fontFamily: 'PoppinsLight',
        alignSelf: 'flex-end',
    },
    movieCardRowStyle:{
        marginLeft: 10,
    },
    MovieCardName:{
        width: 180, 
        fontFamily: 'Poppins',
        fontSize: 13
    },
    poster: {
        width: 180,
        height: 255,
        borderRadius: 10,
        marginBottom: 10,
    },
})



export default RecentMovieItem;