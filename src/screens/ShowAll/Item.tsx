import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getListTypeCommic } from './../../api/comic';
import ItemComic from '../../components/ItemComic';
import Loading from '../../components/Loading';
const NUMBER_ITEM_PAGE = 12;
const Item = ({ type }: any) => {
    const [page, setPage] = useState(1);
    const [listComic, setListComic] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [footerLoading, setFooterLoading] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                let result = await getListTypeCommic(page, NUMBER_ITEM_PAGE, type)
                if (result.data.code == 200) {
                    setLoading(false);
                    setListComic(result.data.data);
                }
            } catch (error) {
                setListComic(null)
            }
        })()
        return () => {
            setLoading(true);
            setListComic(null)
        }
    }, [])
    const _onLoadMore = async () => {
        setFooterLoading(true);
        try {
            const result = await getListTypeCommic(page + 1, NUMBER_ITEM_PAGE, type)
            if (result.data.code == 200) {
                setPage(page => page + 1);
                setListComic([...listComic, ...result.data.data]);
                setFooterLoading(false);
            }
        } catch (error) {
            setListComic(null)
        }

    }
    const _onFreshList = async () => {
        setLoading(true);
        try {
            const result = await getListTypeCommic(1, NUMBER_ITEM_PAGE, type)
            if (result.data.code == 200) {
                setPage(1);
                setListComic([...result.data.data]);
                setLoading(false);
            }
        } catch (error) {
            setListComic(null)
        }
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return <Loading></Loading>
    }
    return (
        <View style={styles.container}>
            {
                loading ?
                    <View style={styles.loading}>
                        <Loading></Loading>
                    </View> :
                    <View style={styles.containerItem}>
                        <FlatList

                            data={listComic ? listComic : []}
                            keyExtractor={(item, index) => item._id + index}
                            renderItem={({ item, index }) => <ItemComic item={item} index={index} type={type} />}
                            onEndReachedThreshold={1}
                            onEndReached={_onLoadMore}
                            onRefresh={_onFreshList}
                            refreshing={false}
                            contentContainerStyle={{ justifyContent: "space-between", alignItems: "center", marginTop: 10 }}
                            ListFooterComponent={_renderFooterList}
                        />
                    </View>
            }
        </View>
    )
}
export default React.memo(Item);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        justifyContent: "center"
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
})