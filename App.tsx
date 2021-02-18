import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  BackHandler,
  ToastAndroid,
  Platform
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
  let currentCount = 0;
  const useDoubleBackPressExit = (
    exitHandler: () => void
  ) => {
    if (Platform.OS === "ios") return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (currentCount === 1) {
        exitHandler();
        subscription.remove();
        return true;
      }
      backPressHandler();
      return true;
    });
  };

  const backPressHandler = () => {
    if (currentCount < 1) {
      currentCount += 1;
      ToastAndroid.show("Press again to close!", ToastAndroid.SHORT);
    }
    setTimeout(() => {
      currentCount = 0;
    }, 2000);
  };
  React.useEffect(() => {
    useDoubleBackPressExit(BackHandler.exitApp)
  }, [])
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
