import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from "react-native";

import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
export default () => {
    const navigation = useNavigation();
    return (
        <View
            style={styles.container}>
            <TouchableOpacity
                style={styles.icon}
                onPress={() => navigation.goBack()}>
                <Entypo name="chevron-thin-left" size={20} color="#fff"></Entypo>
            </TouchableOpacity>
            <Text style={styles.txt}>Search</Text>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#55b9f3',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        top: 20,
        left: 20
    },
    txt: {
        fontSize: 25,
        fontFamily: 'Pacifico-Regular',
        fontWeight: 'normal',
        color: '#fff'
    }
})