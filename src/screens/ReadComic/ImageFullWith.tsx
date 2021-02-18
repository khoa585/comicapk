import React, { useState, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { Dimensions, ActivityIndicator, Animated, FlatList, StatusBar } from 'react-native';
import { Image as ImageRN } from 'react-native';
const { height, width } = Dimensions.get("window");
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const ImageFullWith = React.memo(({ isSkew, url }: any) => {

    const [heightImage, setHeightImage] = useState<any>(null);
    useEffect(() => {
        (() => {
            ImageRN.getSizeWithHeaders(url, {
                Referer: "https://manganelo.com/"
            }, (withdata, heightdata) => {
                if (heightdata) {
                    setHeightImage(width * (heightdata / withdata))
                }

            }, (error) => { })

        })()
        return () => setHeightImage(null)
    }, [])

    return <Image
        indicator={ProgressBar}
        indicatorProps={{
            size: 80,
            borderWidth: 0,
            color: '#e3342f',
            unfilledColor: 'rgba(200, 200, 200, 0.2)',

        }}
        style={{ width: "100%", backgroundColor: '#fff', height: isSkew ? (width * 3) : !heightImage ? (width * 3) / 2 : heightImage, flex: 1, zIndex: 999 }}
        source={{
            uri: url,
            headers: {
                Referer: "https://manganelo.com/"
            }
        }}
        onError={({ nativeEvent: { error } }) => { console.log(error) }}
    />
})
export default React.memo(ImageFullWith, isEqual)