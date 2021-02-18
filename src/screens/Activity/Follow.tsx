import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import ItemBook from '../../components/ItemBook';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
export const icon = require('../../assets/image/ac2.png');
import Loading from '../../components/Loading';
const Follow = () => {
    const [listComic, setListComic] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [footerLoading, setFooterLoading] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            SqlHelper.GetListFollower(1, 12)
                .then((result: any) => {
                    setListComic([...result]);
                })
            return () => setListComic([])
        }, [])
    )
    const _OnLoadMore = () => {
        if (listComic.length >= 12) {
            setFooterLoading(true);
            SqlHelper.GetListFollower(page + 1, 12)
                .then((result: any) => {
                    console.log(result)
                    setListComic([...listComic, ...result]);
                    setPage(page => page + 1);
                    setFooterLoading(false);
                })
        }
    }
    const _OnFreshList = () => {
        SqlHelper.GetListFollower(1, 12)
            .then((result: any) => {
                setListComic([...result]);
                setPage(1);
            })
    }
    const deleteComic = (i: string) => {

        SqlHelper.unFollowManga(i)
        SqlHelper.GetListFollower(1, 12)
            .then((result: any) => {
                setListComic([...result]);
            })
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return <Loading></Loading>
    }
    return (
        <View style={styles.container}>
            {
                listComic.length == 0 ?
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <Image
                            resizeMode="contain"
                            style={styles.tinyicon}
                            source={icon}></Image>
                        <Text style={{ textAlign: "center", color: '#5c6b73', fontFamily: 'Nunito-Bold' }}>You have not followed any stories</Text>
                    </View> :
                    <View style={styles.containerList}>
                        <FlatList
                            data={listComic}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }: any) => <ItemBook deleteComic={deleteComic} item={JSON.parse(item.category)} index={index} type={3} />

                            }
                            contentContainerStyle={{ justifyContent: "space-between", alignItems: "center" }}
                            onEndReachedThreshold={0.5}
                            refreshing={false}
                            onEndReached={_OnLoadMore}
                            ListFooterComponent={_renderFooterList}
                            onRefresh={_OnFreshList}

                        />
                    </View>
            }
        </View>
    )
}

export default Follow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        height: 50,
        fontFamily: "Nunito-SemiBold",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowRadius: 20,
        elevation: 2
    },
    titleHeader: {
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    containerList: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    tinyicon: {
        width: 180,
        height: 200,
        marginBottom: 10
    },
})
