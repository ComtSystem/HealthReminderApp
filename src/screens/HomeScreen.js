import  React from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity , ScrollView} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';


const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle={'light-content'} />

    <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >

    <View className="flex flex-col items-center justify-center mt-12" >

      
    <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('AddReminder')}>
        <Ionicons
                  name="notifications-outline"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
          <Text style={styles.buttonText}>  Add Reminder </Text>
        </TouchableOpacity>

    <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('AddMedecine')}>
           <AntDesign
                  name="medicinebox"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
          <Text style={styles.buttonText}>  Add Medecine </Text>
        </TouchableOpacity>

    <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('AddFamily')}>
           <MaterialIcons
                  name="family-restroom"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
          <Text style={styles.buttonText}>  Creating Family </Text>
        </TouchableOpacity>

    <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('JoinFamily')}>
           <Entypo
                  name="code"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
          <Text style={styles.buttonText}>  Join Family </Text>
        </TouchableOpacity>


  
    </View>

    </ScrollView>
  </View>
  )
}



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
    height: 35,
    width: 35
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
  headline: {
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.primary_bold,
    textAlign: 'left',
    color: COLORS.PrimaryColor
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


export default HomeScreen