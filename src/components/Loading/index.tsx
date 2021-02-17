import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import { iconload } from '../../constants'
import LottieView from 'lottie-react-native';


const Loading: FunctionComponent = () => {
    return (
        <View style={styles.loading}>
            <LottieView
                source={iconload}
                autoPlay
                loop={true}
                style={styles.tinyiconLeft}
                speed={1.5}
            
            />
            {/* <Image
                resizeMode="contain"
                style={styles.tinyiconLeft}
                source={iconload}></Image> */}
        </View>
    );
};
export default React.memo(Loading, isEqual)

const styles = StyleSheet.create({
    loading: {
        alignItems:'center',
        justifyContent:'center',
    },
    tinyiconLeft: {
        width: 40,
        height: 40,
    },
})
