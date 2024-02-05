import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <View className="flex  justify-center h-full" >
      <View  >

      <Text style={styles.font} className="block text-white font-bold mb-2 text-2xl"  >
       Take An Action: 
        </Text>

        <TouchableOpacity
        className="mt-3 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => navigation.navigate('AccountOptions')}>
          <Text style={styles.buttonText}> New User ? , Signup </Text>
        </TouchableOpacity>

        <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>  Already with us ? , Login</Text>
        </TouchableOpacity>


      </View>

      <View style={styles.profileContainer} className="mt-12" >
        <SettingComponent
          icon="comment-question-outline"
          heading="Faq"
          navigation={navigation}
          toNav={"FaqScreen"}
        />
         <SettingComponent
          icon="information-outline"
          heading="Who We Are"
          navigation={navigation}
          toNav={"WhoWeAreScreen"}
        />
       
      </View>
      </View>
    

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.SecondaryColor,
    paddingHorizontal: 25,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: FONTFAMILY.secondary,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
  logo: {
    resizeMode: 'cover',
    maxHeight: 80,
    maxWidth: 240,
  },
  font: {
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.secondary,
    textAlign: 'left'
  },
  button: {
    backgroundColor: COLORS.PrimaryColor,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonBorder: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.PrimaryColor,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.secondary_bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  
});

export default UserAccountScreen;
