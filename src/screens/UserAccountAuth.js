import  React , {useContext , useState , useEffect , useCallback} from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import SettingComponent from '../components/SettingComponent';
import { AuthenticationContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const UserAccountAuth = ({navigation}) => {

  const { onLogout } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('reminder_user');
          setUser(JSON.parse(value));
        } catch (error) {
          // Handle error, if needed
        }
      };
  
      getData();
    }, [])
  );

  

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >

      <View className="pt-12" >
        <View style={styles.profileContainer}>
        <Image
          source={require('../assets/icons/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText} className="mt-1" > {user?.full_name}  </Text>
        <Text style={styles.avatarText}> {user?.phone_number}  </Text>
      </View>
      </View>


      <View style={styles.profileContainer} className="mt-12" >
      
        <SettingComponent
          icon="account"
          heading="Edit Account"
          navigation={navigation}
          toNav={"EditAccountScreen"}
        />

    <SettingComponent
          icon="comment-question-outline"
          heading="FAQ"
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

      <TouchableOpacity
        className="mt-8 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full"
          style={styles.button}
          onPress={() => onLogout() }>
          <Text style={styles.buttonText}> Logout  </Text>
        </TouchableOpacity>

        </ScrollView>

    </View>
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
    fontFamily: FONTFAMILY.tajawal,
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
    fontFamily: FONTFAMILY.tajawal,
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
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default UserAccountAuth;
