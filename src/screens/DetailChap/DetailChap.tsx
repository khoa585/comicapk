import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, StatusBar, ActivityIndicator, Animated, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getDetialComic, getListChapter } from './../../api/comic';
import * as screen from './../../constants/ScreenTypes';
import { TabView, TabBar } from 'react-native-tab-view';
import Header from './Header';
import DetailComic from './DetailComic'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants'
import DescriptComic from './DescriptComic'
import TabScene from './TabScene'
import { TouchableOpacity } from 'react-native-gesture-handler';
const BACKDROP_HEIGHT = SCREEN_HEIGHT * 0.65;
export const HeaderHeight = SCREEN_HEIGHT / 3
import LinearGradient from 'react-native-linear-gradient';
import Background from './Background';
import TitleChapter from './TitleChapter';
import { ChapterItem } from '../../api/interface/chapter.interface';

export type RootStackParamList = {
    DETIAL_COMIC_SCREEN: { item: 'item', id: 'id' };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>

export type RouterProps = {
    route: {
        key: string,
        title: string
    }
}

// export type ItemProps = {
//     commentCount: number,
//     createdAt: string,
//     index: number,
//     name: string,
//     __v: number,
//     _id: string,
// }

export type DetailChapProps = {
    data: ChapterItem[],
    numberResult: number
}

const DetailChap: FunctionComponent = () => {

    const router = useRoute<RootRouteProps<'DETIAL_COMIC_SCREEN'>>();
    const { item, id } = router.params;
    const [page, setPage] = React.useState<string>('1');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<DetailChapProps | null>(null);

    const _setLoading = (e: boolean) => {
        setLoading(e)
    }
    const _setPage = (e: string) => {
        setPage(e)
    }

    React.useEffect(() => {
        (async () => {
            _setLoading(true)
            const result = await getListChapter(parseInt(page), id, 20)
            if (result?.data?.status == "success") {
                setData({
                    data: result?.data?.data,
                    numberResult: result?.data?.numberResult
                });
                _setLoading(false);
            }
        })()
        return () => setData(null)
    }, [page])

    return (
        <>
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <ScrollView
                    style={{ flex: 1 }}
                    stickyHeaderIndices={[3]}
                >
                    <Background {...{ item }} ></Background>
                    <DetailComic {...{ item }}></DetailComic>
                    <DescriptComic {...{ item }}></DescriptComic>
                    <TitleChapter {...{ data, page, loading, _setPage }}></TitleChapter>
                    <TabScene {...{ _id: id, data, loading }}></TabScene>
                </ScrollView>
            </View>
        </>
    )
}

export default React.memo(DetailChap);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})


