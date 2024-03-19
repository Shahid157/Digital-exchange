import React, { useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { RF } from 'shared/theme/responsive';
import { useBackHandler } from '@react-native-community/hooks';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import SecondaryButton from 'shared/components/SecondaryButton';
import { GetNetworkName } from 'shared/services/helper.service';
import { DepositBottomShtProps } from '../../types';

const DepositBottomSheet: React.FC<DepositBottomShtProps> = ({
  sheetIndex,
  setSheetIndex,
  networks,
  setNetwork,
}) => {
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.1, '75%'], []);

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

  useBackHandler(() => {
    if (sheetIndex == 1) {
      setSheetIndex(0);
      return true;
    }
    return false;
  });

  return (
    <BottomSheet
      onClose={() => setSheetIndex(0)}
      index={sheetIndex}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: 'rgba(25, 28, 27, 1)',
      }}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: THEME.COLORS.inputGrey,
      }}
    >
      <View style={{ flex: 1, padding: THEME.PADDING.NORMAL }}>
        <View style={styles.bottomSheetHeader}>
          <AppText h2 semiBold>
            {t('Choose Network')}
          </AppText>
          <AnyIcon
            onPress={() => setSheetIndex(0)}
            type={Icons.AntDesign}
            name="close"
            size={18}
            color={THEME.COLORS.white}
          />
        </View>
        <View style={styles.alertView}>
          <View style={styles.iconContainer}>
            <AnyIcon
              type={Icons.AntDesign}
              name="notification"
              size={15}
              color={THEME.COLORS.secondaryYellow}
              style={{ transform: [{ scaleX: -1 }] }}
            />
          </View>

          <AppText
            style={{ width: '90%' }}
            color={THEME.COLORS.secondaryYellow}
            h5
            medium
          >
            {t(
              'Make sure to deposit the assets to the supported networks given below. Depositing via another network may be lost'
            )}
          </AppText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <BottomSheetFlatList
            data={networks}
            renderItem={({ item, index }: any) => (
              <SecondaryButton
                key={index}
                onPress={() => {
                  setNetwork(item);
                  setSheetIndex(0);
                }}
                title={GetNetworkName(item)}
                buttonStyle={styles.txButtons}
                textStyle={{
                  color: 'white',
                  fontSize: THEME.FONTS.SIZE.XSMALL,
                  fontFamily: THEME.FONTS.TYPE.REGULAR,
                }}
              />
            )}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default DepositBottomSheet;

const styles = StyleSheet.create({
  bottomSheetHeader: {
    borderBottomWidth: 0.7,
    paddingVertical: RF(10),
    borderColor: THEME.COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RF(10),
    backgroundColor: 'black',
    borderRadius: THEME.RADIUS.BOX,
    marginVertical: THEME.MARGIN.LOW,
  },
  txButtons: {
    height: RF(50),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    paddingLeft: THEME.PADDING.NORMAL,
    marginVertical: THEME.PADDING.LOW,
    backgroundColor: 'rgba(38, 38, 38, 1)',
    shadowOpacity: 0,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: RF(30),
    width: RF(30),
    borderRadius: THEME.RADIUS.SMALLBOX,
    backgroundColor: THEME.COLORS.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RF(10),
  },
  button: {
    height: RF(60),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: THEME.RADIUS.BOX,
    paddingLeft: THEME.PADDING.NORMAL,
    marginVertical: THEME.PADDING.LOW,
    backgroundColor: THEME.COLORS.iconGrey,
    shadowOpacity: 0,
  },
});
