import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  Platform
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../config/theme/theme';
import { AuthenticationContext } from '../context/AuthContext';

const LoginScreen = ({navigation}) => {

  const [isLoading , setIsLoading] = useState(false);
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { onLogin, error  } = useContext(AuthenticationContext);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
     }, 1200);
    onLogin(userEmail , password) 
   
  }
  
  
  

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <StatusBar barStyle={'light-content'} />

      <View className="flex  flex-col items-center justify-center mt-8" style={styles.loginContainer} >

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className=" mt-12" >

      {error && (
          <View className=" p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   Email:  <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="email"
  
  textContentType="emailAddress"
      keyboardType="email-address"
      autoCapitalize="none"
      value={userEmail}
      onChangeText={(text) => setEmail(text) }
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }


{ /*  SINGLE INPUT */ }
<View className="" >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
  Password : <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="password"
 
  textContentType="password"
      secureTextEntry
      autoCapitalize="none"
  value={password}
  onChangeText={(text) => setPassword(text) }
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

    <View className="flex items-center w-full" >

    {isLoading ? (
      <View  className="flex items-center justify-center my-5" >
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
    ) : (
      <TouchableOpacity
        className="text-white mt-10 rounded-lg text-sm px-6 py-4 mr-2 mb-2 "
          style={styles.button}
          onPress={() => handleLogin() }>
          <Text style={styles.buttonText}>   Login </Text>
        </TouchableOpacity>
    )}


    <TouchableOpacity
        className="text-white mt-5 text-sm px-6 py-4 "
          
          onPress={() => navigation.goBack()  }>
          <Text style={styles.buttonText}>  Go Back  </Text>
        </TouchableOpacity>
    </View>

</View>
      </KeyboardAvoidingView>

      </View>
      {  /* TOP HEader */}


     
     
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.SecondaryColor,
    paddingHorizontal: 20,
    height: '100%',
    
  },

  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },

  starIcon: {
    color: COLORS.Green,
  },
  icon_logo: {
    width: 200,
    height: 80,
  },
  button: {
    backgroundColor: COLORS.PrimaryColor,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: COLORS.White,
    width: '100%',
  },
  inputStyle: {
    width: '100%',
    paddingVertical: SPACING.space_2,
    fontFamily: FONTFAMILY.secondary,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'left',
  },
  textAreaInput: {
    textAlignVertical: 'top',
    height: 120, 
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: FONTFAMILY.secondary,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  loginContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',

  },
  errorText: {
    fontFamily: FONTFAMILY.primary_bold,
    textAlign: 'left'
  },

});

export default LoginScreen;
