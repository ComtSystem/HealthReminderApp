import { createDrawerNavigator } from '@react-navigation/drawer';
import { View  } from 'react-native';
import TabNavigator from './TabNavigator';
import UserAccountScreen from '../screens/UserAccountScreen';
import SignupScreen from '../screens/SignupScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import {COLORS , FONTFAMILY} from '../config/theme/theme';
import { useNavigation } from "@react-navigation/native";
import { MainHeader } from '../common/Headers/MainHeader';
import { DrawerContentComponent } from "../common/Drawers/DrawerContentComponent";
import LoadingScreen from '../screens/LoadingScreen';
import { HeaderScreenGoBack } from '../common/Headers/HeaderScreenGoBack';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountOptions from '../screens/CreateAccountOptions';


const Drawer = createDrawerNavigator();

export const AppNavigator = () => {

  let navigation = useNavigation();

  return (
    <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: COLORS.White,
          inactiveTintColor: COLORS.White,
          activeBackgroundColor: 'transparent',
          inactiveBackgroundColor: 'transparent',
        }}
        initialRouteName="Home"
        drawerContent={
          (props) => {
            return (
              <DrawerContentComponent props={props} />
            )
          }
        }
     screenOptions={{
      header: (props) => <MainHeader {...props} />,
      drawerStyle: {
        backgroundColor: COLORS.BlackTheme,
        width: 235,
      },
      headerStyle: {
        backgroundColor: COLORS.BlackTheme,
      },
      headerTintColor: COLORS.BlackTheme,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      drawerLabelStyle: {
        color: COLORS.White,
        fontFamily: FONTFAMILY.secondary
      },
      drawerPosition: "left", 
      }}
    >

<Drawer.Screen
      name="Home"
      options={{
        drawerLabel: "Home",
        title: "Home",
        IconCategory: 'Octicons',
        iconName: 'home',
       
      }}
      component={TabNavigator}
    />
    


    <Drawer.Screen
      name="Account"
      options={{
        drawerLabel: "Account",
        IconCategory: 'AntDesign',
        iconName: 'user',
        
      }}
      component={UserAccountScreen}
    />

<Drawer.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Create Account"} />
      }}
    />

<Drawer.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Login"} />
      }}
    />


     
<Drawer.Screen
      name="FaqScreen"
      component={FaqScreen}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Faq"} />
      }}
    />

    <Drawer.Screen
      name="ContactUsScreen"
      component={ContactUsScreen}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"contact Us"} />
      }}
    />

    <Drawer.Screen
      name="WhoWeAreScreen"
      component={WhoWeAreScreen}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Who we are"} />
      }}
    />


    <Drawer.Screen
      name="AccountOptions"
      options={{
        drawerLabel: '',
          }}
      component={CreateAccountOptions}
    />

    <Drawer.Screen
      name="Loading"
      options={{
        drawerLabel: '',
        header: (props) => <View />
          }}
      component={LoadingScreen}
    />
   
  
  </Drawer.Navigator>
  );
};

