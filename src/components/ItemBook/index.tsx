import React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { formatViews } from '../../common/stringHelper';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/ScreenTypes';
import { RectButton } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');
export const icontop1 = require('../../assets/image/a4d.png');
export const icontop2 = require('../../assets/image/a4g.png');
export const icontop3 = require('../../assets/image/a4h.png');
export const iconView = require('../../assets/image/a96.png');
import SqlHelper from './../../common/SQLHelper';
import Ionicons from 'react-native-vector-icons/Ionicons'
const ItemComic = ({deleteComic, item }:any) => {

    const navigation = useNavigation();
    const goToDetialComic = (id: String) => {
        navigation.navigate(SCREEN.DETIAL_COMIC_SCREEN, { id: id, item: item })
    }

    const showCategory = React.useCallback(() => {
        return item.category.slice(0, 5).map((item, index) => {
            return (
                <Text key={index} style={styles.normal}>{item}</Text>
            )
        })
    }, [])
 
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.contaiItem} onPress={() => goToDetialComic(item._id)} >
                <View style={{ width: '30%', justifyContent: 'flex-start' }}>
                    <Image
                        resizeMode='stretch'
                        source={{
                            uri: item.image, headers: {
                                Referer: "https://manganelo.com/"
                            }
                        }} style={styles.imageRecommend}></Image>
                </View>
                <View style={{ width: '70%', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Text numberOfLines={2} style={styles.nameComic}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                        <Image
                            resizeMode="contain"
                            style={styles.tinyLogo}
                            source={iconView}></Image>
                        <Text style={styles.nameChap}> {formatViews(item.views)}</Text>
                    </View>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                        {showCategory()}
                    </View>
                </View>

            </TouchableOpacity>
            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => deleteComic(item._id)}
                >
                     <Ionicons name="trash-outline" size={20}/>

                </TouchableOpacity>
            </View>
        </View>
    )
}
export default React.memo(ItemComic)
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contaiItem: {
        height: (width * 0.35),
        marginBottom: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        width: '90%'
    },
    imageRecommend: {
        width: "100%",
        height: "100%",
    },
    nameComic: {
        paddingVertical: 0,
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
    },
    nameChap: {
        fontSize: 10,
        fontFamily: 'Nunito-Bold',
        color: '#5c6b73'
    },
    tinyiconLeft: {
        width: 45,
        height: 45,
    },
    category: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',
        color: '#5c6b73',
        backgroundColor: '#f1f4eb',
        paddingVertical: 5,
        fontSize: 11,
        paddingHorizontal: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 5
    },
    tinyLogo: {
        width: 16,
        height: 20,
    },
})