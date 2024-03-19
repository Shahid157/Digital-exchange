import React, { useRef, useState } from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AccountModal from 'shared/components/modal/accountIdModal';
import AntiPhishing from 'shared/components/modal/antiphishing';
import ChangePassword from 'shared/components/modal/changePassword';
import ContactModal from 'shared/components/modal/contactModal';
import GoogleAuthenticatorConfirm from 'shared/components/modal/googleAuthenticatorconfirm';
import LinkAuthenticator from 'shared/components/modal/linkAuthenticator';
import LoginActivity from 'shared/components/modal/loginActivity';
import NewEmailModal from 'shared/components/modal/newEmailModal';
import SmsAuthenticator from 'shared/components/modal/smsAuthenticator';
import { COLORS, FONTS } from 'shared/constants/theme';
import { ICONS } from 'assets/images/icons';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppHeader from 'shared/components/AppHeader';
import ToggleSwitch from 'toggle-switch-react-native';
import { THEME } from 'shared/theme';

const DATA = [
  {
    data: [
      {
        icon: ICONS.GOOGLE,
        title: 'Google',
        desc: '2 step verification code.',
        mode: 'toggle',
        toggle: 'google authenticator',
        RBSheet: 'link authenticator',
        RBSheet2: 'google authenticator',
      },
      {
        icon: ICONS.EMAIL,
        title: 'Email',
        desc: 'Change email ID.',
        mode: 'edit',
        RBSheet: 'new email',
      },
      {
        icon: ICONS.WHATSAPP,
        title: 'SMS',
        desc: 'Change phone number.',
        mode: 'edit',
        RBSheet: 'contact',
      },
    ],
  },
];

function TwoFactorAuthentication() {
  const { colors } = useTheme();
  const theme = useTheme();

  const refRBSheet = useRef();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const [settingRBSheet, setSettingRBSheet] = useState('');

  return (
    <>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown
        dragFromTopOnly={settingRBSheet === 'login activity'}
        height={
          settingRBSheet === 'account'
            ? 270
            : settingRBSheet === 'new email'
            ? 360
            : settingRBSheet === 'change password'
            ? 365
            : settingRBSheet === 'contact'
            ? 270
            : settingRBSheet === 'anti phishing'
            ? 250
            : settingRBSheet === 'link authenticator'
            ? 240
            : settingRBSheet === 'google authenticator'
            ? 240
            : settingRBSheet === 'sms authenticator1' ||
              settingRBSheet === 'sms authenticator2'
            ? 240
            : settingRBSheet === 'login activity'
            ? 580
            : 500
        }
        openDuration={300}
        customStyles={{
          wrapper: {
            // backgroundColor: appTheme.modalBackLayer,
          },
          container: {
            backgroundColor: colors.background,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          draggableIcon: {
            width: 90,
            backgroundColor: colors.border,
          },
        }}
      >
        {theme.dark && (
          <LinearGradient
            colors={['rgba(22,23,36,.7)', 'rgba(22,23,36,0)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
        )}
        {settingRBSheet === 'account' ? (
          <AccountModal />
        ) : settingRBSheet === 'new email' ? (
          <NewEmailModal />
        ) : settingRBSheet === 'change password' ? (
          <ChangePassword />
        ) : settingRBSheet === 'contact' ? (
          <ContactModal />
        ) : settingRBSheet === 'anti phishing' ? (
          <AntiPhishing />
        ) : settingRBSheet === 'link authenticator' ? (
          <LinkAuthenticator />
        ) : settingRBSheet === 'google authenticator' ? (
          <GoogleAuthenticatorConfirm />
        ) : settingRBSheet === 'sms authenticator1' ? (
          <SmsAuthenticator enabled />
        ) : settingRBSheet === 'sms authenticator2' ? (
          <SmsAuthenticator />
        ) : settingRBSheet === 'login activity' ? (
          <LoginActivity />
        ) : (
          <AccountModal />
        )}
      </RBSheet>

      <View style={{ ...styles.container, backgroundColor: colors.background }}>
        <AppHeader title="Two Factor Authentication" leftIcon="back" />
        <SectionList
          sections={DATA}
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: 30,
          }}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View>
              <Ripple
                onPress={() => {
                  item.toggle === 'google authenticator'
                    ? [
                        isEnabled
                          ? [
                              setSettingRBSheet(item.RBSheet2),
                              refRBSheet.current.open(),
                            ]
                          : [
                              setSettingRBSheet(item.RBSheet),
                              refRBSheet.current.open(),
                            ],
                        toggleSwitch(),
                      ]
                    : item.toggle === 'message'
                    ? [
                        toggleSwitch2(),
                        isEnabled2
                          ? [
                              setSettingRBSheet(item.RBSheet2),
                              refRBSheet.current.open(),
                            ]
                          : [
                              setSettingRBSheet(item.RBSheet),
                              refRBSheet.current.open(),
                            ],
                      ]
                    : item.RBSheet
                    ? [
                        setSettingRBSheet(item.RBSheet),
                        refRBSheet.current.open(),
                      ]
                    : item.navigate
                    ? navigation.navigate(item.navigate)
                    : '';
                }}
                style={styles.rippleStyle}
              >
                <View style={styles.viewStyle}>
                  <Image style={styles.imageStyle} source={item.icon} />
                </View>
                <Text
                  style={{
                    flex: 1,
                    ...FONTS.font,
                    color: colors.text,
                    opacity: 0.9,
                  }}
                >
                  {item.title}
                </Text>
                {item.mode === 'toggle' ? (
                  <ToggleSwitch
                    isOn={
                      item.toggle === 'google authenticator'
                        ? isEnabled
                        : item.toggle === 'message'
                        ? isEnabled2
                        : item.toggle === 'themeMode'
                        ? isEnabled3
                        : false
                    }
                    onColor={COLORS.primary}
                    offColor={
                      theme.dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'
                    }
                    labelStyle={{ color: 'black', fontWeight: '900' }}
                  />
                ) : (
                  <FeatherIcon
                    size={18}
                    color={colors.text}
                    name="chevron-right"
                  />
                )}
              </Ripple>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) =>
            title ? (
              <Text
                style={{
                  ...FONTS.h6,
                  ...FONTS.fontMedium,
                  color: colors.text,
                  marginBottom: 6,
                  marginTop: 25,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingBottom: 8,
                  marginHorizontal: 15,
                }}
              >
                {title}
              </Text>
            ) : null
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rippleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  viewStyle: {
    height: 38,
    width: 38,
    borderRadius: THEME.RADIUS.HIGH,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
  },
});

export default TwoFactorAuthentication;
