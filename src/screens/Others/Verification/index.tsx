import { useTheme } from '@react-navigation/native';
import { ICONS } from 'assets/images/icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppHeader from 'shared/components/AppHeader';
import PrimaryButton from 'shared/components/PrimaryButton';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { COLORS, FONTS } from 'shared/constants/theme';
import { THEME } from 'shared/theme';

const VerificationData = [
  {
    level: '1',
    title: 'Your Details',
    desc: 'Please provide your name and email',
    status: 'success',
  },
  {
    level: '1',
    title: 'Scan QR code',
    desc: 'Verified at least one device with 2FA',
    status: 'success',
  },
  {
    level: '1',
    title: 'Choose a password',
    desc: 'Must be a at least 8 characters',
  },
  {
    level: '1',
    title: 'Invite your team',
    desc: 'Start collaborating with your team',
  },
  {
    level: '1',
    title: 'Add your socials',
    desc: 'Share post to your social accounts',
  },
];

function Verification() {
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <AppHeader title="Verification" leftIcon="back" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.subContainer}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: colors.card,
            borderRadius: THEME.RADIUS.BOX,
            ...GlobalStyleSheet.shadow,
          }}
        >
          {VerificationData.map((data, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 12,
              }}
            >
              <View
                style={[
                  {
                    height: 20,
                    width: 20,
                    borderRadius: THEME.RADIUS.NORMAL,
                    borderWidth: 1.5,
                    marginTop: 5,
                    marginRight: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: colors.text,
                    opacity: 0.4,
                  },
                  data.status === 'success' && {
                    borderColor: COLORS.success,
                    opacity: 1,
                  },
                ]}
              >
                <Image
                  style={[
                    {
                      height: 10,
                      width: 10,
                      tintColor: colors.text,
                    },
                    data.status === 'success' && {
                      tintColor: COLORS.success,
                    },
                  ]}
                  source={ICONS.CHECK}
                />
              </View>
              <View>
                <Text
                  style={{
                    ...FONTS.font,
                    ...FONTS.fontMedium,
                    color: colors.text,
                    marginBottom: 5,
                  }}
                >
                  {data.title}
                </Text>
                <Text style={{ ...FONTS.fontXs, color: colors.text }}>
                  {data.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 15,
        }}
      >
        <PrimaryButton title="Verify Now" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});

export default Verification;
