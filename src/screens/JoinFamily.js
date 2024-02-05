import React, {useContext, useState , useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../config/theme/theme';
import RNPickerSelect from 'react-native-picker-select';
import { AppContext } from '../context/AppContext';


const JoinFamily = ({navigation , route}) => {
  
  const [isLoading , setIsLoading] = useState(false);
  const [ familyCode ,setFamilyCode ] = useState('');




  const { joinFamilyMethod, error , success } = useContext(AppContext);


  const joinFamily = () => {
    setIsLoading(true);
    
     joinFamilyMethod( familyCode , route.params.uid ,  () => {
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

      <View className="flex flex-col items-center justify-center mt-8" style={styles.loginContainer} >

      <Text style={styles.font} className="block text-white font-bold mb-2 text-md text-center"  >
    To join the family please enter the code for the family you want to join
      </Text>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  >
        

        <View className="mt-12" >

      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       >


{error && (
          <View className=" p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{error}</Text>
          </View>
        )}

    {success && (
          <>
          {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
          <View className=" p-4 text-sm text-white rounded-lg bg-green-500 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-end" >
            <Text style={styles.errorText}  >{success}</Text>
          </View>
          </>

        )}

    


      <View className="mb-8">
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      Family code:  <Text className="text-red-500 text-base" > * </Text>  
      </Text>

      <View style={styles.inputBox} >
      <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight"
      id="username"
      
      value={familyCode}
      onChangeText={(text) => setFamilyCode(text)}
      />
       </View>

      </View>
    

      </KeyboardAvoidingView>

      {isLoading ? (
      <View  className="flex items-center justify-center my-5" >
          <ActivityIndicator size={'large'} color={COLORS.PrimaryColor} />
        </View>
    ) : (
      <TouchableOpacity
      className="mt-8  rounded-full p-3"
      style={styles.button}
      onPress={() => joinFamily() }
      >
      <Text style={styles.buttonText}>  Join Family   </Text>
      </TouchableOpacity>
    )}


    <TouchableOpacity
    className="text-white mt-3 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  Go Back  </Text>
    </TouchableOpacity>

      </View>


      </KeyboardAvoidingView>

      </View>
    
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'left',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    minWidth: '100%',
    fontSize: 16,
    fontFamily: FONTFAMILY.tajawal,
    color: COLORS.White,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_32,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_25,
    textAlign: 'left',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.SecondaryColor,
    paddingHorizontal: 20,
    height: '100%',
    direction: 'ltr'
  },

  InputHeaderContainer: {
    marginTop: SPACING.space_36,
  },
  starIcon: {
    color: COLORS.Green,
  },
  icon_logo: {
    width: 200,
    height: 50,
  },
  button: {
    backgroundColor: COLORS.PrimaryColor,
    borderRadius: BORDERRADIUS.radius_25,
  },
  buttonText: {
    fontFamily: FONTFAMILY.secondary_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  inputBox: {
    display: 'flex',
    justifyContent: 'space-between',

    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_8,
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

export default JoinFamily;
