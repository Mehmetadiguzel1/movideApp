import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Constants from 'expo-constants';
import Movie from '../models/Movie';
import MovieItem from '../components/MovieItem'
import RecentMovieItem from '../components/RecentMovieItem'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Home extends Component {
    _isMount = false;
    genres = [];
    baseUrl = "https://api.themoviedb.org/3/movie/";
    apiKey = "def30dcb6753a6abdcf8682057b1ed85";
    state = {
        
        isLoading: false,
        recentMovie:[],
        popularMovies: [],
        recentMovies: [],

    };
    constructor(props){
        super(props);
        this.genres = props.genres;
    }

    componentDidMount() {
        this._isMount = true;

        return fetch(this.baseUrl + 'popular?api_key=' + this.apiKey)
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
            if(this._isMount){
                this.setState({
                    popularMovies: data,
            });
            }
            
            fetch(this.baseUrl + 'now_playing?api_key=' + this.apiKey)
            .then(response => response.json())
            .then(responseJson => {
                const data = [];
            var allGenres = this.genres;
            responseJson.results.forEach((movie) => {
                movie.genres = [];
                movie.genre_ids.forEach((genreId) => {
                    var genreData = allGenres.filter(x=> x.id == genreId);
                    if(genreData.length != 0){ 
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
            if(this._isMount){
                this.setState({
                    recentMovies: data,
            });
            }
            }).catch((error) => console.log(error));
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
                
                <ScrollView>
                    <View style={{
                        flexDirection:'row', 
                        justifyContent:'space-between',
                        paddingHorizontal: 20,
                        alignItems:'center',
                        marginVertical: 15,
                        marginBottom: 10,
                        }}>
                            <Text>Popular Movies</Text>
                            <View style={{
                                flexDirection:'row', 
                                flexWrap: 'wrap', 
                                alignItems:'center',
                                }}>
                                <Text style={{ fontFamily: 'PoppinsBold'}}>View All</Text>
                                <MaterialCommunityIcons name='chevron-right' size='20'/>
                            </View>
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
                    <View style={{
                        flexDirection:'row', 
                        justifyContent:'space-between',
                        paddingHorizontal: 20,
                        alignItems:'center',
                        marginVertical: 20,
                        }}>
                            <Text>Recent Movies</Text>
                            <View style={{
                                flexDirection:'row', 
                                flexWrap: 'wrap', 
                                alignItems:'center',
                                }}>
                                <Text style={{ fontFamily: 'PoppinsBold'}}>View All</Text>
                                <MaterialCommunityIcons name='chevron-right' size='20'/>
                            </View>
                    </View>
                    <View style={styles.recentMovieType}>
                        {
                            this.state.recentMovies.map((item, index) => {
                                return index < 6 ? <RecentMovieItem key={item.id} item={item}/> : <View key={item.id}/>
                                
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
        paddingTop: 20,
    },
    header:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    recentMovieType:{
        paddingHorizontal: 20,
    },
    title:{
        fontSize: 26,
        fontWeight:'bold',
    },
});