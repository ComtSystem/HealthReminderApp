import  React from 'react';
import {Text, View, StyleSheet, StatusBar, Image , TouchableOpacity , ScrollView} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING , BORDERRADIUS} from '../config/theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';


const RemindersScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <StatusBar barStyle={'light-content'} />

    <ScrollView className="flex flex-col " style={styles.topAreaHeadins} >

    <View className="mt-5 h-full" >
    <TouchableOpacity
        className="mt-4 text-white py-3 bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-6  mb-2 w-full flex-row items-center justify-center"
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('AddReminder')}>
        <Ionicons
                  name="notifications-outline"
                  color={COLORS.White}
                  size={FONTSIZE.size_18}
                />
          <Text style={styles.buttonText}>  Add Reminder </Text>
        </TouchableOpacity>

        <View>
          
          <View className="mt-5 bg-gray-100 w-full h-28 opacity-90 rounded-xl p-5" >
            <View className="flex flex-row items-center justify-around"  >
          <View>
          <Text style={styles.headline} className="text-black text-2xl" > 9:30  </Text>
            <Text style={styles.headline} className="text-black text-2xl" > AM  </Text>
          </View>

          <View>
            <View style={{
              width: 2,
              height: 68,
              backgroundColor: COLORS.SecondaryColor
            }} />
          </View>

          <View  >
              <Text className="text-lg text-black" style={styles.font} > 
                3 Medicines 
              </Text>
              <Text className="text-sm text-gray-800" > 
                next 3 days
               </Text>
            </View>
            </View>
          </View>
          
          <View className="mt-5 bg-gray-100 w-full h-28 opacity-90 rounded-xl p-5" >
            <View className="flex flex-row items-center justify-around"  >
          <View>
          <Text style={styles.headline} className="text-black text-2xl" > 9:30  </Text>
            <Text style={styles.headline} className="text-black text-2xl" > AM  </Text>
          </View>

          <View>
            <View style={{
              width: 2,
              height: 68,
              backgroundColor: COLORS.SecondaryColor
            }} />
          </View>

          <View  >
              <Text className="text-lg text-black" style={styles.font} > 
                3 Medicines 
              </Text>
              <Text className="text-sm text-gray-800" > 
                next 3 days
               </Text>
            </View>
            </View>
          </View>
          
          <View className="mt-5 bg-gray-100 w-full h-28 opacity-90 rounded-xl p-5" >
            <View className="flex flex-row items-center justify-around"  >
          <View>
          <Text style={styles.headline} className="text-black text-2xl" > 9:30  </Text>
            <Text style={styles.headline} className="text-black text-2xl" > AM  </Text>
          </View>

          <View>
            <View style={{
              width: 2,
              height: 68,
              backgroundColor: COLORS.SecondaryColor
            }} />
          </View>

          <View  >
              <Text className="text-lg text-black" style={styles.font} > 
                3 Medicines 
              </Text>
              <Text className="text-sm text-gray-800" > 
                next 3 days
               </Text>
            </View>
            </View>
          </View>
          
          <View className="mt-5 bg-gray-100 w-full h-28 opacity-90 rounded-xl p-5" >
            <View className="flex flex-row items-center justify-around"  >
          <View>
          <Text style={styles.headline} className="text-black text-2xl" > 9:30  </Text>
            <Text style={styles.headline} className="text-black text-2xl" > AM  </Text>
          </View>

          <View>
            <View style={{
              width: 2,
              height: 68,
              backgroundColor: COLORS.SecondaryColor
            }} />
          </View>

          <View  >
              <Text className="text-lg text-black" style={styles.font} > 
                3 Medicines 
              </Text>
              <Text className="text-sm text-gray-800" > 
                next 3 days
               </Text>
            </View>
            </View>
          </View>
          
     

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


export default RemindersScreen