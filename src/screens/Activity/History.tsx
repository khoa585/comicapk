import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import ItemBook from '../../components/ItemBook';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/Loading';
export const icon = require('../../assets/image/ac2.png');
const History = () => {
    const [listComic, setListComic] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [footerLoading, setFooterLoading] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            fecth()
        }, [])
    )
    const fecth = () => {
        SqlHelper.GetListHistory(1, 12)
            .then((result: any) => {
                setListComic([...result]);
            })
    }
    const _OnLoadMore = () => {
        setFooterLoading(true);
        if (listComic.length >= 12) {
            SqlHelper.GetListHistory(page + 1, 12)
                .then((result: any) => {
                    console.log(result)
                    setListComic([...listComic, ...result]);
                    setPage(page=>page+1);
                    setFooterLoading(false);
                })
        }

    }

    const _OnFreshList = () => {
        SqlHelper.GetListHistory(1, 12)
            .then((result: any) => {
                setListComic([...result]);
            })
    }
    const deleteComic = (i: string) => {
        SqlHelper.DeleteMangaHistory(i)
        fecth()
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return <Loading></Loading>
    }
    return (
        <View style={styles.container}>
            {
                listComic.length === 0 ?
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            style={styles.tinyicon}
                            source={icon}></Image>
                        <Text style={{ textAlign: "center", color: '#5c6b73', fontFamily: 'Nunito-Bold' }}>You are not have history to view</Text>
                    </View> :
                    <View style={styles.containerList}>
                        <FlatList
                            data={listComic}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }: any) => <ItemBook deleteComic={deleteComic} item={JSON.parse(item.category)} index={index} type={3} />}
                            onEndReachedThreshold={1}
                            // contentContainerStyle={{ marginTop: 10 }}
                            ListFooterComponent={_renderFooterList}
                            refreshing={false}
                            onEndReached={_OnLoadMore}
                            onRefresh={_OnFreshList}

                        />
                    </View>
            }
        </View>
    )
}

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerList: {
        flex: 1
    },
    tinyicon: {
        width: 180,
        height: 200,
        marginBottom: 10
    },
})
