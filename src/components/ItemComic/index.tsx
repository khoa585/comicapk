import React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { formatViews } from '../../common/stringHelper';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/ScreenTypes';
const { width } = Dimensions.get('window');
const ItemComic = ({ item }) => {
    const navigation = useNavigation();
    const goToDetialComic = (id: String) => {
        navigation.navigate(SCREEN.DETIAL_COMIC_SCREEN, { id: id, item: item })
    }
    return (
        <TouchableOpacity style={styles.contaiItem} onPress={() => goToDetialComic(item._id)} >
            <View style={{ justifyContent: 'center', height: '70%', marginBottom: 10 }}>
                <Image source={{
                    uri: item.image, headers: {
                        Referer: "https://manganelo.com/"
                    }
                }} style={styles.imageRecommend}></Image>
            </View>
            <View style={{ justifyContent: 'space-between', height: '25%', marginHorizontal: 10, }}>
                <Text numberOfLines={2} style={styles.nameComic}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                    <Feather name="eye" size={10} style={{ marginRight: 5 }}></Feather>
                    <Text style={styles.nameChap}> {formatViews(item.views)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default React.memo(ItemComic)
const styles = StyleSheet.create({
    contaiItem: {
        width: (width / 3) - 5,
        height: (width * 0.6),
        marginBottom: 5,
        paddingVertical: 2,
        paddingHorizontal: 5
    },
    imageRecommend: {
        resizeMode: "stretch",
        width: "100%",
        height: "100%",
        borderRadius: 5,

    },
    nameComic: {
        paddingVertical: 0,
        textAlign: "center",
        fontSize: 12
    },
    nameChap: {
        textAlign: "center",
        fontSize: 10
    }
})