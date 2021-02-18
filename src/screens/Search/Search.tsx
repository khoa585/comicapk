import React from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import Header from './Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Category from './Category'
import HistorySearch from './HistorySearch';
import { searchComicByName } from './../../api/comic';
import { useNavigation } from '@react-navigation/native';
import SearchItem from './SearchItem'
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import { FetchPostListRequest } from '../../redux/action/InterAction'
import NetWork from '../../components/NetWork';
import SqlHelper from './../../common/SQLHelper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
export const iconClose = require('../../assets/image/z1.png');
const Search = () => {
    const dispatch = useDispatch()
    const network = useSelector(state => state.internetReducer.isInternet)
    const navigation = useNavigation();
    let [value, onChangeText] = React.useState<String | any>('')
    const [loading, setLoading] = React.useState<any>(false);
    const [listComic, setListComic] = React.useState<any>([]);
    let submit = async (nativeEvent) => {
        if (nativeEvent === "") {
            return null;
        }
        onChangeText(nativeEvent.text)
        setLoading(true);
        try {
            SqlHelper.addSearchManga(nativeEvent.text)
            const result = await searchComicByName(1, 10, nativeEvent.text)
            if (result.data.code == 200 || result.data.status == "success") {
                setListComic([...result.data.data]);
                setLoading(false);

            }
        } catch (error) {
            setListComic([])
        }
    }

    let _submit = async (e) => {
        setLoading(true);
        onChangeText(e)
        const result = await searchComicByName(1, 10, e)
        try {
            if (result.data.code == 200 || result.data.status == "success") {
                setListComic([...result.data.data]);
                setLoading(false);

            }
        } catch (error) {
            setListComic([])
        }
    }
    React.useEffect(() => {
        dispatch(FetchPostListRequest())
    }, [])

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar hidden={false} translucent={true} backgroundColor="transparent" ></FocusAwareStatusBar>
            <Header></Header>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.contaiSearch}>
                    <Ionicons style={{ padding: 5 }} name="search-outline" size={25} color="#000" />
                    <TextInput
                        underlineColorAndroid='transparent'
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        multiline
                        blurOnSubmit
                        onSubmitEditing={({ nativeEvent }) => submit(nativeEvent)}
                        style={{ flex: 1, paddingVertical: 5, fontFamily: 'Nunito-Bold', }} placeholder="Search"></TextInput>
                    {
                        value !== '' ? (
                            <TouchableOpacity
                                onPress={() => onChangeText('')}
                            >
                                <MaterialCommunityIcons style={{ padding: 5 }} name="close-outline" size={15} color="#000" />
                            </TouchableOpacity>
                        ) : null
                    }

                </View>
                <TouchableOpacity
                    style={{ width: '20%' }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ textAlign: 'center', fontFamily: "Nunito-SemiBold", }}>Cancelar</Text>
                </TouchableOpacity>
            </View>
            {
                value === "" ? (
                    <View>
                        <Category></Category>
                        <HistorySearch {...{ _submit }}></HistorySearch>
                    </View>
                ) : null
            }
            {
                value != "" ?
                    < View style={{ marginTop: 4, flex: 1, paddingTop: 10 }}>
                        {loading ?
                            <View style={{ flex: 1, paddingTop: 15 }}>
                                <Loading></Loading>
                            </View> :
                            <View style={{ flex: 1 }}>
                                {
                                    !network ? (
                                        <NetWork></NetWork>
                                    ) : (
                                            listComic.length === 0 ?
                                                <View>
                                                    <Text style={{ textAlign: "center", fontFamily: 'Nunito-Bold' }}>Không Có Kết Quả Tìm Kiếm</Text>
                                                </View>
                                                :
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    showsVerticalScrollIndicator={false}
                                                    data={listComic}
                                                    keyExtractor={(item, index) => item._id + index}
                                                    renderItem={({ item }) => <SearchItem data={item} />}
                                                    onEndReachedThreshold={1}
                                                // onEndReached={_onLoadMore}
                                                // ListFooterComponent={_renderFooterList}
                                                />)
                                }
                            </View>
                        }
                    </View>
                    : null
            }
        </View >
    );
}
export default React.memo(Search, isEqual)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,

    },
    title: {
        fontSize: 18,
        margin: 20,
        textAlign: 'center'
    },
    contaiSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f1f4eb',
        marginVertical: 10,
        borderRadius: 5,
        width: '80%'
    },
})