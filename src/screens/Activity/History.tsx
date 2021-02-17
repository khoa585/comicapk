import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemComic from '../../components/ItemComic';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
const History = () => {
    const [listComic, setListComic] = useState([]);
    const [page, setPage] = useState(1);
    const [footerLoading, setFooterLoading] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            SqlHelper.GetListHistory(1, 12)
                .then(result => {
                    if(result.length != 0){
                        setListComic([...result]);
                        setPage(1);
                    }
                })
        }, [])
    )
    const _OnLoadMore = () => {
        SqlHelper.GetListHistory(page + 1, 12)
            .then(result => {
                setPage(page => page + 1);
                setListComic([...listComic, ...result]);
            })
    }
    const _OnFreshList = () => {
        SqlHelper.GetListHistory(1, 12)
            .then(result => {
                setListComic([...result]);
                setPage(1);
            })
    }
 
    return (
        <View style={styles.container}>
            {
                listComic.length == 0 ?
                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <Text style={{ textAlign: "center" }}>Chưa Có Lịch Sử Xem...</Text>
                    </View> :
                    <View style={styles.containerList}>
                        <FlatList
                            data={listComic}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item, index }) =>  <ItemComic item={JSON.parse(item.category)} index={index} type={3} />
                           
                        }
                            contentContainerStyle={{ justifyContent: "space-between", alignItems: "center" }}
                            onEndReachedThreshold={0.5}
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
        backgroundColor:'#fff'
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
    }
})
