import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'
import Swiper from 'react-native-swiper'
import { SCREEN_WIDTH } from '../../constants/index'
const { height } = Dimensions.get('window');
export default function Slide() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Swiper
                    showsButtons={false}
                    activeDotColor={'#fff'}
                    autoplay={true}
                    autoplayTimeout={5}
                    paginationStyle={{ bottom: 5 }}
                >
                    <View style={styles.slide1}>
                        <Image style={styles.img} source={{ uri: 'http://cn.e.pic.mangatoon.mobi/homepage-banners/642-034f.jpg' }}></Image>
                    </View>
                    <View style={styles.slide2}>
                        <Image style={styles.img} source={{ uri: 'http://cn.e.pic.mangatoon.mobi/homepage-banners/641-58a3.jpg' }}></Image>
                    </View>
                    <View style={styles.slide3}>
                        <Image style={styles.img} source={{ uri: 'http://cn.e.pic.mangatoon.mobi/homepage-banners/577-7b9a.jpg' }}></Image>
                    </View>
                </Swiper>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
    },
    wrapper: {
        height: SCREEN_WIDTH / 3,
        width: SCREEN_WIDTH - 40,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: SCREEN_WIDTH - 40,
        height: "100%",
        resizeMode: 'cover',
        borderRadius: 10
    }
})
