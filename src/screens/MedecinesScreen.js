import  React , {useState , useCallback} from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity , ScrollView} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import {  query , collection , getDocs , db  , getDoc , doc , where}  from "../config/firebase/firebase";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const MedecinesScreen = ({navigation})  => {


  const [isLoading , setIsLoading] = useState();
  const [error , setError] = useState();

  const [userId, setUserId] = useState('');
  const [familyId , setFamilyId ] = useState(false);

  const [medecinesList, setMedecinesList] = useState(null);
  const [hasJoinedFamily , setHasJoinedFamily ] = useState(false);



  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const getData = async () => {
        try {
          setIsLoading(true);
          const value = await AsyncStorage.getItem('reminder_user');
          let jsonPrsed = JSON.parse(value);
          setUserId(jsonPrsed.id);
          const docRef = doc(db, "users", jsonPrsed.id );
          const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setHasJoinedFamily(docSnap.data().joinedFamily);
              setFamilyId(docSnap.data().familyId);
              try {
                setIsLoading(true);
                const q = query(collection(db, "Medecines") , where("family_code", "==", docSnap.data().familyId ) );
                const querySnapshot = await getDocs(q);
                const medData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setMedecinesList(medData);
              } catch (error) {
                setError(error.message);
              } finally {
                setIsLoading(false);
              }

            } else {
              setIsLoading(false);
            }
          setIsLoading(false);
        } catch (error) {
        }
      };
      getData();

      setIsLoading(true);
  

    }, [])
  );


  return (
    <View style={styles.container}>
    <StatusBar barStyle={'light-content'} />

    <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >

    <View className="mt-5 h-full" >

      {hasJoinedFamily && (
        <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('AddMedecine' , {
            familyCode: familyId
          } )}>
        <AntDesign
                  name="medicinebox"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
      <Text style={styles.buttonText}>  Add Medicine </Text>
   </TouchableOpacity>
      )}

 

        <View>

        { medecinesList && medecinesList.map(({ med_type , med_name , med_quantity } , index) => (
        <View key={index} className="mt-5 bg-gray-100 w-full h-36 opacity-90 rounded-xl p-5" >

        <View className="flex flex-row items-center justify-between" >
        <Image
      source={require('../assets/icons/drugs.png')}
      style={styles.avatarImage}
        />
    <Text style={styles.font} className="text-black text-lg" > {med_quantity} </Text>
        </View>

        <View className="mt-4" >
          <Text className="text-lg text-black" style={styles.headline} > {med_name} </Text>
          <Text className="text-sm text-black" >  {med_type} </Text>
        </View>

      </View>
            ))}


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
    fontFamily: FONTFAMILY.secondary_bold,
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


export default MedecinesScreen