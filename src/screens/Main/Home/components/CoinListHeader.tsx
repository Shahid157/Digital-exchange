import React from 'react';
import { View } from 'react-native';
import PrimaryCheckbox from 'shared/components/PrimaryCheckbox';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from '../../../../shared/components/AppText';
import { THEME } from '../../../../shared/theme';
import styles from './styles';

export default function CoinListHeader({ t, checked, setChecked }: any) {
  return (
    <View>
      <View style={styles.containerCoinList}>
        <AppText h3 semiBold>
          {t('Assets')}
        </AppText>
        <View style={styles.textContainer}>
          <AppText color={THEME.COLORS.textGrey} medium>
            {t('Value')}{' '}
          </AppText>
          <AnyIcon
            type={Icons.Entypo}
            name="chevron-down"
            size={20}
            color={THEME.COLORS.textGrey}
          />
        </View>
      </View>
      <PrimaryCheckbox
        isSmallBal
        textStyle={styles.textStyle}
        checkBoxStyle={styles.checkBoxStyle}
        checked={checked}
        setChecked={setChecked}
        onCheckColor={THEME.COLORS.primary}
        title={t('Hide Small Balances')}
      />
    </View>
  );
}
