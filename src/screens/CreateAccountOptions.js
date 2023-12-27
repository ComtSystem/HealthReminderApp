import { View, Text , StyleSheet , StatusBar , TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../config/theme/theme';

const CreateAccountOptions = ( {  navigation} ) => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle={'light-content'} />
  
    <View className="flex items-center text-center justify-center h-full" >

    <Text style={styles.font} className="block text-white font-bold mb-2 text-lg text-center"  >
    Choose Account Type
      </Text>
   

      <TouchableOpacity
      className="mt-5 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
        style={styles.buttonBorder}
        onPress={() => navigation.navigate('SignupScreen' , {
            accountType: 'parent'
        })}>
        <Text style={styles.buttonText}>   Parent  </Text>
      </TouchableOpacity>

      <TouchableOpacity
      className="mt-5 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
        style={styles.button}
        onPress={() => navigation.navigate('SignupScreen' , {
            accountType: 'child'
        })}>
        <Text style={styles.buttonText}>   Child  </Text>
      </TouchableOpacity>
    </View>

  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.SecondaryColor,
    direction: 'rtl',
    paddingHorizontal: 25,
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

export default CreateAccountOptions