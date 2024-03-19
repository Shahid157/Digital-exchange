import React, { useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { THEME } from 'shared/theme';
import AppText from 'shared/components/AppText';
import { useTranslation } from 'react-i18next';
import { HP, RF } from 'shared/theme/responsive';
import { useBackHandler } from '@react-native-community/hooks';
import { Icons } from 'shared/components/AnyIcon';
import AppInput from 'shared/components/AppInput';
import AssetModalListItem from 'shared/components/SwapAssets/AssetModalListItem';
import { AssetBottomSheetProps } from 'screens/Main/Home/types';
import { CoinWithCurrency } from '../../../../../../shared/types';

export default function AssetBottomSheet(props: AssetBottomSheetProps) {
  const {
    sheetIndex,
    assets,
    otherSelectedCoin,
    searchText,
    coinLoading,
    setSheetIndex,
    onChange,
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
    if (sheetIndex === 1) {
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
      handleIndicatorStyle={{
        width: 0,
        height: 0,
      }}
    >
      <View style={styles.modal}>
        <AppText h2 medium>
          {t('Select Coin')}
        </AppText>
        <AppInput
          leftIconType={Icons.AntDesign}
          leftIcon="search1"
          placeholder={t('Search', { ns: ['all'] })}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          inputStyle={styles.inputStyle}
        />

        {coinLoading ? (
          <ActivityIndicator
            size="large"
            color={THEME.COLORS.secondaryYellow}
          />
        ) : (
          <View style={styles.flatList}>
            <BottomSheetFlatList
              style={{ marginBottom: RF(30) }}
              showsVerticalScrollIndicator={false}
              data={assets}
              renderItem={({ item }: { item: CoinWithCurrency }) => {
                const isDisabled = otherSelectedCoin?.id === item.id;
                return (
                  <AssetModalListItem
                    key={item.id}
                    disabled={isDisabled}
                    item={item}
                    onPress={() => onSelectAsset(item)}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  modalContainer: {
    borderRadius: THEME.RADIUS.MEDIUM,
    backgroundColor: '#262626',
  },
  modal: {
    flex: 1,
    backgroundColor: '#262626',
    paddingHorizontal: RF(14),
  },
  inputStyle: {
    borderWidth: 1,
    backgroundColor: '#262626',
    borderColor: '#979797',
    shadowColor: '#979797',
    height: RF(40),
    marginVertical: RF(16),
  },
});
