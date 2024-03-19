import React, { useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { View, StyleSheet } from 'react-native';
import { THEME } from 'shared/theme';
import { useTranslation } from 'react-i18next';
import { HP, RF } from 'shared/theme/responsive';
import { useBackHandler } from '@react-native-community/hooks';
import { Icons } from 'shared/components/AnyIcon';
import AppInput from 'shared/components/AppInput';
import CoinModalListItem from 'shared/components/SwapAssets/CoinModalListItem';
import { CoinBottomSheetProps } from 'screens/Main/Home/types';

const CoinBottomSheet: React.FC<CoinBottomSheetProps> = (props) => {
  const {
    sheetIndex,
    setSheetIndex,
    currencies,
    otherSelectedCoin,
    onChange,
    searchText,
    setSearchText,
    onSelectAsset,
    onClose,
  } = props;
  const { t } = useTranslation(['all']);
  const snapPoints = useMemo(() => [0.01, HP(70)], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        pressBehavior="close"
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
      onClose={onClose}
      index={sheetIndex}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.modalContainer}
      onChange={onChange}
      handleIndicatorStyle={{ backgroundColor: THEME.COLORS.primary }}
    >
      <View style={styles.modal}>
        <AppInput
          leftIconType={Icons.Feather}
          leftIcon="search"
          placeholder={t('Search', { ns: ['all'] })}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          inputStyle={styles.newinputStyle}
        />

        <View style={styles.flatList}>
          <BottomSheetFlatList
            data={currencies}
            renderItem={({ item, index }: any) => {
              const isDisabled =
                otherSelectedCoin?.ticker == item?.ticker &&
                otherSelectedCoin?.network == item?.network;

              return (
                <CoinModalListItem
                  disabled={isDisabled}
                  key={index}
                  item={item}
                  onPress={() => onSelectAsset(item)}
                />
              );
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default CoinBottomSheet;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  modalContainer: {
    borderRadius: THEME.RADIUS.MEDIUM,
    backgroundColor: '#262626', // Overlay color with 50% opacity
  },
  modal: {
    flex: 1,
    backgroundColor: '#262626', // Modal background color
    padding: RF(10),
  },
  inputStyle: {
    borderWidth: 1,
    backgroundColor: '#262626',
    borderColor: '#979797',
    shadowColor: '#979797',
    height: RF(40),
    marginVertical: RF(16),
  },
  newinputStyle: {
    backgroundColor: '#363636',
    borderColor: '#363636',
    shadowColor: '#979797',
  },
  handleIndicatorStyle: { backgroundColor: THEME.COLORS.primary },
});
