import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
export default React.memo(({ _submit }: any) => {


    const [listComic, setListComic] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchall()
            return () => setListComic([])
        }, [])
    )

    const fetchall = () => {
        SqlHelper.GetListSearch()
            .then((result: any) => {
                setListComic(result)
            })
    }
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
    const deleteSearch = () => {
        SqlHelper.DeleteManga()
        fetchall()
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
                        <Ionicons name="trash-outline" size={20}/>
                  
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
    tinyicon:{
        width:44,
        height:44
    }
})
