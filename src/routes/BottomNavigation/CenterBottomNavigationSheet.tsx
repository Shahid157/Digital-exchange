import React, { useCallback, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTranslation } from 'react-i18next';
import { useBackHandler } from '@react-native-community/hooks';
import { THEME } from '../../shared/theme';
import { txButtons } from '../../shared/constants/AppConstants';
import ROUTE_NAMES from '../RouteNames';
import SecondaryButton from '../../shared/components/SecondaryButton';
import { ICONS } from '../../assets/images/icons';
import { Icons } from '../../shared/components/AnyIcon';
import { RF } from '../../shared/theme/responsive';

export interface CenterBottomNavigationSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOptionSeleted: (option: string) => void;
}

export default function CenterBottomNavigationSheet(
  props: CenterBottomNavigationSheetProps
) {
  const { t } = useTranslation('all');
  const { open, setOpen, onOptionSeleted } = props;
  const [index, setIndex] = React.useState(0);
  const snapPoints = React.useMemo(() => [0.1, '60%'], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  useEffect(() => {
    const index = open ? 1 : 0;
    setIndex(index);
  }, [open]);

  useBackHandler(() => {
    if (open) {
      setOpen(false);
      return true;
    }
    return false;
  });

  return (
    <BottomSheet
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={() => setOpen(false)}
      backgroundStyle={styles.backgroundStyle}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicatorStyle}
    >
      <View style={{ padding: THEME.PADDING.NORMAL }}>
        <ScrollView>
          {txButtons.map((i: any, index: any) => {
            const screenName =
              i.title == 'Withdraw'
                ? ROUTE_NAMES.WITHDRAW_ASSETS
                : i.title == 'swapping'
                ? ROUTE_NAMES.EXCHANGE_CURRENCY
                : i.title == 'Send'
                ? ROUTE_NAMES.SEND_ASSETS
                : ROUTE_NAMES.CHOOSE_CURRENCY;
            return (
              <SecondaryButton
                key={index}
                image={i.title == 'Withdraw' && ICONS.WITHDRAW}
                colorImage={THEME.COLORS.secondaryYellow}
                leftIcon={i.title == 'Withdraw' ? null : i.iconName}
                leftIconType={
                  i?.title == 'swapping' || i?.title == 'Withdraw'
                    ? Icons.AntDesign
                    : Icons.Feather
                }
                leftIconColor={THEME.COLORS.secondaryYellow}
                title={t(i.title)}
                buttonStyle={styles.txButtons}
                textStyle={styles.buttonText}
                onPress={() => {
                  setOpen(false);
                  onOptionSeleted(screenName);
                }}
              />
            );
          })}
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={styles.closeButton}
          >
            <Entypo disabled name="cross" size={30} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  txButtons: {
    height: RF(50),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    paddingLeft: THEME.PADDING.NORMAL,
    marginVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.iconGrey,
    shadowOpacity: 0,
  },
  closeButton: {
    width: RF(50),
    height: RF(50),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: THEME.RADIUS.OVAL,
    backgroundColor: THEME.COLORS.secondaryYellow,
  },
  buttonText: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  backgroundStyle: {
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
  handleIndicatorStyle: {
    backgroundColor: THEME.COLORS.inputGrey,
  },
});
