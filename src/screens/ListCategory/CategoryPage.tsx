import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { getListByCategorySortViews } from './../../api/comic';
import ItemComic from '../../components/ItemComic';
const NUMBER_ITEM_PAGE = 12;
const CategoryPage = ({ type }) => {
    const [page, setPage] = useState(1);
    const [listComic, setListComic] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [footerLoading, setFooterLoading] = useState(false);
    useEffect(() => {
        getListByCategorySortViews(page, NUMBER_ITEM_PAGE, type)
            .then(result => {
                if (result.data.code == 200) {
                    setLoading(false);
                    setListComic(result.data.data);
                }
            })
        return () => {
            setLoading(true);
            setListComic(null)
        }
    }, [])
    const _onLoadMore = () => {
        setFooterLoading(true);
        getListByCategorySortViews(page + 1, NUMBER_ITEM_PAGE, type)
            .then(result => {
                if (result.data.code == 200) {
                    setPage(page => page + 1);
                    setListComic([...listComic, ...result.data.data]);
                    setFooterLoading(false);
                }
            })
    }
    const _onFreshList = () => {
        setLoading(true);
        getListByCategorySortViews(1, NUMBER_ITEM_PAGE, type)
            .then(result => {
                if (result.data.code == 200) {
                    setPage(1);
                    setListComic([...result.data.data]);
                    setLoading(false);
                }
            })
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return (
            <View style={{ paddingVertical: 20, backgroundColor: "#CEDOCE" }}>
                <ActivityIndicator size="small" color="#000" animating />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {
                loading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="small" color="#000" />
                    </View> :
                    <View style={styles.containerItem}>
                        <FlatList
                            numColumns={3}
                            data={listComic ? listComic : []}
                            keyExtractor={(item, index) => item._id + index}
                            renderItem={({ item }) => <ItemComic item={item} />}
                            onEndReachedThreshold={1}
                            onEndReached={_onLoadMore}
                            onRefresh={_onFreshList}
                            refreshing={false}
                            contentContainerStyle={{ justifyContent: "space-between", alignItems: "center" }}
                            ListFooterComponent={_renderFooterList}
                        />
                    </View>
            }
        </View>
    )
}
export default React.memo(CategoryPage);
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
        paddingTop: 5
    }
})