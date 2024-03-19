import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { FONTS, COLORS } from 'shared/constants/theme';
import Ripple from 'react-native-material-ripple';
import Received from 'shared/components/Messages/Received';
import Sent from 'shared/components/Messages/Sent';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import ROUTE_NAMES from 'routes/RouteNames';
import { IMAGES } from 'assets/images';
import { ICONS } from 'assets/images/icons';
import { THEME } from 'shared/theme';
import { GenericNavigation } from 'shared/models/types';

const Data = [
  {
    message:
      'Sed ut is perspiciats undo omnis iste natus error sit voluptatem accusantium',
  },
  {
    message: 'sed quia consequuntur',
  },
  {
    message: 'nisi ut aliquid ex ea commodi consequuntur ? Quis autem vel eum',
  },
  {
    message:
      'Sed ut is perspiciats undo omnis iste natus error sit voluptatem accusantium',
  },
  {
    message: 'sed quia consequuntur',
  },
  {
    message: 'nisi ut aliquid ex ea commodi consequuntur ? Quis autem vel eum',
  },
  {
    message:
      'Sed ut is perspiciats undo omnis iste natus error sit voluptatem accusantium',
  },
  {
    message: 'sed quia consequuntur',
  },
  {
    message: 'nisi ut aliquid ex ea commodi consequuntur ? Quis autem vel eum',
  },
];

function Messages({ navigation }: GenericNavigation) {
  const { colors } = useTheme();

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={[
            {
              backgroundColor: colors.card,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              ...GlobalStyleSheet.shadow,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation?.navigate(ROUTE_NAMES.HELP_DESK)}
            style={styles.leftIcon}
          >
            <FeatherIcon size={22} color={colors.text} name="arrow-left" />
          </TouchableOpacity>
          <View style={styles.viewStyle}>
            <View
              style={[
                {
                  height: 40,
                  width: 40,
                  backgroundColor: COLORS.primaryLight,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: THEME.RADIUS.HIGH,
                  marginRight: 12,
                },
              ]}
            >
              <Image style={styles.image} source={IMAGES.logoIcon} />
            </View>
            <View>
              <Text
                style={{
                  ...FONTS.h6,
                  ...FONTS.fontMedium,
                  color: colors.text,
                  marginBottom: 2,
                }}
              >
                Ticket #102
              </Text>
              <Text style={{ ...FONTS.fontXs, color: colors.text }}>
                ceyptozilla
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <FeatherIcon size={20} color={colors.text} name="more-vertical" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, alignItems: 'center' }}
        >
          <View style={[{ ...styles.time }]}>
            <Text style={{ ...FONTS.fontXs, color: colors.text }}>
              27 Oct 2021
            </Text>
          </View>
          <Received message={Data[0].message} duration="9:10 PM" />
          <Sent message={Data[1].message} />
          <Sent message={Data[2].message} duration="9:10 PM" />
          <View style={[{ ...styles.time }]}>
            <Text style={{ ...FONTS.fontXs, color: colors.text }}>Today</Text>
          </View>
          <Received message={Data[3].message} duration="9:10 PM" />
          <Sent message={Data[4].message} />
          <Sent message={Data[5].message} duration="9:10 PM" />
          <Received message={Data[6].message} duration="9:10 PM" />
          <Sent message={Data[7].message} />
          <Sent message={Data[8].message} duration="9:10 PM" />
        </ScrollView>
      </View>

      <View
        style={[
          {
            backgroundColor: colors.card,
            padding: 10,
            flexDirection: 'row',
            ...GlobalStyleSheet.shadow,
          },
        ]}
      >
        <View
          style={{
            position: 'relative',
            flex: 1,
          }}
        >
          <TextInput
            style={[
              {
                ...FONTS.font,
                fontSize: 15,
                height: 50,
                borderRadius: THEME.RADIUS.NORMAL,
                paddingLeft: 20,
                paddingRight: 50,
                color: colors.text,
                backgroundColor: colors.background,
              },
            ]}
            placeholder="Type Message"
            placeholderTextColor={colors.text}
          />
        </View>
        <Ripple style={styles.rippleStyle}>
          <Image style={styles.sendImage} source={ICONS.SEND} />
        </Ripple>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  time: {
    marginVertical: 15,
    borderRadius: THEME.RADIUS.BOX,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  leftIcon: {
    width: 40,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  moreBtn: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleStyle: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.HIGH,
    marginLeft: 5,
    backgroundColor: COLORS.primary,
  },
  sendImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: COLORS.white,
    marginLeft: 4,
  },
});

export default Messages;
