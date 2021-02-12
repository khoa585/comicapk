import React, { FunctionComponent } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { formatViews } from '../../../../common/stringHelper';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../../constants/ScreenTypes';
import isEqual from 'react-fast-compare';
import { RectButton } from 'react-native-gesture-handler';
import { SCREEN_WIDTH } from '../../../../constants'
import { itemProps } from '..'
const Item: FunctionComponent<itemProps> = ({ item }) => {
    const navigation = useNavigation();
    const goToDetialComic = (id: string) => {
        navigation.navigate(SCREEN.DETIAL_COMIC_SCREEN, { item: item, id: id })
    }
    return (
        <RectButton style={styles.container} onPress={() => goToDetialComic(item._id)} >
            <View style={styles.imageLeft}>
                <View style={styles.containerImage}>
                    <Image source={{ uri: item.image }}
                        resizeMode='cover'
                        style={styles.imageRecommend}></Image></View>

            </View>
            <View style={styles.contaiItem}>
                <Text numberOfLines={1} style={styles.nameComic}>{item.name}</Text>
                <View style={styles.inforComic}>
                    <Feather name="eye" size={10} style={{ marginRight: 5 }}></Feather>
                    <Text style={styles.nameChap}> {formatViews(item.views)}</Text>
                </View>
            </View>
        </RectButton>
    )
}
export default React.memo(Item, isEqual)
const styles = StyleSheet.create({
    container: {
        width: ((SCREEN_WIDTH / 2.8)),
        height: (SCREEN_WIDTH * 0.5),
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: Platform.OS === 'android' ? 2 : 1,
        marginBottom: Platform.OS === 'android' ? 1 : 3,
        marginLeft: Platform.OS === 'android' ? 1 : 3,
    },
    imageRecommend: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerImage: {
        width: "90%",
        height: "90%",
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Platform.OS === 'android' ? '#000' : '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: Platform.OS === 'android' ? 3 : 2,
        elevation: Platform.OS === 'android' ? 4 : 1,
    },
    imageLeft: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 2,

    },
    contaiItem: {
        justifyContent: 'space-between',
        height: '20%',
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    nameComic: {

        textAlign: "center",
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom:5
    },
    nameChap: {
        textAlign: "center",
        fontSize: 10
    },
    inforComic: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    }
})