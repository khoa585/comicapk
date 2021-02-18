import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import Navigation from './src/navigations';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, [])
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
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
