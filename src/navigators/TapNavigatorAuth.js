import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View  } from 'react-native';
import { COLORS, FONTSIZE } from '../config/theme/theme';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import UserAccountAuth from '../screens/UserAccountAuth';
import RemindersScreen from '../screens/RemindersScreen';
import MedecinesScreen from '../screens/MedecinesScreen';

const Tab = createBottomTabNavigator();

const TapNavigatorAuth = () => {


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
        name="HomeScreen"
        component={HomeScreen}
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
        name="MedecinesScreen"
        component={MedecinesScreen}
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
                 <AntDesign
                  name="medicinebox"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
              </View>
            );
          },
        }}
      />

<Tab.Screen
        name="RemindersScreen"
        component={RemindersScreen}
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
                 <Ionicons
                  name="notifications-outline"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
              </View>
            );
          },
        }}
      />

    <Tab.Screen
        name="UserAccountAuth"
        component={UserAccountAuth}
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

export default TapNavigatorAuth;