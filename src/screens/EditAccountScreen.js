import React , {useContext, useState  , useCallback , useRef} from 'react';
import { ScrollView ,  Text, View, StyleSheet, StatusBar, Image , KeyboardAvoidingView , TextInput , TouchableOpacity  , Platform , ActivityIndicator} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import { AuthenticationContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const EditAccountScreen = ({navigation}) => {

  const [isLoading , setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [fullName,setFullName] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');

  const [accountType , setAccountType] = useState('');
  
  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const maxLength = 10;
    const truncatedText = numericText.slice(0, maxLength);
    setPhoneNumber(truncatedText);
  };

  const {  editUserProfile , error , success , setError  } = useContext(AuthenticationContext);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('reminder_user');
          let jsonPrsed = JSON.parse(value);
          setUserId(jsonPrsed.id);
          setFullName(jsonPrsed.full_name);
          setPhoneNumber(jsonPrsed.phone_number);
          setAccountType(jsonPrsed.account_type);
        
        } catch (error) {
        }
      };
  
      getData();
    }, [])
  );

  const editProfile = () => {
  
    setIsLoading(true);
    editUserProfile(userId , fullName   , phoneNumber  , accountType ,  () => {
      navigation.navigate('Home');
      setIsLoading(false);
    });
  }

  const scrollViewRef = useRef();

  return (
    <ScrollView style={styles.container} bounces={false}
    ref={scrollViewRef}
    contentContainerStyle={{ flexGrow: 1 }} 
    >
      <StatusBar barStyle={'light-content'} />
    
      <View className="flex flex-col h-full mt-10" >

      {error && (
          <View className=" p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-left mb-5 flex items-emd" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

        {success && (
          <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-left mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
        )}

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex flex-col items-end mt-12" >

      { /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
  Full Name:  <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
 <TextInput
   style={styles.inputStyle}
   id="fullName"
      autoCapitalize="none"
      value={fullName}
      onChangeText={(text) => setFullName(text) }
 />
</View>

</View>
{ /*  END SINGLE INPUT */ }

{ /*  SINGLE INPUT */ }
<View className="mb-8 " >
<Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   Phone Number: <Text className="text-red-500 text-base" > * </Text>  
</Text>

<View style={styles.inputBox} >
 
<TextInput
      style={styles.inputStyle}
      id="phoneNumber"
      autoCapitalize="none"
      value={phoneNumber}
      onChangeText={handlePhoneNumberChange}
      keyboardType="numeric"
    />
</View>

</View>
{ /*  END SINGLE INPUT */ }


    </View>
      </KeyboardAvoidingView>

      <View className="flex items-center w-full" >

      {isLoading ? (
        <View  className="flex items-center justify-center" >
          <ActivityIndicator size={'large'} color={COLORS.DarkGreen} />
        </View>
      ) : (
        <TouchableOpacity
        className="text-white mt-10 rounded-lg text-sm px-6 py-4 mr-2 mb-2 "
          style={styles.button}
          onPress={() => editProfile()  }>
          <Text style={styles.buttonText}>   Edit Account  </Text>
        </TouchableOpacity>
      )}


    <TouchableOpacity
        className="text-white mt-5 text-sm px-6 py-4 "
          
          onPress={() => navigation.goBack()  }>
          <Text style={styles.buttonText}>  Go Back  </Text>
        </TouchableOpacity>
    </View>

      </View>
      
      
    </ScrollView>
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
    fontFamily: FONTFAMILY.tajawal,
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
    fontFamily: FONTFAMILY.tajawal,
    textAlign: 'left'
  },
  button: {
    width: '85%',
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
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  inputStyle: {
    width: '100%',
    paddingVertical: SPACING.space_2,
    fontFamily: FONTFAMILY.tajawal,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'left',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.White,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
    direction: 'rtl',
    width: '100%',
  },
  errorText: {
    fontFamily: FONTFAMILY.cairo_bold,
    textAlign: 'left',
  
  },
  
});

export default EditAccountScreen;
