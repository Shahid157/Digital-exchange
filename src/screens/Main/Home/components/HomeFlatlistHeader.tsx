import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import DashboardButtons from 'shared/components/DashboardButtons';
import styles from './styles';
import BalanceCard from '../../../../shared/components/BalancesCard';
import {
  adminModuleCard,
  dashboardButtons,
  txButtons,
} from '../../../../shared/constants/AppConstants';
import TxButtons from '../../../../shared/components/TxButtons';
import ROUTE_NAMES from '../../../../routes/RouteNames';
import { useAppSelector } from '../../../../shared/hooks/redux';
import KycRestrictionBottomSheet from './KycRestrictionBottomSheet';
import { THEME } from '../../../../shared/theme';
import { BSP_TICKER } from '../../../../shared/store/slices/aztc-deposits/aztc-deposits.types';

export default function HomeFlatlistHeader({ t, navigation }: any) {
  const user = useAppSelector((state) => state.session.user);
  const currencies = useAppSelector((state) => state.currencies?.currencies);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [showDailyEarns, setShowDailyEarns] = useState(false);

  useEffect(() => {
    const data = currencies.find(
      (item) => item.ticker == BSP_TICKER && item.enabled
    );
    setShowDailyEarns(Boolean(data));
  }, [currencies]);

  return (
    <>
      <View style={styles.subContainer}>
        <BalanceCard />
        <View style={styles.txButtons}>
          {txButtons.map((item) => {
            const params: Record<string, any> = {};
            switch (item.routeName) {
              case ROUTE_NAMES.OPT_SWITCHER:
                params.onOptEntered = () => {
                  Toast.show({
                    text1: t('Success'),
                    text2: t('You have successfully enabled 2FA'),
                    type: 'success',
                  });
                };
                break;
              default:
                break;
            }
            return (
              <TxButtons
                key={item.routeName}
                iconName={item.iconName}
                title={t(item.title, { ns: ['all'] })}
                onPress={() => {
                  if (user?.kycVerification?.status !== 'verified') {
                    setBottomSheetOpen(true);
                    return;
                  }

                  navigation?.navigate(item.routeName, {
                    screen: item.title,
                    ...params,
                  });
                }}
              />
            );
          })}
        </View>
        <View
          style={{
            marginHorizontal: THEME.MARGIN.LOW,
            marginBottom: THEME.MARGIN.NORMAL,
            marginTop: THEME.MARGIN.VERYLOW,
          }}
        >
          <View style={styles.dashboardButtons}>
            {showDailyEarns &&
              dashboardButtons
                .filter((it) => {
                  if (it.title !== 'admin_module') {
                    return true;
                  }
                  return user?.tempAdmin === true;
                })
                .map((i: any, j: any) => (
                  <DashboardButtons
                    key={j}
                    iconName={i.iconName}
                    title={t(i.title)}
                    description={t(i.description)}
                    onPress={() => {
                      navigation?.navigate(i.screen, { title: t(i.title) });
                    }}
                  />
                ))}
          </View>

          {user?.tempAdmin && false && (
            <View style={styles.dashboardButtons}>
              {adminModuleCard.map((i: any, j: any) => (
                <DashboardButtons
                  styles={{ marginBottom: THEME.MARGIN.VERYLOW }}
                  key={j}
                  iconName={i.iconName}
                  title={t(i.title)}
                  description={t(i.description)}
                  onPress={() => {
                    navigation?.navigate(i.screen, { title: t(i.title) });
                  }}
                />
              ))}
            </View>
          )}
        </View>
      </View>

      <KycRestrictionBottomSheet
        open={bottomSheetOpen}
        setOpen={setBottomSheetOpen}
        onCompleteKyc={() => {
          setBottomSheetOpen(false);
          navigation?.navigate(ROUTE_NAMES.COMPLETE_KYC);
        }}
      />
    </>
  );
}
