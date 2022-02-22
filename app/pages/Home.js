import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';
import Movie from '../models/Movie';
import MovieItem from '../components/MovieItem'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Home extends Component {
    _isMount = false;
    genres = [];
    state = {
        isLoading: false,
        recentMovie:[],
        popularMovies: [],

    };
    constructor(props){
        super(props);
        this.genres = props.genres;
    }

    componentDidMount() {
        this._isMount = true;

        return fetch('https://api.themoviedb.org/3/movie/popular?api_key=def30dcb6753a6abdcf8682057b1ed85')
        .then((response) => response.json())
        .then((responseJson) => {
            const data = [];
            var allGenres = this.genres;
            responseJson.results.forEach((movie) => {
                movie.genres = [];
                movie.genre_ids.forEach((genreId) => {
                    var genreData = allGenres.filter(x=> x.id == genreId);
                    if(genreData.length != 0){ 
                        //console.log(genreData[0].name);
                        movie.genres.push(genreData[0].name); 
                    }
                });


                data.push(
                    new Movie({ 
                        id: movie.id, 
                        title: movie.title, 
                        poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path,
                        genre_ids: movie.genre_ids,
                        overview: movie.overview,
                        popularity: movie.popularity,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        vote_count: movie.vote_count,
                        genres: movie.genres,
                    })
                );
            });

            this.setState({
                popularMovies: data,
            })

        })
        .catch((error) => console.log(error));
    }

    componentWillUnmount() {
        this._isMount = false;
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Keko Movie</Text>
                    <MaterialCommunityIcons name="magnify" size={26} />
                </View>
                <ScrollView horizontal={true} 
                showsHorizontalScrollIndicator = {false}
                >
                    <View style={{ flexDirection: "row", flex: 1, paddingLeft: 20}}>
                        {
                            this.state.popularMovies.map((item, index) =>{
                                return( index < 6 ? (<MovieItem key={item.id}  item={item} /> 
                                    ) : <View key={item.id} />
                                    
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        paddingVertical: 20,
    },
    header:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    title:{
        fontSize: 24,
        fontFamily: 'Poppins',
    },
});