import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import StackNavigator from "./src/navigators/StackNavigator";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/reducers/configureStore";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  useEffect(() => {
    changeNavigationBarColor("#000000", false, false);
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StackNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
