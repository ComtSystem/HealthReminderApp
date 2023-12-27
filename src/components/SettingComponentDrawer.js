import * as React from 'react';
import {Text, View, StyleSheet , TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../config/theme/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SettingComponentDrawer = ( { navigation , toNav , icon , heading }) => {
  return (
    <TouchableOpacity className="mx-2" onPress={() => navigation.navigate(toNav) } style={styles.container} >
      <View>
        <MaterialCommunityIcons name={icon} style={styles.iconStyle} />
      </View>
      <View >
        <Text style={styles.title}>{heading}</Text>
      </View>
    </TouchableOpacity>
   
  );
};

export default SettingComponentDrawer;

const styles = StyleSheet.create({
  container: {

    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.space_16,
  },

  iconStyle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,

  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTFAMILY.secondary,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    marginHorizontal: 15
  },

});
