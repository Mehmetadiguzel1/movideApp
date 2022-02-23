import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// Movie type Chips group
export default function ChipGroup(props) {
    return (
        <View style={styles.itemGroup}>
            {
                props.datas.map((item, index) => {
                    return(<View style={styles.chipItem} key={index}>
                        <Text style={styles.textItems}>{item}</Text>
                    </View>)
                })
            }
            
        </View>
    )
}

const styles = StyleSheet.create({

    itemGroup:{
        flexDirection:"row",
        flexWrap: "wrap",
    
    },
    textItems:{
        color: "#FE9901"
    },
    chipItem:{
        backgroundColor: "#333",
        borderColor:'orange',
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        marginTop: 5,
        borderRadius: 16,
    }
})