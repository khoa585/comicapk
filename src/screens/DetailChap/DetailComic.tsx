import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Animated, Easing } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants'
import { formatViews } from '../../common/stringHelper'
import { ItemComicProps } from '../MainHome/MainHome'

type DetailComicProps = {
    item: ItemComicProps | any
}
const DetailComic: FunctionComponent<DetailComicProps> = ({ item }) => {

    const navigation = useNavigation();
    const [isDown, setDown] = React.useState<boolean>(false);
    const ScaleAnim = React.useRef<any>(new Animated.Value(0)).current;
    const gradColors = isDown ? ['#4da7db', '#D8090D'] : ['#D8090D', '#e85356'];
    const fadeIn = () => {

        const a1 = Animated.timing(ScaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.bounce
        })
        const a13 = Animated.timing(ScaleAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.bounce
        })
        Animated.sequence([a1, a13]).start()
    }
    return (
        <View style={styles.conatiner}>
            <View style={styles.containerComic}>
                <Header></Header>
                <View style={styles.container_}>
                    <View style={styles.containerImage}>
                        <Image source={{ uri: item.image }}
                            style={styles.img} />
                    </View>
                </View>
                <View style={styles.contai}>
                    <Text style={styles.nameComic}>{item.name}</Text>
                    <Text style={styles.nameAuthor}>{item.author.split(/\n/)}</Text>
                    <View style={styles.action}>
                        <TouchableOpacity
                            onPress={fadeIn}
                        >
                            <View style={styles.icon}>
                                <LinearGradient
                                    colors={['#D8090D', '#e85356']}
                                    useAngle={true}
                                    angle={145}
                                    angleCenter={{ x: 0.5, y: 0.5 }}
                                    style={[styles.icon]}
                                >
                                    <EvilIcons name="heart" size={30} color="#FFF" />
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity style={[styles.read]}>
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
                                colors={['#D8090D', '#e85356']}
                                useAngle={true}
                                angle={145}
                                angleCenter={{ x: 0.5, y: 0.5 }}
                                style={[styles.icon]}
                            >
                                <EvilIcons name="comment" size={30} color="#FFF" />
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={styles.wrap}>
                        <Text style={styles.status}>Status: <Text style={styles.normal}>{item.manga_status === 0 ? 'Continue' : 'Full'}</Text></Text>
                        <View style={styles.wrapViews}>
                            <EvilIcons name="eye" size={35} color="#D8090D" />
                            <Text style={styles.normal}>{formatViews(item.views)}</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Animated.View style={[styles.love, {
                    transform: [{
                        scale: ScaleAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],

                        })
                    }]
                }]}>

                    <Fontisto style={styles.icon_} name="heart" size={80} color="#fff" />

                </Animated.View>
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
    },
    status: {
        color: '#D8090D',
        fontSize: 15,
        fontWeight: 'bold',
    },
    category: {
        color: '#000',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',
        color: '#000',
        fontSize: 14,
    },
    nameComic: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 80,
        marginHorizontal: 10
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
        color: '#fff'
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
    }
})
