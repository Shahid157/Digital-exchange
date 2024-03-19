import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from 'shared/components/AppHeader';
import { IMAGES } from 'assets/images';
import PrimaryButton from 'shared/components/PrimaryButton';
import ROUTE_NAMES from 'routes/RouteNames';
import { useBackHandler } from '@react-native-community/hooks';
import { GenericNavigation } from '../../../types';
import { RF } from '../../../../../../shared/theme/responsive';

function WithdrawAztcSuccessScreen(props: GenericNavigation) {
  const { t } = useTranslation(['all']);

  useBackHandler(() => {
    props?.navigation?.navigate(ROUTE_NAMES.HOME);
    return true;
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AppHeader
        leftIcon="back"
        title={t('Confirmation')}
        rightIconType={Icons.MaterialCommunityIcons}
        rightIconColor={THEME.COLORS.secondaryYellow}
        leftIconPress={() => props?.navigation?.navigate(ROUTE_NAMES.HOME)}
      />

      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Image source={IMAGES.timeIcon} style={styles.timeIcon} />
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              paddingHorizontal: THEME.PADDING.VERYLOW,
            }}
          >
            <Text
              style={{
                flex: 1,
                color: THEME.COLORS.BLACK,
                fontFamily: THEME.FONTS.TYPE.REGULAR,
                fontSize: THEME.FONTS.SIZE.SMALL,
              }}
            >
              {t('confirming_withdrawal')}
            </Text>

            <Text
              style={{
                flex: 1,
                color: THEME.COLORS.placeholderTextColor,
                fontFamily: THEME.FONTS.TYPE.REGULAR,
                marginStart: THEME.MARGIN.VERYLOW,
              }}
            >
              {t('confirming_withdrawal_txt')}
            </Text>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <AppText color={THEME.COLORS.white} h1 bold>
            {t('withdrawal_confirmation')}
          </AppText>
          <AnyIcon
            disabled
            type={Icons.AntDesign}
            name="checkcircle"
            size={100}
            style={styles.tickIcon}
            color={THEME.COLORS.secondaryYellow}
          />

          <AppText color={THEME.COLORS.secondaryYellow} h2 medium>
            {t('Your Transaction was Successful')}
          </AppText>
        </View>
        <PrimaryButton
          buttonStyle={{ width: '100%' }}
          title={t('close_withdrawal')}
          onPress={() => props?.navigation?.navigate(ROUTE_NAMES.HOME)}
        />
      </View>
    </SafeAreaView>
  );
}

export default WithdrawAztcSuccessScreen;

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: 'black', flex: 1 },
  viewContainer: {
    paddingVertical: THEME.MARGIN.LOW,
    backgroundColor: THEME.COLORS.secondaryYellow,
    borderRadius: THEME.RADIUS.HIGH,
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeIcon: {
    marginHorizontal: THEME.PADDING.LOW,
    height: RF(40),
    width: RF(40),
  },
  tickIcon: {
    marginVertical: THEME.PADDING.LOW,
  },
  container: {
    margin: THEME.MARGIN.NORMAL,
    flex: 1,
  },
});
