import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { SCREEN_WIDTH } from '../../constants'
import * as SCREEN from '../../constants/ScreenTypes';
export const iconload = require('../../assets/image/lf30_editor_czzgl2tr.json');

const SplashScreen = ({_setSplash}) => {
    
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
            <View style={styles.header}>
                <Text style={styles.manga}>MANGA RENDER</Text>
                <View style={styles.tinyicon}>
                    <LottieView
                        source={iconload}
                        autoPlay
                        loop={false}
                        style={{ width: '100%', height: '100%' }}
                        speed={3}
                        onAnimationFinish={()=>{
                            _setSplash(false)
                        }}

                    />
                </View>
            </View>

        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    manga: {
        fontSize: 40,
        fontFamily: 'Nunito-Bold',
        color: '#e3342f'
    },
    tinyicon: {
        width: SCREEN_WIDTH,
        height: 200,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:'45%'
    },
});