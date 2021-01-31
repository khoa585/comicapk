
import React from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { DetailChapProps } from './DetailChap'
type itemProps = {
    commentCount: number
    createdAt: string
    index: number
    name: string
    __v: number
    _id: string
}

type TabSceneProps = {
    data: DetailChapProps | null,
    loading: boolean,
}

const TabScene = ({ data, loading }: TabSceneProps) => {


    return (
        <View style={[styles.container]}>
            {
                loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) :
                    data?.data.map((item: itemProps, _: number) => {
                        return (
                            <RectButton key={item._id} >
                                <View style={styles.Chapter_}>
                                    <Text style={styles.name} >Chapter {item.index}</Text>
                                    <Text>{item.createdAt.split(/T.*/)[0]}</Text>
                                </View>
                            </RectButton>
                        )
                    })
            }
        </View>
    );
};
export default React.memo(TabScene,isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    name: {
        fontSize: 16,
        color: '#5c6b73'
    },
    Chapter_: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#D4D1FA',
        padding: 20,
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
        borderColor: '#D4D1FA',
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