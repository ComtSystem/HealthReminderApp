import * as React from 'react';
import {Text, View, StyleSheet , TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../config/theme/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SettingComponent = ({navigation , toNav , icon , heading}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(toNav) } style={styles.container} >
     
      <View>
        <MaterialCommunityIcons name={icon} style={styles.iconStyle} />
      </View>
      <View >
        <Text style={styles.title}>{heading}</Text>
      </View>
      

    </TouchableOpacity>
   
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {

    width: '100%',
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },

  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingHorizontal: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.secondary_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },

});
