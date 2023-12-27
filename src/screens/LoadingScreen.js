import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, FONTFAMILY } from '../config/theme/theme';

const LoadingScreen = ( {navigation}) => {

  return (
    <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
       <StatusBar barStyle={'light-content'} />
      <View style={styles.textContainer}>
        <Image source={require('../assets/icons/4.png')} style={styles.logo} />
        <Text style={styles.title}> Health Reminder app </Text>
        <Text style={styles.subtitle}>
          Remind Your Family
        </Text>

        <TouchableOpacity
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-4 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>  Start Now </Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.SecondaryColor,
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 110,
    maxWidth: 350,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.primary_bold,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTFAMILY.primary_light,
    fontSize: 18,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
  },
  button: {
    marginTop: 55,
    borderRadius: 5,
    marginBottom: 20,
    width: 220,
    backgroundColor: COLORS.PrimaryColor,
  },
  buttonText: {
    fontFamily: FONTFAMILY.primary_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default LoadingScreen;