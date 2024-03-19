import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { SECRET_STRING } from 'shared/constants/AppConstants';
import { RootState } from 'shared/store';
import {
  setShowBalances,
  setShowTotalBal,
} from 'shared/store/reducers/settingsReducer';
import { THEME } from 'shared/theme';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import { useNavigation } from '@react-navigation/native';
import ROUTE_NAMES from 'routes/RouteNames';
import { formatAssetAmmount } from 'shared/services/helper.service';
import { useWalletWithCoins } from 'screens/Main/Home/hooks/useWalletWithCoins';
import { COINS } from 'assets/images/coins';
import FastImage from 'react-native-fast-image';
import { useWalletGlobalBalances } from '../../../screens/Main/Home/hooks/useWalletGlobalBalances';

interface Props {}

function BalanceCard(props?: Props) {
  const navigation = useNavigation();
  const { showBalances } = useSelector(
    (state: RootState) => state.settings,
    // Memoize the selector to avoid unnecessary re-renders
    (prev, next) => prev.showBalances === next.showBalances
  );
  const { showTotalBal } = useSelector(
    (state: RootState) => state.settings,
    // Memoize the selector to avoid unnecessary re-renders
    (prev, next) => prev.showTotalBal === next.showTotalBal
  );
  const coins = useWalletWithCoins();

  const balance = useWalletGlobalBalances();

  const balanceStr = useMemo(
    () => (balance ? balance[0]?.toFixed(3) : '0'),
    [balance]
  );

  const dispatch = useDispatch();

  const toggleBalances = () => dispatch(setShowBalances(!showBalances));
  const toggleShowTotalBal = () => dispatch(setShowTotalBal(!showTotalBal));

  const { t, i18n } = useTranslation(['all']);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppText color={THEME.COLORS.accentWhite} semiBold>
          {t('Bal Total')}
        </AppText>
        <AnyIcon
          style={{ marginLeft: THEME.MARGIN.VERYLOW }}
          onPress={toggleShowTotalBal}
          type={Icons.AntDesign}
          name={showTotalBal ? 'caretdown' : 'caretright'}
          color={THEME.COLORS.accentWhite}
        />
      </View>
      {showTotalBal ? (
        <View style={styles.balanceCard}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AppText style={styles.balance} semiBold>
                {showBalances ? `${balanceStr}` : SECRET_STRING}
              </AppText>
              <AnyIcon
                onPress={toggleBalances}
                type={Icons.Ionicons}
                name={showBalances ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color={THEME.COLORS.accentWhite}
              />
            </View>

            <TouchableOpacity
              style={styles.blockedFundsView}
              onPress={() =>
                navigation?.navigate(ROUTE_NAMES.BLOCKED_FUNDS as never)
              }
            >
              <AppText h5 style={styles.blockedFunds} medium>
                {t('Blocked Funds')}: ${formatAssetAmmount(balance[1])}
              </AppText>
              <AnyIcon
                type={Icons.Entypo}
                name="chevron-right"
                size={18}
                color={THEME.COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.currency}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FastImage
                source={COINS.USD}
                style={styles.icon}
                resizeMode={FastImage.resizeMode.contain}
              />
              <AppText
                semiBold
                h5
                color={THEME.COLORS.textGrey}
                style={{ marginHorizontal: THEME.MARGIN.LOW }}
              >
                USD
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
export default BalanceCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: THEME.RADIUS.BOX,
    padding: THEME.PADDING.NORMAL,
  },
  balanceCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  balance: {
    marginRight: THEME.MARGIN.LOW,
    fontSize: RF(30),
  },
  blockedFunds: {
    marginRight: THEME.MARGIN.LOW,
  },
  icon: {
    height: RF(20),
    width: RF(20),
    borderRadius: THEME.RADIUS.OVAL,
  },
  currency: {
    backgroundColor: THEME.COLORS.lightGrayBackground,
    borderRadius: THEME.RADIUS.OVAL,
    padding: RF(4),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: RF(15),
  },
  blockedFundsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
