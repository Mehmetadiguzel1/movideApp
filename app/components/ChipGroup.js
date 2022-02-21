import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ChipGroup(props) {
    return (
        <View style={styles.itemGroup}>
            {
                props.datas.map((item, index) => {
                    return(<View style={styles.chipItem} key={index}>
                        <Text style={{color: "#FE9901"}}>{item}</Text>
                    </View>)
                })
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    itemGroup:{
        flexDirection:"row",

    },
    chipItem:{
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 16,
    }
})