import React from 'react'
import { SafeAreaView , View , Text  , TouchableOpacity , Image, StyleSheet  } from 'react-native';
import CustomDrawerItemList from './CustomDrawerItemList';
import {COLORS , FONTSIZE , BORDERRADIUS, FONTFAMILY} from '../../config/theme/theme';
import SettingComponentDrawer from "../../components/SettingComponentDrawer";
import { useNavigation } from '@react-navigation/native';

export const DrawerContentComponent = ({ props }) => {

  const navigation = useNavigation();

  return (
    <SafeAreaView>

          <View 
          style={{
               marginTop: 32,
               height: 190,
               width: '100%',
               justifyContent: "center",
               alignItems: "center",
               borderBottomColor: "#f4f4f4",
               borderBottomWidth: 1
             }}  
              >

 <Image source={require('../../assets/icons/4.png')} style={styles.logo}  />

      <View className="mt-5" >
      <TouchableOpacity
      className="mt-3 text-white py-2 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>  Login </Text>
      </TouchableOpacity>
    </View>
    </View>

       <View
    style={{
      marginTop: 15,
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 2,
      justifyContent: 'flex-start',
      color: 'white',
    }}
    >
   <CustomDrawerItemList {...props} />
 </View>

       <View
   style={{
     marginTop: 15,
     justifyContent: 'flex-start',
     color: 'white',
   }}
 >
   <SettingComponentDrawer
     icon="comment-question-outline"
     heading="Faq"
     navigation={navigation}
     toNav={"FaqScreen"}
   />
    <SettingComponentDrawer
     icon="information-outline"
     heading="Who We Are"
     navigation={navigation}
     toNav={"WhoWeAreScreen"}
   />
   <SettingComponentDrawer
     icon="phone-hangup-outline"
     heading="Contact Us"
     navigation={navigation}
     toNav={"ContactUsScreen"}
   />

 </View>


     </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  logo: {
      resizeMode: 'cover',
      maxHeight: 60,
      maxWidth: 150,
    },
    buttonBorder: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: COLORS.PrimaryColor,
      borderRadius: BORDERRADIUS.radius_25,
      padding: 4
    },
    font: {
      fontFamily: FONTFAMILY.primary
    },
    fontTajwal: {
      fontFamily: FONTFAMILY.secondary,
      fontSize: FONTSIZE.size_16,
    },
    button: {
      backgroundColor: COLORS.PrimaryColor,
      borderRadius: BORDERRADIUS.radius_25,
    },
    buttonText: {
      fontFamily: FONTFAMILY.secondary_bold,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
    },
})