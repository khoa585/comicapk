import React, { FunctionComponent } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Platform, Image, } from 'react-native';
import TabActionBar from './TabActionBar'
import Header from './Header';
import Background from './Background';
import isEqual from 'react-fast-compare';
import ComicHot from './ComicHot';
import { getListTypeCommic } from './../../api/comic';
import Category from './Category';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { useDispatch, useSelector } from 'react-redux'
import { FetchPostListRequest } from '../../redux/action/InterAction'
import NetWork from '../../components/NetWork';

export type ItemComicProps = {
    author: string,
    category: any,
    chapter_update: string,
    chapter_update_count: number,
    commentCount: number,
    createdAt: string,
    description: string,
    devices: any,
    enable: true,
    first_chapter: string,
    image: string,
    last_chapter: string,
    manga_status: number,
    name: string,
    updatedAt: string,
    url: string,
    views: number,
    __v: number,
    _id: string,
}


type listComicProps = {
    listComicHot: ItemComicProps[],
    listComicHUpdate: ItemComicProps[]
}

const MainHome: FunctionComponent = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [listComic, setListComic] = React.useState<listComicProps | null>(null);
    const network = useSelector(state => state.internetReducer.isInternet)
   

    React.useEffect(() => {
        dispatch(FetchPostListRequest())
    }, [])
    React.useEffect(() => {
        (async () => {
            try {

                if (network) {
                    fetchData()
                }

            } catch (error) {
                console.log(error)
            }
        })()
        return () => {
            setListComic(null)
            setRefreshing(false)
            setLoading(false)
        }
    }, [network])

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resultListHot, resultListUpdate] = await Promise.all([getListTypeCommic(1, 10, 0), getListTypeCommic(1, 10, 1)])
            if (resultListHot.data.status === "success" && resultListHot.data.code === 200) {
                setListComic({
                    listComicHot: resultListHot.data?.data,
                    listComicHUpdate: resultListUpdate.data?.data
                })
                setLoading(false);
            }
        } catch (error) {
            setListComic(null)
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        setListComic(null)
        if (network) {
            fetchData()
        }
        setRefreshing(false)
    }

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar hidden={false} translucent={true} backgroundColor="transparent" ></FocusAwareStatusBar>

            <ScrollView
                scrollEventThrottle={1}
                refreshControl={
                    <RefreshControl
                        colors={["gray", "orange"]}
                        refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Header></Header>
                <TabActionBar></TabActionBar>
                {
                    !network ? (
                        <NetWork></NetWork>
                    ) : (
                            <View>
                                <ComicHot {...{ listComic: listComic ? listComic.listComicHot : [], loading, type: 0 }}>Top Manga</ComicHot>
                                <Category {...{network,loading}}></Category>
                                <ComicHot {...{ listComic: listComic ? listComic.listComicHUpdate : [], loading, type: 1 }}>New Manga</ComicHot>
                            </View>
                        )
                }
            </ScrollView>


        </View>
    )
}
export default React.memo(MainHome, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    distant: {
        height: 10,
        backgroundColor: '#ccc7c7',
        marginVertical: 10
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    tinyiconheart: {
        width: 300,
        height: 300,
    }
})