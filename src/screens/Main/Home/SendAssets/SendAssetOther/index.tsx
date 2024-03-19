import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { THEME } from 'shared/theme';
import SendCoinInput from 'shared/components/SendCoinInput';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Clipboard from '@react-native-clipboard/clipboard';
import { SvgUri } from 'react-native-svg';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import { numberRoundDown } from 'shared/utils/numberRoundDown';
import { limitedDecimalInputs } from 'shared/utils/limitedDecimalInputs';
import FastImage from 'react-native-fast-image';
import { GetImageForCoin } from 'assets/images/coins';
import { useSelector } from 'react-redux';
import { toast } from '../../../../../shared/services/helper.service';
import { useLazyUserExistsQuery } from '../../../../../shared/store/apis/users.api';
import UsernameInput from '../../../../../shared/components/UsernameInput';
import styles from './styles';
import { GenericNavigation } from '../../types';
import { RootState } from '../../../../../shared/store';

function SendAssetOther(props: GenericNavigation) {
  const { coin }: any = props?.route?.params;
  const { t } = useTranslation(['all']);
  const [amount, setAmount] = useState(0);
  const [amountStr, setAmountStr] = useState('');
  const [amountError, setAmountError] = useState('');
  const [receiver, setReceiver] = useState(__DEV__ ? '' : '');
  const { isLocal } = coin.currency;
  const user = useSelector((state: RootState) => state.session.user);
  const [userExistQuery] = useLazyUserExistsQuery();

  const handleReceiver = (username: string) => {
    setReceiver(username.toLowerCase().trim() || '');
  };

  const changeTextDebounced = (text: string) => {
    if (isNaN(Number(text))) {
      setAmount(0);
      setAmountError('invalid amount');
      return;
    }
    const value = Number(text);
    setAmount(Number(text));
    if (value > coin?.amount) {
      setAmountError('Amount should be less then available balance');
      return;
    }
    setAmountError('');
  };

  const changeTextDebouncer = useCallback(
    debounce(changeTextDebounced, 500),
    []
  );

  const onContinuePress = async () => {
    try {
      if (amountStr > coin?.amount) {
        toast(
          t('Error'),
          t('Amount should be less then available balance'),
          'error'
        );
        return;
      }
      const targetUser = receiver.toLowerCase();
      if (targetUser === user?.username || targetUser === user?.email) {
        toast(t('Error'), t('You cannot send assets to yourself'), 'error');
        return;
      }

      const { exists } = await userExistQuery(receiver).unwrap();
      if (!exists) {
        toast(t('Error'), t('userDoesNotExist'), 'error');
        return;
      }

      props?.navigation?.navigate('ReviewRequest', {
        coin,
        transferAmount: parseFloat(amountStr),
        recipient: receiver,
      });
    } catch (error) {
      toast(t('Error'), t('Network Error'), 'error');
    }
  };

  const onPaste = async () => {
    const clipboardContent = await Clipboard.getString();
    if (clipboardContent) {
      handleReceiver(clipboardContent);
    }
  };

  const setMaxValue = () => {
    const text = coin?.amount?.toString() || '';
    const numerRoundDown = numberRoundDown(Number(text), 6);
    changeTextDebouncer(numerRoundDown);
    setAmountStr(numerRoundDown);
  };

  function RowData({ label, value, loading, colorValue }: any) {
    return (
      <View style={styles.rowCont}>
        <AppText color={THEME.COLORS.textGrey}>{label}</AppText>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <AppText color={colorValue || THEME.COLORS.textGrey}>{value}</AppText>
        )}
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <AppHeader leftIcon="back" title={t('Send Assets')} />
        <View style={{ margin: THEME.MARGIN.LOW }}>
          <View style={styles.coinBox}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <AppText h4 color="#979797">
                {t('Enter Amount')}:
              </AppText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                  borderRightWidth: 1,
                  borderRightColor: '#fff',
                  marginRight: 5,
                  paddingRight: THEME.PADDING.LOW,
                }}
              >
                {!isLocal && (
                  <SvgUri
                    width={RF(22)}
                    height={RF(22)}
                    style={styles.coinIcon}
                    uri={coin?.currency.image}
                  />
                )}
                {isLocal && (
                  <FastImage
                    source={GetImageForCoin(coin?.currency?.ticker || '')}
                    style={styles.localCoin}
                    resizeMode="contain"
                  />
                )}
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <AppText
                      h3
                      medium
                      style={{ textTransform: 'uppercase', marginTop: 4 }}
                    >
                      {coin.currency.ticker}
                    </AppText>
                    <AppText
                      color={THEME.COLORS.primary}
                      style={{
                        backgroundColor: THEME.COLORS.secondaryBackground,
                        height: 16,
                        paddingHorizontal: 4,
                        borderRadius: THEME.RADIUS.SMALLBOX,
                        marginLeft: 5,
                      }}
                      h5
                      medium
                    >
                      {coin.currency.network.toUpperCase()}
                    </AppText>
                  </View>
                </View>
              </View>

              <SendCoinInput
                style={{ backgroundColor: '#191C1B' }}
                coin={coin}
                keyboardType="decimal-pad"
                hideChevron
                value={amountStr}
                onChangeText={(text) =>
                  limitedDecimalInputs(text, setAmountStr)
                }
                showRightText
                rightText="Max"
                onPressRightText={setMaxValue}
                parentContainerStyle={{
                  flex: 1,
                  right: RF(2),
                }}
              />
            </View>

            {amountError && (
              <AppText
                color={THEME.COLORS.errorRed}
                style={{ marginVertical: THEME.MARGIN.SUPERLOW }}
                medium
              >
                {t(amountError)}
              </AppText>
            )}
          </View>
          <AppText
            style={{
              alignSelf: 'flex-end',
              marginTop: 10,
              color: THEME.COLORS.textDarkGrey,
            }}
            medium
          >
            {t('Available')}:
            <AppText style={{ color: THEME.COLORS.textDarkGrey }}>
              {numberRoundDown(coin?.amount, 6)} {coin?.ticker.toUpperCase()}
            </AppText>
          </AppText>

          <View
            style={[
              styles.coinBox,
              { marginTop: THEME.MARGIN.LOW, backgroundColor: '#181818' },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <AppText h4 color="#979797">
                {t('Enter Username or Email')}:
              </AppText>
            </View>

            <UsernameInput
              placeholder={t('Username or Email')}
              value={receiver}
              onChangeText={handleReceiver}
              rightText={t('Paste')}
              onPressRightText={onPaste}
              showRightText
              inputStyle={{
                width: '100%',
                backgroundColor: '#181818',
                borderWidth: 0,
              }}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.amountCard}>
            <AppText style={{ marginVertical: THEME.MARGIN.VERYLOW }} medium>
              {t('Summary')}
            </AppText>

            <RowData
              label={`${t('Fees')}:`}
              value={t('No Fees')}
              loading={false}
              colorValue="#5AFF6B"
            />

            <View style={styles.finalAmountRow}>
              <AppText>{t('You will send')}:</AppText>

              <AppText
                style={{ width: '66%', textAlign: 'right' }}
                h3
                semiBold
                color={THEME.COLORS.secondaryYellow}
              >
                {amountStr}
              </AppText>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <PrimaryButton
            buttonStyle={{ width: '100%' }}
            title={t('Continue')}
            onPress={onContinuePress}
            disabled={
              Boolean(parseFloat(amountStr) <= 0) ||
              Boolean(amount > coin?.amount || Boolean(!receiver))
            }
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SendAssetOther;
