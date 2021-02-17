import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { STATUS_BAR_HEIGHT } from '../../constants'
import History from './History';
import Follow from './Follow';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from './Header'
const FirstRoute = () => (
    <History></History>

);
const SecondRoute = () => (
    <Follow></Follow>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'History' },
        { key: 'second', title: 'Follow' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FocusAwareStatusBar hidden={false} translucent={true} backgroundColor="transparent" />
            <Header></Header>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={initialLayout}
            />
        </View>
    );
}

const renderTabBar = props => (
    <TabBar
        {...props}
        renderLabel={({ route, focused, color }) => (
            <Text style={{ color, fontFamily: 'Nunito-Bold', fontSize: 18 }}>
                {route.title}
            </Text>
        )}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#55b9f3' }}
    />
);
