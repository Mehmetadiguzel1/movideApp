import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default class Favorite extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Favorite Page</Text>
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