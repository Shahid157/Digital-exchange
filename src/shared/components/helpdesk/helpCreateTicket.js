import React from 'react';

import { Image, ScrollView, Text, TextInput, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { ICONS } from 'assets/images/icons';
import { useTranslation } from 'react-i18next';
import { THEME } from 'shared/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import PrimaryButton from '../PrimaryButton';

function HelpCreateTicket() {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation(['all']);
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 15 }}>
            <View
              style={{
                alignItems: 'center',
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: THEME.RADIUS.INTERMEDIATE,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.primaryLight,
                  marginBottom: 15,
                  marginTop: 20,
                }}
              >
                <Image
                  style={{
                    height: 36,
                    width: 36,
                    resizeMode: 'contain',
                    tintColor: COLORS.primary,
                  }}
                  source={ICONS.SUPPORT}
                />
              </View>
              <Text
                style={{
                  ...FONTS.h6,
                  ...FONTS.fontMedium,
                  color: colors.title,
                  marginBottom: 5,
                }}
              >
                {t('Welcome to Crypto Money help desk', { ns: ['all'] })}
              </Text>
              <Text style={{ ...FONTS.font, color: colors.text }}>
                {t('If you have any issue, open a ticket.', { ns: ['all'] })}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.primary,
                  marginBottom: 6,
                }}
              >
                {t('Subject', { ns: ['all'] })}
              </Text>
              <View
                style={{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.card,
                  ...GlobalStyleSheet.shadow,
                }}
              >
                <TextInput
                  style={{ ...GlobalStyleSheet.Input, color: colors.text }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  ...FONTS.fontXs,
                  color: COLORS.primary,
                  marginBottom: 6,
                }}
              >
                {t('Message', { ns: ['all'] })}
              </Text>
              <View
                style={{
                  ...GlobalStyleSheet.formControl,
                  backgroundColor: colors.card,
                  height: 'auto',
                  ...GlobalStyleSheet.shadow,
                }}
              >
                <TextInput
                  multiline
                  numberOfLines={7}
                  style={{
                    ...GlobalStyleSheet.Input,
                    height: 120,
                    color: colors.text,
                    textAlignVertical: 'top',
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 15,
        }}
      >
        <PrimaryButton title={t('Add Ticket', { ns: ['all'] })} />
      </View>
    </>
  );
}

export default HelpCreateTicket;
