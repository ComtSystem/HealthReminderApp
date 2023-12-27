import * as React from 'react';
import {Text, View, StyleSheet, StatusBar , TouchableOpacity  , SafeAreaView , ScrollView} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';



const WhoWeAreScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
    
      <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >

      <View style={styles.appHeaderContainer}  >

      <View className="mt-2 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} > Abount Founder </Text>
        <Text className="text-sm text-left mt-2 text-white" style={styles.font} > 
        The Health Remind App was founded by a team passionate about improving medication adherence.
   </Text>
        </View>

        <View className="mt-12 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} >  App Idea  </Text>
        <Text className="text-sm text-left mt-2 text-white" style={styles.font} > 
        The idea behind our app stemmed from recognizing the common struggle individuals face in managing their medication schedules. We aimed to create a user-friendly solution that simplifies this process and ensures better health outcomes.
   </Text>
        </View>

        <View className="mt-12 items-start flex" >
        <Text className="text-lg text-left" style={styles.headlineBlue} >  How we help ? </Text>
        <Text className="text-sm text-left mt-2 text-white" style={styles.font} > 
        Our app assists users in managing their medication regimen efficiently. By providing customizable reminders, refill alerts, and secure storage of medication information, we empower individuals to stay on track with their prescribed treatments, leading to improved health and well-being.
   </Text>
        </View>


      </View>

      </ScrollView>

      <View className="flex items-center w-full" >
    <TouchableOpacity
        className="text-white mt-16 text-sm px-6 py-4 "
          
          onPress={() => navigation.goBack()  }>
          <Text style={styles.buttonText}>  Go Back  </Text>
        </TouchableOpacity>
  </View>



      
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
    fontFamily: FONTFAMILY.primary,
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
    fontFamily: FONTFAMILY.secondary_bold,
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
    fontFamily: FONTFAMILY.primary_bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headlineBlue: {
    fontFamily: FONTFAMILY.primary_bold,
    color: COLORS.PrimaryColor,
  },
  
});

export default WhoWeAreScreen;
