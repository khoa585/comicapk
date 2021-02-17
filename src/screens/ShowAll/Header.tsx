import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from './../../constants';
const Header = ({_type}:any) => {

    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.iconback} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.txt}>{
                parseInt(_type) === 0 ? 'Top Manga' : 'New Manga'
            }</Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e3342f',
        paddingTop: STATUS_BAR_HEIGHT + 10,
        backgroundColor: '#e3342f',
        justifyContent: 'center',
    },
    iconback: {
        position: 'absolute',
        top: 35,
        left: 20
    },
    txt: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal',
        color: '#fff'
    }
})