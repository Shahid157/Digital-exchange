import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import SwapCoinInput from 'shared/components/SwapCoinInput';
import { THEME } from 'shared/theme';
import { SvgUri } from 'react-native-svg';
import NetworkTag from 'shared/components/NetworkTag';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import { SwapCardProps } from 'screens/Main/Home/types';
import FastImage from 'react-native-fast-image';
import { GetImageForCoin } from 'assets/images/coins';

function SwapCard({
  title,
  coinItem,
  toggleModal,
  value,
  onChangeText,
  rateLoading,
  handleMaxValue,
  titleValidator,
  coinBoxStyle,
}: SwapCardProps) {
  const { t } = useTranslation(['all']);

  const isLocal = coinItem?.currency?.isLocal || false;

  const setMaxValue = () => {
    handleMaxValue(coinItem?.amount);
  };

  return (
    <View style={[styles.coinBox, coinBoxStyle]}>
      <View style={styles.container}>
        <AppText h4 color="#979797">
          {title}
        </AppText>
        <TouchableOpacity onPress={toggleModal}>
          <View style={styles.coinPress}>
            {coinItem ? (
              <>
                {!isLocal && (
                  <SvgUri
                    width={RF(22)}
                    height={RF(22)}
                    style={styles.coinIcon}
                    uri={coinItem?.currency.image}
                  />
                )}
                {isLocal && (
                  <FastImage
                    source={GetImageForCoin(coinItem?.currency?.ticker || '')}
                    style={styles.localCoin}
                    resizeMode="contain"
                  />
                )}

                <View style={styles.coinPress}>
                  <AppText h3 medium style={{ textTransform: 'uppercase' }}>
                    {coinItem?.ticker}
                  </AppText>
                  <NetworkTag network={coinItem?.network} />
                </View>
              </>
            ) : (
              <AppText>{t('Select Coin')}</AppText>
            )}

            <AnyIcon
              type={Icons.Entypo}
              name="chevron-down"
              size={20}
              color={THEME.COLORS.white}
            />
          </View>
        </TouchableOpacity>
      </View>

      {titleValidator == 'To' ? (
        rateLoading ? (
          <View style={{ height: RF(58), justifyContent: 'center' }}>
            <ActivityIndicator
              size="small"
              color={THEME.COLORS.secondaryYellow}
              style={{ alignSelf: 'flex-start' }}
            />
          </View>
        ) : (
          <SwapCoinInput
            editable={Boolean(titleValidator == 'From')}
            coin={coinItem}
            keyboardType="decimal-pad"
            hideChevron
            value={String(value)}
            onPressRightText={setMaxValue}
            onChangeText={onChangeText}
            showRightText={Boolean(titleValidator == 'From')}
            rightText="Max"
            parentContainerStyle={{
              width: '100%',
            }}
          />
        )
      ) : (
        <SwapCoinInput
          editable={Boolean(titleValidator == 'From')}
          coin={coinItem}
          keyboardType="decimal-pad"
          hideChevron
          value={String(value)}
          onChangeText={onChangeText}
          onPressRightText={setMaxValue}
          showRightText={Boolean(titleValidator == 'From')}
          rightText="Max"
          parentContainerStyle={{
            width: '100%',
          }}
        />
      )}
    </View>
  );
}

export default SwapCard;

const styles = StyleSheet.create({
  coinBox: {
    backgroundColor: '#262626',
    padding: RF(12),
    paddingBottom: 0,
    borderRadius: THEME.RADIUS.SMOOTH,
    zIndex: 9,
    position: 'relative',
  },
  coinIcon: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.NORMAL,
    marginRight: RF(6),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinPress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  localCoin: {
    width: RF(28),
    height: RF(28),
    marginRight: RF(10),
  },
});
