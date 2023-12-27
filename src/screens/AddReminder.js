import React, {useContext, useState , useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import {COLORS, SPACING  , FONTFAMILY , BORDERRADIUS , FONTSIZE } from '../config/theme/theme';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppContext } from '../context/AppContext';


const AddReminder = ({navigation}) => {
  
  const [isLoading , setIsLoading] = useState(false);
  const [medicineType,setmedicineType] = useState('');
  const [startDate , setStartDate] = useState(new Date());
  const [endDate , setEndDate] = useState(new Date());
  const [time , setTime] = useState(new Date());


  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeDate;
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || timeDate;
    setEndDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime;
    setTime(currentTime);
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
    
    addReminderMethod(startDate , endDate , time , medicineType , () => {
     navigation.navigate('Home');
     setIsLoading(false);
    });
  }


  const { addReminderMethod, error , success } = useContext(AppContext);

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
    <DateTimePicker
          className=""
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
    </View>

  </View>

  <View className="mb-8 " >
      <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
      Select End Date : <Text className="text-red-500 text-base" > * </Text>  
      </Text>
    
    <View className="mt-2 " style={styles.datePickerButton} >
    <DateTimePicker
          className=""
            value={endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
    </View>

  </View>

  <View className="mb-8 " >
    <Text style={styles.textInput} className="block text-gray-700 font-bold mb-2" htmlFor="username">
   Select Time <Text className="text-red-500 text-base" > * </Text>  
    </Text>
   
    <View style={styles.timePickerButton} >
    <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true} 
          display="default"
          onChange={handleTimeChange}
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
         items={popularMedications.map((show) => ({
        label: show,
        value: show,
      }))}
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

});


export default AddReminder;
