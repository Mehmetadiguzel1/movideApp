import React, { Component, useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Button, ScrollView  } from "react-native";
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import RecentMovieItem from "../components/RecentMovieItem";

const db = SQLite.openDatabase("movie.db");
export default function Favorite({ navigation, route }) {
const [data, setData] = useState(null);
const [isLoading, setLoading] = useState(true);
const fetchSqliteData = () => {
    db.transaction((tx) => {
        tx.executeSql(
        "SELECT * FROM Favorites",
        null,
        (txObj, { rows: { _array } }) => {
          //console.log(_array);
            setData(_array);
            setLoading(false);
        },
        (txObj, error) => console.error(error)
        );
    });
    };

    useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
        fetchSqliteData();
    });

    return unsubscribe;
    }, [navigation]);

    if (data == null && isLoading) {
    return (
        <SafeAreaView
        style={styles.AppLoading}
        >
        <AppLoading />
        </SafeAreaView>
    );
    } else if (!isLoading) {
    if (data.length == 0) {
        return (
        <SafeAreaView
            style={styles.IsLoading}
        >
            <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="delete-outline" size={30} />
            <View style={{ marginBottom: 5 }} />
            <Text style={styles.nodata}>No Data Found</Text>
            </View>
        </SafeAreaView>
        );
    } else {
        return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Favorite</Text>
            <ScrollView style={{ paddingHorizontal: 20 }}>
            {data.map((item) => {
                const movieDir =
                FileSystem.documentDirectory + "/" + item.movie_id + "/";
                const posterPath = movieDir + "poster_path.jpg";
                const backdropPath = movieDir + "backdrop_path.jpg";
                item.genres =
                typeof item.genres == "string"
                    ? item.genres.split(",")
                    : item.genres;
                item.poster_path = posterPath;
                item.backdrop_path = backdropPath;
                item.id = item.movie_id;
                return <RecentMovieItem key={item.id} item={item} />;
            })}
            </ScrollView>
        </SafeAreaView>
        );
    }
}

    return <View></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        paddingTop: 20,
        backgroundColor: "white",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    title: {
        paddingLeft: 20,
        fontSize: 22.,
        fontWeight:'bold',
    },
    AppLoading:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },
    isLoading: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },
    nodata: {
        fontWeight:'bold',
        fontSize: 16.,
    },
});