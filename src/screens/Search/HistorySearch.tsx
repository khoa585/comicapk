import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
// import * as screen from '../../../constants/ScreenTypes'
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
const items = [
    {
        name: 'Action',
    },
    {
        name: 'Fantasy',
    },
    {
        name: 'Adventure',
    },
    {
        name: 'Drama',
    },
    {
        name: 'Adult',
    },
    {
        name: 'Comedy',
    },
    {
        name: 'Action',
    },
    {
        name: 'Fantasy',
    },
    {
        name: 'Adventure',
    },
    {
        name: 'Drama',
    },
    {
        name: 'Adult',
    },
    {
        name: 'Comedy',
    }
]

export default React.memo(({ _submit }: any) => {


    const [listComic, setListComic] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            SqlHelper.GetListSearch()
                .then((result: any) => {
                    setListComic(result)
                })
            return () => setListComic([])
        }, [])
    )
    const Item = ({ item: { text } }: any): JSX.Element => {
        return (
            <TouchableOpacity
                onPress={() => _submit(text)}
                style={{
                    backgroundColor: '#f1f4eb',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginRight: 5,
                    marginBottom: 10,
                    borderRadius: 5
                }}
                activeOpacity={0.7}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 13,
                    fontFamily: 'Nunito-Bold',
                }}>{text}</Text>
            </TouchableOpacity>
        )
    }
    const deleteSearch = () =>{
        console.log('s')
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.title}>History</Text>
                    <TouchableOpacity
                          onPress={() => deleteSearch()}
                    >
                        <Text style={styles.title}>History</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginVertical: 10 }}>
                    {
                        listComic.map((item, index) => {
                            return <Item item={item} key={index}></Item>
                        })
                    }
                </View>
            </View>
        </>
    );
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
    },

    title: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal',

    },
})
