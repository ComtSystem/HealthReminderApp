import React, {useContext, useState , useRef , useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Button,
  ActivityIndicator
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../config/theme/theme';
import RNPickerSelect from 'react-native-picker-select';
import {  query , collection , getDocs , db  , getDoc , doc , where}  from "../config/firebase/firebase";
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const AddReminder = ({navigation , route }) => {
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  const [isTimeVisible, setIsTimeVisible] = useState(false);

  const [isLoading , setIsLoading] = useState(false);
  const [medicineType,setmedicineType] = useState('');
  const [startDate , setStartDate] = useState(new Date());
  const [endDate , setEndDate] = useState(new Date());
  const [time , setTime] = useState(new Date());
  const [medecinesList, setMedecinesList] = useState(null);

  
  const getMedecinesData = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "Medecines") , where("family_code", "==", route.params.familyCode ) );
      const querySnapshot = await getDocs(q);
      const medData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMedecinesList(medData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getMedecinesData();
    }, [])
  );




  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const popularMedications = [
    'Acetaminophen (Tylenol)',
    'Ibuprofen (Advil, Motrin)',
    'Lisinopril',
    'Levothyroxine (Synthroid)',
    'Atorvastatin (Lipitor)'
  ];


  const addReminder = () => {
    setIsLoading(true);
    
    addReminderMethod(startDate , endDate , time , medicineType ,  route.params.familyCode , () => {
     navigation.navigate('Home');
     setIsLoading(false);
    });

    setTimeout(() => {
      setIsLoading(false);
     } , 3500)
     
  }


  const { addReminderMethod, error , success , setError } = useContext(AppContext);

  const scrollViewRef = useRef();



  return (

    <ScrollView style={styles.container} bounces={false}
    ref={scrollViewRef}
    contentContainerStyle={{ flexGrow: 1 }} 
    >
    <StatusBar barStyle={'light-content'} />

      <View className="flex flex-col items-center justify-center mt-8" style={styles.loginContainer} >

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  >
        

        <View className="mt-12" >


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


  <View className="mb-8 " >
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      Select Start Date : <Text className="text-red-500 text-base" > * </Text>  
      </Text>
    
    <View className="mt-2 " style={styles.datePickerButton} >
      <Button title="Select Start Date" onPress={() => setIsStartDateVisible(!isStartDateVisible) } />
    </View>

    <View>
    {startDate && (
        <Text style={styles.selectedDate}>
          Selected Date: {startDate.toISOString()}
        </Text>
      )}
    </View>

    <DateTimePickerModal
    isDarkModeEnabled={true}
            isVisible={isStartDateVisible}
        mode="date" 
        onConfirm={handleStartDateChange}
        onCancel={() => setIsStartDateVisible(false) }
      />

  </View>

  <View className="mb-8 " >
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      Select End Date : <Text className="text-red-500 text-base" > * </Text>  
      </Text>

      <View className="mt-2 " style={styles.datePickerButton} >
      <Button title="Select End Date" onPress={() => setIsEndDateVisible(!isEndDateVisible) } />
    </View>

    <View>
    {endDate && (
        <Text style={styles.selectedDate}>
          End Date: {endDate.toISOString()}
        </Text>
      )}
    </View>
    
    <View className="mt-2 " style={styles.datePickerButton} >
    <DateTimePickerModal
        isDarkModeEnabled={true}
        isVisible={isEndDateVisible}
            mode="date"
            onChange={handleEndDateChange}
            onCancel={() => setIsEndDateVisible(false) }
          />
    </View>

  </View>

  <View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   Select Time <Text className="text-red-500 text-base" > * </Text>  
    </Text>

    <View className="mt-2 " style={styles.datePickerButton} >
      <Button title="Select Time" onPress={() => setIsTimeVisible(!isTimeVisible) } />
    </View>

    <View>
    {time && (
        <Text style={styles.selectedDate}>
          Time: {time.toLocaleTimeString()}
        </Text>
      )}
    </View>
   
    <View style={styles.timePickerButton} >
    <DateTimePickerModal
     isDarkModeEnabled={true}
     isVisible={isTimeVisible}
          mode="time"
          onConfirm={handleTimeChange}
          onCancel={() => setIsTimeVisible(false) }
        />
  </View>


    </View>

    <View className="mb-8">
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
     Select medicine:  <Text className="text-red-500 text-base" > * </Text>  
      </Text>

 
   <View style={styles.inputBox} >

<RNPickerSelect
  style={pickerSelectStyles}
  pickerProps={{
    accessibilityLabel: medicineType,
  }}
  placeholder={{
    label: 'Choose',
    value: '',
  }}
  selectedValue={medicineType || 'Acetaminophen (Tylenol)'}
  onValueChange={(itemValue) => setmedicineType(itemValue)}
  items={
    medecinesList &&
    medecinesList.length !== 0
      ? medecinesList.map((show) => ({
          label: show?.med_name,
          value: show?.med_name,
        }))
      : popularMedications.map((show) => ({
          label: show,
          value: show,
        }))
  }
    >
   </RNPickerSelect>
   </View>
   
   

      </View>


      {isLoading ? (
      <View  className="flex items-center justify-center my-5" >
          <ActivityIndicator size={'large'} color={COLORS.PrimaryColor} />
        </View>
    ) : (
      <TouchableOpacity
      className="mt-8  rounded-full p-3"
      style={styles.button}
      onPress={() => addReminder() }
      >
      <Text style={styles.buttonText}>  Add Reminder   </Text>
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
  timePickerButton: {
    marginBottom: 20,
    backgroundColor: COLORS.PrimaryColor,
    color: COLORS.White,
    borderRadius: BORDERRADIUS.radius_25,
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    color: 'white',
  },
  datePickerButton: {
    marginBottom: 20,
    backgroundColor: COLORS.PrimaryColor,
    color: COLORS.White,
    borderRadius: BORDERRADIUS.radius_25,
    fontFamily: FONTFAMILY.tajawal_bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  datePickerContainer: {
    backgroundColor: 'white',
  },
  datePickerContainerIOS: {
    backgroundColor: 'white',
  },
  selectedDate: {
    marginTop: 5,
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
});


export default AddReminder;
