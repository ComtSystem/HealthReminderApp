import { TouchableOpacity, View } from "react-native";


export function CustomDrawerItem({ content, onPress }) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View>{content}</View>
      </TouchableOpacity>
    );
  }