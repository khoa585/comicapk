import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
const { width } = Dimensions.get("window");
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CategoryPage from './CategoryPage';
import { getListCategory } from './../../api/category';
import { STATUS_BAR_HEIGHT } from '../../constants'
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
const items = [
    {
        name: 'Action',
    },
    {
        name: 'Fantasy',
    },
    {
        name: 'Adventure',
    },
    {
        name: 'Drama',
    },
    {
        name: 'Adult',
    },
    {
        name: 'Comedy',
    },
    {
        name: 'Romance',
    },
    {
        name: 'Manhua',
    },
    {
        name: 'Webtoons',
    },
    // {
    //     name: 'Hero',
    // },
    // {
    //     name: 'Hunter',
    // },
    // {
    //     name: 'Dragon',
    // },
    // {
    //     name: 'Master',
    // },
    // {
    //     name: 'Psychological',
    // },

]
export type RootStackParamList = {
    CATEGORY_SCREEN: { _index: 'index' };
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
const ListCategory = () => {
    const router = useRoute<RootRouteProps<'CATEGORY_SCREEN'>>();
    const [index, setIndex] = React.useState<number>(0);
    const renderScene = ({ route }) => {
        return <CategoryPage type={route?.key} />
    };

    useFocusEffect(
        React.useCallback(() => {
            if (router.params) {
                setIndex(parseInt(router.params._index))
            }
            return () => setIndex(0)
        }, [router.params?._index])

    )

    // useEffect(() => {
    //     getListCategory().then(result => {
    //         if (result.data.status == "success") {
    //             console.log(result)
    //             let listCategory = result.data.data.map(item => item.name);
    //             setListPage([...listCategory]);
    //             setLoading(false);
    //         }
    //     })
    // }, [])

    const _renderLabel = ({ route, focused, color }) => {
        if (focused) {
            return <Text style={styles.labelStyleActive}>{route.title.toUpperCase()}</Text>
        }
        return <Text style={styles.labelStyle}>{route.title.toUpperCase()}</Text>
    }
    return (
        <View style={styles.container}>
            <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
            <TabView
                initialLayout={{ width: Dimensions.get('window').width }}
                lazy={true}
                // scrollEnabled={true}
                navigationState={{ index, routes: items.map(item => { return { key: item.name, title: item.name } }) }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazyPreloadDistance={1}
                style={{ backgroundColor: "#fff", marginTop: STATUS_BAR_HEIGHT }}
                renderTabBar={props => {
                    return (
                        <TabBar
                            {...props}
                            tabStyle={{ minHeight: 20, backgroundColor: "#4da7db", width: 'auto', padding: 0, margin: 0 }}
                            scrollEnabled={true}
                            renderLabel={_renderLabel}
                            style={{
                                shadowOffset: { height: 0, width: 0 },
                                shadowColor: 'transparent',
                                shadowOpacity: 0,
                                elevation: 1
                            }}
                        />
                    )
                }}
            />
        </View>
    )
}

export default ListCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#4da7db",
    },
    header: {
        fontFamily: "Brygada1918-Medium",
        borderBottomWidth: 0.5,
        paddingVertical: 13,
        //borderBottomColor:"#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 10,
        elevation: 1
    },
    labelStyle: {
        fontSize: 12,
        color: "#fff",
        fontFamily: "Brygada1918-Medium",
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: "white",

    },
    labelStyleActive: {
        fontSize: 12,
        color: "#fff",
        fontFamily: "Brygada1918-Medium",
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#4da7db",
    }
})
