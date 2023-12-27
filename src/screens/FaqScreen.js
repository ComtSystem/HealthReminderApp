import React , {useState} from 'react';
import {Text, View, StyleSheet, StatusBar , TouchableOpacity , SafeAreaView } from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import { FaqsTenant } from '../data/Faqs';
import Feather from '@expo/vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';


const FaqScreen = ({navigation}) => {

  const [activeState ,  setActiveState] = useState('tenant');

  const [showedText , setShowedText] = useState(null);

  const handleToggleText = (info) => {
    setShowedText(showedText === info ? null : info);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >

      <View  style={styles.appHeaderContainer} >

     
{FaqsTenant && FaqsTenant.map(({id , title , info}) => (

  <View className="mt-8" key={id} >
<TouchableOpacity onPress={() => handleToggleText(info)} className="flex flex-row justify-between items-center" >
<View>
  <Text style={styles.font} className="text-base mt-5 text-left w-72 text-white" > {title} </Text>
  </View>

  <View className="pt-2" >
  <Feather  name="chevron-down" size={26} color={COLORS.PrimaryColor} />
  </View>

  </TouchableOpacity>
  {showedText === info && (
    <View className="flex items-start mt-5 bg-gray-100 rounded-md px-4 py-4 " style={styles.transformY} >
    <Text style={[styles.font , styles.lineHeightFont]} className="text-sm text-left text-gray-500" >  {info} </Text>
  </View>

  )}

  </View>
  )) }



      </View>

      </ScrollView>

      <View className="flex items-center w-full" >

    <TouchableOpacity
        className="text-white mt-16 text-sm px-6 py-4 "
          
          onPress={() => navigation.goBack()  }>
          <Text style={styles.buttonText}>  Go Back   </Text>
        </TouchableOpacity>
    </View>


    



      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
    direction: 'rtl',
    paddingHorizontal: 25,
  
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
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
    maxHeight: 100,
    maxWidth: 320,
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

export default FaqScreen;
