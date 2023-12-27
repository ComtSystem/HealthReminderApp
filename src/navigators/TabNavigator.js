import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View  } from 'react-native';
import { COLORS, FONTSIZE } from '../config/theme/theme';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeMustLogin from '../screens/HomeMustLogin';
import UserAccountScreen from '../screens/UserAccountScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {


  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {

         backgroundColor: '#262630',
          borderTopWidth: 0,
          height: 70,
        },
        tabBarItemStyle: {
          paddingHorizontal: 40,
          marginTop: 25,
          borderRadius: 10,
        }
      }}
    >

      <Tab.Screen
        name="HomeMustLogin"
        component={HomeMustLogin}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.PrimaryColor } : {},
                ]}
              >
                <Octicons
                  name="home"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
              </View>
            );
          },
        }}
      />

<Tab.Screen
        name="UserAccountScreen"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.DarkGreen } : {},
                ]}
              >
                 <AntDesign
                  name="user"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
              </View>
            );
          },
        }}
      />


    </Tab.Navigator>
  );
};



const styles = {
  activeTabBackground: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 10,
  },
};

export default TabNavigator;