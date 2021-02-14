
import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { DetailChapProps } from './DetailChap'
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../constants/ScreenTypes'
type itemProps = {
    commentCount: number
    createdAt: string
    index: number
    name: string
    __v: number
    _id: string
}

type TabSceneProps = {
    _id: string,
    data: DetailChapProps | null,
    loading: boolean,
}

const TabScene: FunctionComponent<TabSceneProps> = ({ _id, data, loading }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.container]}>
            {
                loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="small" color="#000" />
                    </View>
                ) :
                    data?.data.length === 0 ? <Text style={{
                        textAlign:'center',
                        paddingVertical:10,
                        fontFamily: 'Brygada1918-Regular',
                    }}>updating...</Text> : data?.data.map((item: itemProps, _: number) => {
                        return (
                            <RectButton key={item._id}
                                onPress={() => navigation.navigate(SCREEN.DETIAL_CHAPTER, { id: item._id, idChap: _id })}
                            >
                                <View style={styles.Chapter_}>
                                    <Text style={styles.name} >Chapter {item.index}</Text>
                                    <Text style={{ fontFamily: 'Brygada1918-Medium' }}>{item.createdAt.split(/T.*/)[0]}</Text>
                                </View>
                            </RectButton>
                        )
                    })

            }
        </View>
    );
};
export default React.memo(TabScene, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    name: {
        fontSize: 16,
        color: '#5c6b73',
        fontFamily: 'Brygada1918-Medium'
    },
    Chapter_: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
        padding: 20,
    },
    loading: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTitl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
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