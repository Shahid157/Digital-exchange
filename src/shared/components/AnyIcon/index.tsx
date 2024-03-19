// @ts-ignore

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native';

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
  Fontisto,
};

interface Props {
  type?: any;
  name?: string;
  size?: number;
  style?: any;
  color?: string;
  disabled?: boolean;
  onPress?: () => void;
}

function AnyIcon(props: Props) {
  const { type, name, size, style, color, disabled, onPress } = props;

  const Tag = type;
  return (
    <>
      {type && name && (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={disabled}
          style={{ paddingHorizontal: 1 }}
          onPress={() => {
            onPress ? onPress() : '';
          }}
        >
          <Tag name={name} size={size} color={color} style={style} />
        </TouchableOpacity>
      )}
    </>
  );
}

export default AnyIcon;
