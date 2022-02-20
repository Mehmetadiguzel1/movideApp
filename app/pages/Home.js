import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Movie from '../models/Movie';
export default class Home extends Component {
    _isMount = false;

    state = {
        isLoading: false,
        recentMovie:[],
        popularMovies: [],

    };

    componentDidMount() {
        this._isMount = true;

        return fetch('https://api.themoviedb.org/3/movie/popular?api_key=def30dcb6753a6abdcf8682057b1ed85')
        .then((response) => response.json())
        .then((responseJson) => {
            const data = [];
            responseJson.results.forEach((movie) => {
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
                {
                    this.state.popularMovies.map((item) =>{
                        return(
                            <Text key={item.id}>{item.title}</Text>
                        )
                    })
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});