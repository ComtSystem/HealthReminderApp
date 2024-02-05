import { createDrawerNavigator } from '@react-navigation/drawer';
import { View  } from 'react-native';
import FaqScreen from '../screens/FaqScreen';

import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import {COLORS , FONTFAMILY} from '../config/theme/theme';
import { useNavigation } from "@react-navigation/native";
import { MainHeader } from '../common/Headers/MainHeader';
import { DrawerContentComponent } from "../common/Drawers/DrawerContentComponent";
import LoadingScreen from '../screens/LoadingScreen';
import { HeaderScreenGoBack } from '../common/Headers/HeaderScreenGoBack';
import TapNavigatorAuth from './TapNavigatorAuth';
import UserAccountAuth from '../screens/UserAccountAuth';
import AddMedecine from '../screens/AddMedecine';
import AddReminder from '../screens/AddReminder';
import AddFamily from '../screens/AddFamily';
import JoinFamily from '../screens/JoinFamily';
import EditAccountScreen from '../screens/EditAccountScreen';
import MapScreen from '../screens/MapScreen';


const Drawer = createDrawerNavigator();

export const AppAuthNavigator = () => {

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
      component={TapNavigatorAuth}
    />
    
    <Drawer.Screen
      name="UserAccountAuth"
      options={{
        drawerLabel: "Account",
        IconCategory: 'AntDesign',
        iconName: 'user',
      }}
      component={UserAccountAuth}
    />

<Drawer.Screen
        name="FaqScreen"
        component={FaqScreen}
        options={{
          drawerLabel: "Faq",
          IconCategory: 'MaterialCommunityIcons',
          iconName: 'comment-question-outline',
        header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Faq"} />
        }}
        />


    <Drawer.Screen
      name="WhoWeAreScreen"
      component={WhoWeAreScreen}
       options={{
        drawerLabel: "Who We Are",
        IconCategory: 'MaterialCommunityIcons',
        iconName: 'information-outline',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Who we are"} />
      }}
    />
    
    <Drawer.Screen
      name="AddMedecine"
      options={{
        drawerLabel: "AddMedecine",
        IconCategory: 'AntDesign',
        iconName: 'medicinebox',
        header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Add Medecine"} />
      }}
      component={AddMedecine}
    />
    
    <Drawer.Screen
      name="AddReminder"
      options={{
        drawerLabel: "AddReminder",
        IconCategory: 'Ionicons',
        iconName: 'notifications-outline',
        header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Add Reminder"} />
      }}
      component={AddReminder}
    />
      
    

    <Drawer.Screen
      name="AddFamily"
      component={AddFamily}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Add Family"} />
      }}
    />

    <Drawer.Screen
      name="JoinFamily"
      component={JoinFamily}
       options={{
    drawerLabel: '',
    header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Join Family"} />
      }}
    />

      <Drawer.Screen
        name="EditAccountScreen"
        component={EditAccountScreen}
        options={{
        drawerLabel: '',
        header: (props) => <HeaderScreenGoBack navigation={navigation} title={"Edit Account Info"} />
          }}
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

