import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { useTranslation } from 'react-i18next';
import { MFAMethods, UserMfaMethod } from 'shared/models/types';
import SecondaryButton from '../../../../shared/components/SecondaryButton';
import { THEME } from '../../../../shared/theme';
import { Icons } from '../../../../shared/components/AnyIcon';
import AppText from '../../../../shared/components/AppText';
import { RF } from '../../../../shared/theme/responsive';
import { getMethodIcon, getMethodName } from '../lib/utils';

export interface MFABottomSheetProps {
  methods: UserMfaMethod[];
  open: boolean;
  setOpen: (open: boolean) => void;
  onChangeMethodType: (type: MFAMethods) => void;
}

export default function MFABottomSheet(props: MFABottomSheetProps) {
  const { t } = useTranslation(['all']);
  const ref = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [0.1, '45%'], []);
  const [index, setIndex] = useState(0);

  const { methods, open, onChangeMethodType } = props;

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        onPress={() => {}}
      />
    ),
    []
  );

  useEffect(() => {
    const index = open ? 1 : 0;
    setIndex(index);
  }, [open]);

  return (
    <Portal>
      <BottomSheet
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => props?.setOpen(false)}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetContainer}
        handleIndicatorStyle={styles.bottomSheetContainerHandleIndicator}
      >
        <View style={{ padding: THEME.PADDING.NORMAL }}>
          <View style={styles.bottomHeader}>
            <AppText h3>{t('Choose Method')}</AppText>
          </View>

          {methods.map((method) => (
            <SecondaryButton
              title={t(getMethodName(method.type))}
              leftIcon={getMethodIcon(method.type)}
              leftIconType={Icons.FontAwesome}
              leftIconColor={THEME.COLORS.secondaryYellow}
              buttonStyle={styles.button}
              onPress={() => {
                props?.setOpen(false);

                onChangeMethodType(method.type);
              }}
              textStyle={styles.bottomSheetTextItem}
            />
          ))}
        </View>
      </BottomSheet>
    </Portal>
  );
}

const styles = StyleSheet.create({
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
  bottomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: THEME.PADDING.NORMAL,
    borderBottomWidth: 0.5,
    borderColor: THEME.COLORS.textGrey,
  },
  bottomSheetContainer: {
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
  bottomSheetTextItem: {
    fontSize: THEME.FONTS.SIZE.XSMALL,
    fontFamily: THEME.FONTS.TYPE.REGULAR,
  },
  bottomSheetContainerHandleIndicator: {
    backgroundColor: THEME.COLORS.primary,
  },
});
