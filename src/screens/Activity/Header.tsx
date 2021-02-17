import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from './../../constants';
const Header = ({ type }: any) => {

    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 25, fontFamily: 'Nunito-Bold',color:'#fff' }}>Bookcase</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop:STATUS_BAR_HEIGHT,
        backgroundColor: '#55b9f3',
    }
})