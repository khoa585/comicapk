
import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../constants/ScreenTypes'
import { SCREEN_WIDTH } from '../../../constants'
const Item: FunctionComponent<any> = ({ item, id }) => {
    const navigation = useNavigation<any>();
    return (
        <View style={{
            borderBottomWidth: 1,
            borderColor: '#d6d6d6',
        }}>
            <RectButton key={item._id}
                onPress={() => navigation.navigate(SCREEN.DETIAL_CHAPTER, { id: item._id, idChap: id })}
                style={{ paddingVertical: 10, paddingHorizontal: 20 }}
            >
                <View style={styles.Chapter_}>
                    <Text style={styles.name} >Chapter {item.index}</Text>
                    <Text style={{ fontSize: 13, fontFamily: 'Nunito-Bold', color: '#5c6b73', }}>{item.createdAt.split(/T.*/)[0]}</Text>
                </View>
            </RectButton>
        </View>
    );
};
export default React.memo(Item, isEqual)

const styles = StyleSheet.create({
    name: {
        fontSize: 14,
        color: '#5c6b73',
        fontFamily: 'Nunito-Bold',
    },
    Chapter_: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',



    },
    loading: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTitl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#5bc6ff',
    },
})


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 15,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        margin: 0,
        paddingRight: 0, // to ensure the text is never behind the icon
    },

});