import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Animated, Easing } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants'
import { formatViews } from '../../common/stringHelper'
import * as SCREEN from '../../constants/ScreenTypes'
import { ItemComicProps } from '../MainHome/MainHome'
export const iconView = require('../../assets/image/a96.png');
export const iconLeft = require('../../assets/image/a4e.png');
export const iconRight = require('../../assets/image/a4f.png');
export const iconheartFollow = require('../../assets/image/a2k.png');
type DetailComicProps = {
    idcomic: any,
    _id: string,
    fadeIn: any
    item: ItemComicProps | any,
    isFollow: boolean
}
const DetailComic: FunctionComponent<DetailComicProps> = ({ idcomic, _id, fadeIn, item, isFollow }) => {

    const navigation = useNavigation();
    const [isDown, setDown] = React.useState<boolean>(false);

    const gradColors = isDown ? ['#4da7db', '#e3342f'] : ['#e3342f', '#e3342f'];

    const showFollow = (): any => (
        isFollow ? (
            <Image
                resizeMode="contain"
                style={styles.tinyiconheart}
                source={iconheartFollow}></Image>
        ) : (
                <EvilIcons name="heart" size={30} color="#FFF" />
            )
    )
    return (
        <View style={styles.conatiner}>
            <View style={styles.containerComic}>

                <View style={styles.container_}>
                    <View style={styles.containerImage}>
                        <Image source={{
                            uri: item.image, headers: {
                                Referer: "https://manganelo.com/"
                            }
                        }}
                            style={styles.img} />
                    </View>
                </View>
                <View style={styles.contai}>
                    <Text style={styles.nameComic}>{item.name}</Text>
                    <Text style={styles.nameAuthor}>{item.author.split(/\n/)}</Text>
                    <View style={styles.action}>
                        <Image
                            resizeMode="contain"
                            style={styles.tinyiconLeft}
                            source={iconLeft}></Image>
                        <TouchableOpacity
                            onPress={fadeIn}
                            activeOpacity={0.8}

                        >
                            <View style={[styles.icon, { backgroundColor:isFollow ? '#fff': "#e3342f" , borderColor: '#e3342f', borderWidth: 1 }]}>
                                {/* <LinearGradient
                                    colors={['#e3342f', '#e3342f']}
                                    useAngle={true}
                                    angle={145}
                                    angleCenter={{ x: 0.5, y: 0.5 }}
                                    style={[styles.icon]}
                                > */}
                                {showFollow()}
                                {/* 
                                </LinearGradient> */}
                            </View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate(SCREEN.DETIAL_CHAPTER, { id: idcomic, idChap: _id })}
                                style={[styles.read]}>
                                <LinearGradient
                                    colors={gradColors}
                                    useAngle={true}
                                    angle={145}
                                    angleCenter={{ x: 0.5, y: 0.5 }}
                                    style={[styles.read]}
                                >
                                    <Text style={styles.txtRead}>READ NOW</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.icon}>
                            <LinearGradient
                                colors={['#e3342f', '#e3342f']}
                                useAngle={true}
                                angle={145}
                                angleCenter={{ x: 0.5, y: 0.5 }}
                                style={[styles.icon]}
                            >
                                <EvilIcons name="comment" size={30} color="#FFF" />
                            </LinearGradient>
                        </View>
                        <Image
                            resizeMode="contain"
                            style={styles.tinyiconLeft}
                            source={iconRight}></Image>
                    </View>
                    <View style={styles.wrap}>
                        <Text style={styles.status}>Status: <Text style={styles.normal}>{item.manga_status === 0 ? 'Continue' : 'Full'}</Text></Text>
                        <View style={styles.wrapViews}>
                            <Image
                                resizeMode="contain"
                                style={styles.tinyLogo}
                                source={iconView}></Image>
                            {/* <EvilIcons name="eye" size={35} color="#e3342f" /> */}
                            <Text style={styles.normal}>{formatViews(item.views)}</Text>
                        </View>
                    </View>
                </View>

            </View>

        </View>
    )
}
export default DetailComic;
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },
    containerComic: {
        flex: 1,
    },
    container_: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 1.7,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 15,
        top: 0,
        position: 'absolute',
        zIndex: 99999,
    },

    img: {
        width: "100%",
        height: "100%",
        borderRadius: 15,

    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 200,
        backgroundColor: '#F92C2C',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2
    },
    contai: {
        marginTop: (SCREEN_WIDTH / 1.7) / 1.45,
        width: '100%',
        borderRadius: 40,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,

    },
    nameAuthor: {
        color: '#000',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 5,
        textAlign: 'center',
        fontFamily: 'Nunito-Bold',
    },
    status: {
        color: '#e3342f',
        fontSize: 15,
        fontFamily: 'Nunito-Bold',
    },
    category: {
        color: '#000',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',
        color: '#5c6b73',
        fontSize: 13,
        fontFamily: 'Nunito-Bold',
        marginLeft: 5
    },
    nameComic: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 80,
        marginHorizontal: 10,
        fontFamily: 'Nunito-Bold',
    },
    wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopColor: '#d6d6d6',
        borderBottomColor: '#d6d6d6'
    },
    wrapViews: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        width: '50%',
        paddingVertical: 10,
        borderColor: '#d6d6d6'
    },
    read: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 2
    },
    txtRead: {
        color: '#fff',
        fontFamily: 'Nunito-Bold',
    },
    love: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 99,
        backgroundColor: 'red'

    },
    icon_: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    tinyLogo: {
        width: 16,
        height: 20,
    },
    tinyiconLeft: {
        width: 40,
        height: 40,
    },
    tinyiconheart: {
        width: 70,
        height: 70,
    }
})
