import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  BackHandler,
  ToastAndroid,
  Alert
} from 'react-native';
import Navigation from './src/navigations';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store'
import SplashScreen from './src/screens/SplashScreen/SplashScreen';

const App = () => {
  const [isSplash, setSplash] = React.useState(true)
  const [backClickCount, setbackClickCount] = React.useState(0)
  const _setSplash = (e) => {
    setSplash(e)
  }
  React.useEffect(() => {
    const backAction = () => {
      backClickCount === 1 ? BackHandler.exitApp() : (
        setbackClickCount(() => {
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT)
          return 1
        })

      )
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove()
      setbackClickCount(1)
    };
  }, [backClickCount]);
  console.log(backClickCount)
  if (isSplash) {
    return (
      <SplashScreen {...{ _setSplash }}></SplashScreen>
    )
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <StatusBar backgroundColor='#DBDFEF' />
            <SafeAreaView style={styles.container}>
              <Navigation></Navigation>
            </SafeAreaView>
          </View>
        </PersistGate>
      </Provider>
    );
  }

};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
