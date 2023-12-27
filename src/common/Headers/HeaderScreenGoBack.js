import {  View , Text  , TouchableOpacity  , StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { COLORS , FONTFAMILY } from '../../config/theme/theme';

export const HeaderScreenGoBack = ({ navigation , title   }) => {
    return (
      <View  style={{ paddingHorizontal: 35 , backgroundColor:COLORS.NavTheme }} >
   <View className="flex flex-row justify-start pt-16 pb-2" >
         

   <TouchableOpacity  onPress={() => {
        navigation.goBack();
      }}  >
       <Feather name="chevron-left" size={24} color={COLORS.White} />
      </TouchableOpacity>

      <View>
      <Text className="text-xl text-white text-left" style={[styles.font ]} >  {title}  </Text>  
      </View>
     
      </View>

      </View>
     
    );
  }

  const styles = StyleSheet.create({
    font: {
      fontWeight: 'bold',
      fontFamily: FONTFAMILY.primary,
      textAlign: 'left'
    },
    
  });