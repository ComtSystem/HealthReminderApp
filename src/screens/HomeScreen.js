import  React , {useState , useCallback , useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity , ScrollView} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDoc , doc , db   } from '../config/firebase/firebase';
import * as Location from 'expo-location';




const HomeScreen = ({navigation}) => {
  const [isLoading , setIsLoading] = useState();
  const [accountType , setAccountType] = useState('');
  const [userId, setUserId] = useState('');
  const [hasJoinedFamily , setHasJoinedFamily ] = useState(false);
  const [familyId , setFamilyId ] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          setIsLoading(true);
          const value = await AsyncStorage.getItem('reminder_user');
          let jsonPrsed = JSON.parse(value);
          setUserId(jsonPrsed.id);
          setAccountType(jsonPrsed.account_type);

          const docRef = doc(db, "users", jsonPrsed.id );
          const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setHasJoinedFamily(docSnap.data().joinedFamily);
              setFamilyId(docSnap.data().familyId);
            
            } else {
              setIsLoading(false);
            }
          setIsLoading(false);
        } catch (error) {
        }
      };
      getData();
    }, [])
  );

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }






  return (
    <View style={styles.container}>
    <StatusBar barStyle={'light-content'} />

    <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >

    <View className="flex flex-col items-center justify-center mt-12" >

  {hasJoinedFamily && (
      <View className="flex flex-col items-center justify-center " >

<Text style={styles.font} className="block text-white font-bold mb-1 text-lg "  >
   Your Current Family Code: 
      </Text>
      

    <Text style={styles.headline} className="block text-white font-bold mb-2 text-lg "  >
    {familyId}
      </Text>
      
    <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('AddReminder' , {
            familyCode: familyId
          })}>
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
          onPress={() => navigation.navigate('AddMedecine' , {
            familyCode: familyId
          })}>
           <AntDesign
                  name="medicinebox"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
          <Text style={styles.buttonText}>  Add Medecine </Text>
        </TouchableOpacity>

        </View>
  )}
  


    {!hasJoinedFamily && accountType === 'parent' && (
    <TouchableOpacity
    className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
      style={styles.buttonBorder}
      onPress={() => navigation.navigate('AddFamily' , {
        uid: userId
      })}>
       <MaterialIcons
              name="family-restroom"
              color={COLORS.White}
              size={FONTSIZE.size_18}
            />
      <Text style={styles.buttonText}>  Create Family </Text>
    </TouchableOpacity>
    ) }

   

    {!hasJoinedFamily && accountType === 'child' && (
    <TouchableOpacity
    className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
      style={styles.buttonBorder}
      onPress={() => navigation.navigate('JoinFamily', {
        uid: userId
      })}>
       <Entypo
              name="code"
              color={COLORS.White}
              size={FONTSIZE.size_18}
            />
      <Text style={styles.buttonText}>  Join Family </Text>
    </TouchableOpacity>
    ) }
    <View className="mt-5" >

    <Text style={styles.headline} >{text}</Text>



    </View>
   

  
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