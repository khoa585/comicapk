import React from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from "react-native";

import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from '../../constants'
export default () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Search</Text>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3342f',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingTop: STATUS_BAR_HEIGHT + 10,
    },
    txt: {
        fontSize: 25,
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal',
        color: '#fff'
    }
})