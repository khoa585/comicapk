import React, { useState, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { Dimensions, ActivityIndicator, Animated, FlatList, StatusBar } from 'react-native';

const { height, width } = Dimensions.get("window");
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const ImageFullWith = React.memo(({ isSkew, url }: any) => {

    const [heightImage, setHeightImage] = useState<any>((width * 3) / 2);
    // useEffect(() => {
    //     (() => {
    //         Image.getSizeWithHeaders(url, {
    //             Referer: "https://manganelo.com/"
    //         }, (withdata, heightdata) => {
    //             if (heightdata) {
    //                 setHeightImage(width * (heightdata / withdata))
    //             }

    //         }, (error) => { })

    //     })()
    //     return () => setHeightImage((width * 3) / 2.4)
    // }, [])

    return <Image
        indicator={ProgressBar}
        style={{ width: "100%",   backgroundColor:'#fff', height: isSkew ? (width * 3) : heightImage, flex: 1 }}
        source={{
            uri: url,
            headers: {
                Referer: "https://manganelo.com/"
            }
        }}
        resizeMode='contain'
        onError={({ nativeEvent: { error } }) => { console.log(error) }}
    />
})
export default React.memo(ImageFullWith, isEqual)