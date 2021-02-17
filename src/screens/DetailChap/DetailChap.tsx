import React, { FunctionComponent } from 'react';
import { View, StyleSheet, StatusBar, Easing, Animated, ScrollView, RefreshControl } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getListChapter } from './../../api/comic';
import Header from './Header';
import DetailComic from './DetailComic'
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants'
import DescriptComic from './DescriptComic'
import TabScene from './TabScene'
const BACKDROP_HEIGHT = SCREEN_HEIGHT * 0.65;
export const HeaderHeight = SCREEN_HEIGHT / 3
import Background from './Background';
import TitleChapter from './TitleChapter';
import { ChapterItem } from '../../api/interface/chapter.interface';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ListComic from './ListComic';
import { useDispatch, useSelector } from 'react-redux'
import SqlHelper from './../../common/SQLHelper';
import { FetchPostListRequest } from '../../redux/action/InterAction'
import NetWork from '../../components/NetWork';
export type RootStackParamList = {
    DETIAL_COMIC_SCREEN: { item: 'item', id: 'id' };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>




export type DetailChapProps = {
    data: ChapterItem[],
    numberResult: number
}

const DetailChap: FunctionComponent = () => {
    const dispatch = useDispatch()
    const router = useRoute<RootRouteProps<'DETIAL_COMIC_SCREEN'>>();
    const { item, id } = router.params;
    const [page, setPage] = React.useState<string>('1');
    const [loading, setLoading] = React.useState<boolean>(true);
    const [data, setData] = React.useState<DetailChapProps | null>(null);
    const ScaleAnim = React.useRef<any>(new Animated.Value(0)).current;
    const [isFollow, setIsFollow] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const network = useSelector(state => state.internetReducer.isInternet)
    // console.log(network)
    React.useEffect(() => {
        dispatch(FetchPostListRequest())
    }, [])
    const _setLoading = (e: boolean) => {
        setLoading(e)
    }

    const _setPage = (e: string) => {
        setPage(e)
    }

    const _OnUnFollowComic = async () => {
        SqlHelper.unFollowManga(item);
        setIsFollow(false)
    }

    const _OnFollowComic = async () => {
        SqlHelper.addFollowManga(item);
        setIsFollow(true)
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

    const fadeIn = () => {
        if (isFollow) _OnUnFollowComic()
        else _OnFollowComic()
    }

    React.useEffect(() => {
        (async () => {
            fetchData(page)
        })()
        return () => {
            setData(null)
            _setLoading(false)
        }
    }, [page, network])

    React.useEffect(() => {
        SqlHelper.addHistoryManga(item);
        SqlHelper.getFollowManga(item).then((resultFollow: any) => {
            if (resultFollow.length > 0) {
                setIsFollow(true)
            }
        })
        return () => setIsFollow(false)
    }, [])


    const fetchData = async (_page) => {
        _setLoading(true)
        if (network) {
            const result = await getListChapter(parseInt(_page), id, 20)
            if (result?.data?.status == "success") {
                setData({
                    data: result?.data?.data,
                    numberResult: result?.data?.numberResult
                });
                _setLoading(false);
            }
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        setData(null)
        fetchData(1)
        setPage('1')
        setRefreshing(false)
    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar translucent={true} hidden={false} backgroundColor="transparent" />
                <ScrollView
                    style={{ flex: 1 }}
                    stickyHeaderIndices={[4]}
                    scrollEventThrottle={16}
                    refreshControl={
                        <RefreshControl
                            colors={["gray", "orange"]}
                            refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Background {...{ item }} ></Background>
                    <Header></Header>
                    <DetailComic {...{idcomic:data?.data[0]._id, _id: id,fadeIn, item, isFollow }}></DetailComic>
                    <DescriptComic {...{ item }}></DescriptComic>
                    <TitleChapter {...{ data, page, loading, _setPage }}></TitleChapter>
                    {
                        !network ? (
                            <NetWork></NetWork>
                        ) : (
                                <>
                                    <TabScene {...{ _id: id, data, loading }}></TabScene>
                                    <ListComic {...{ network }}></ListComic>
                                </>
                            )
                    }

                </ScrollView>

                <Animated.View style={[styles.love, {
                    transform: [{
                        scale: ScaleAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],

                        })
                    }]
                }]}>
                    <Fontisto style={styles.icon_} name="heart" size={80} color="#e63946" />
                    {/* <Image
                        resizeMode="contain"
                        style={styles.tinyiconheart}
                        source={iconheart}></Image> */}
                </Animated.View>
            </View>
        </>
    )
}

export default React.memo(DetailChap);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    love: {
        position: 'absolute',
        top: '20%',
        left: '40%',
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
})


