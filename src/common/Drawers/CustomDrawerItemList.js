import { View , Text , StyleSheet  } from 'react-native';
import { CustomDrawerItem } from './CustomDrawerItem';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { COLORS, FONTFAMILY, FONTSIZE } from '../../config/theme/theme';


export default function CustomDrawerItemList(props) {
    const { state, navigation } = props;
  
    return (
      <View>
        {state.routes.slice(0, 4).map((route, index) => {
          const { options } = props.descriptors[route.key];
  
          let IconComponent = null;
          switch (options.IconCategory) {
            case 'FontAwesome':
              IconComponent = FontAwesome;
              break;
            case 'MaterialCommunityIcons':
              IconComponent = MaterialCommunityIcons;
              break;
            case 'AntDesign':
              IconComponent = AntDesign;
              break;
            case 'Ionicons':
              IconComponent = Ionicons;
              break;
            case 'Entypo':
              IconComponent = Entypo;
              break;
  
            default:
              IconComponent = AntDesign;
              break;
          }
          const customContent = (
            <View className="mx-2 flex-row items-center my-3 mb-3">
           
              <IconComponent name={options.iconName} size={20} color={COLORS.White} />
              <Text style={styles.fontTajwal} className="text-white mx-4">
                {options.drawerLabel || route.name}
              </Text>
            </View>
          );
  
          return (
            <CustomDrawerItem
              key={route.key}
              content={customContent}
              onPress={() => {
                navigation.navigate(route.name);
              }}
            />
          );
        })}
      </View>
    );
  }


const styles = StyleSheet.create({
 
    fontTajwal: {
      fontFamily: FONTFAMILY.secondary,
      fontSize: FONTSIZE.size_16,
    },
   
})