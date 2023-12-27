import { View, Text , SafeAreaView , StyleSheet , StatusBar , TouchableOpacity  , Modal , KeyboardAvoidingView , ScrollView , TextInput , ActivityIndicator , Platform , Keyboard , Image , TouchableWithoutFeedback } from 'react-native'
import React, { useContext , useState , useEffect , useRef } from 'react'
import { FONTFAMILY , COLORS , SPACING  , FONTSIZE , BORDERRADIUS} from '../config/theme/theme';

import { AppContext } from '../context/AppContext';



const ContactUsScreen = ({navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const handleOverlayPress = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = () => {
    setKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOpen(false);
  };


  const {   isLoading, error , success  } = useContext(AppContext);


  const [fullName , setFullName] = useState('');
  const [email , setEmail] = useState('');
  const [phoneNumber , setPhoneNumber] = useState('');
  const [helpState , setHelpState] = useState('');
  const [message , setMessage] = useState('');

    const addContactRequest = () => {
     // sendContactRequest(fullName , email , phoneNumber , helpState , message);
      setTimeout(() => {
        navigation.navigate('Taps');
       }, 3500);
    }

    const scrollViewRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
    
      <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >
      <View  style={styles.appHeaderContainer}  >

      <View className="px-6" >

    <View className="mt-12" >

    {error && (
      <>
        {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
        <View className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-right mb-5 flex items-start">
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </>
    )}


      {success && (
        <>
        {scrollViewRef.current.scrollTo({ y: 0, animated: true })}
        <View className=" p-4  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-right mb-5 flex items-start" >
          <Text style={styles.errorText}  >{success}</Text>
        </View>
        </>
      )}


      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <View className="mb-8">
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
       Full Name:  <Text className="text-red-500 text-base" > * </Text>  
      </Text>
      <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight"
      id="username"
      placeholder="enter your name"
      value={fullName}
      onChangeText={(text) => setFullName(text)}
      />
      </View>

      <View className="mb-8">
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      Email Address:  <Text className="text-red-500 text-base" > * </Text>  
      </Text>
      <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      textContentType="emailAddress"
      keyboardType="email-address"
      autoCapitalize="none"
      id="username"
      placeholder="Enter email address"
      value={email}
      onChangeText={(text) => setEmail(text) }
      />
      </View>

      <View className="mb-8">
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
       Phone Number:    
      </Text>
      <View  className="relative" >
      <TextInput
      style={styles.inputStyle}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="email"
      placeholder="5xxxxxxxx"
      keyboardType='numeric'
      value={phoneNumber}
      onChangeText={(text) => setPhoneNumber(text) }
      />
    <View className="absolute top-3 right-5 flex flex-row items-center" >
    <Text style={styles.font} > +966 </Text>
    <Image className="mx-2" source={require('../assets/icons/saudi.png')}  />
    </View>
      </View>

      </View>


    <View className="mb-8" >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
     How we can help ? <Text className="text-red-500 text-base" > * </Text>  
      </Text>
      <TouchableOpacity
    onPress={() => setModalVisible(!modalVisible)  }
    style={styles.inputStyle}
    className="appearance-none border rounded-xl w-full py-3 px-3 text-gray-700 leading-tight "

    editable={false}

    >
    <Text style={styles.font} className="text-left" > {helpState} </Text>
    </TouchableOpacity>
    </View>

      <View className="mb-8">
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      Message: <Text className="text-red-500 text-base" > * </Text>  
      </Text>
      <TextInput
      style={[styles.inputStyle , styles.textAreaInput]}
      className="appearance-none border rounded-xl w-full py-4 px-3 text-gray-700 leading-tight "
      id="email"
      placeholder="أخبرنا المزيد"
      multiline={true}
      numberOfLines={8}
      value={message}
      onChangeText={(text) => setMessage(text) }
      />
      </View>

      </KeyboardAvoidingView>

      {!isLoading ? (

      <TouchableOpacity
      className="mt-8  rounded-full p-3"
      style={styles.button}
      onPress={() => addContactRequest() }
      >
      <Text style={styles.buttonText}>  Send   </Text>
      </TouchableOpacity>
      ) : (
      <ActivityIndicator animating={true} color={'#007FB7'} />
      )}


<TouchableOpacity
    className="text-white mt-3 text-sm px-6 py-4 "
      
      onPress={() => navigation.goBack()  }>
      <Text style={styles.buttonText}>  Go Back  </Text>
    </TouchableOpacity>

      </View>

    </View>
      </View>

        </ScrollView>


      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
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
  inputStyle: {
    width: '100%',
    paddingVertical: SPACING.space_2,
    fontFamily: FONTFAMILY.secondary,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'left',
    borderWidth: 2,
    borderColor: COLORS.White,
  },
  textInput: {
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: FONTFAMILY.secondary,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  
});

export default ContactUsScreen;
