import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import { AuthContextProvider } from './src/context/AuthContext';
import { AppContextProvider } from './src/context/AppContext';
import { Navigation } from "./src/navigators/Navigation";

const App = () => {

  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
    Roboto_Light: require('./assets/fonts/Roboto-Bold.ttf'),
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    Montserrat_Bold: require('./assets/fonts/Montserrat-Bold.ttf'),
    Montserrat_Light: require('./assets/fonts/Montserrat-Light.ttf'),

  });

  if (!loaded) { 
    return null;
  }

  return (
    <AuthContextProvider>
      <AppContextProvider>
      <Navigation  /> 
      <ExpoStatusBar style="auto" />
      </AppContextProvider>
    </AuthContextProvider>
  );
};

export default App;
