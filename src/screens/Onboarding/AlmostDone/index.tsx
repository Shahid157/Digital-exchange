import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ICONS } from 'assets/images/icons';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import AppText from 'shared/components/AppText';
import PrimaryButton from 'shared/components/PrimaryButton';
import { GenericNavigation } from 'shared/models/types';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { setFirstTime } from 'shared/store/reducers/settingsReducer';
import { useTranslation } from 'react-i18next';
import { setSession } from '../../../shared/store/slices/session/session.slice';
import AppLoader from '../../../shared/components/AppLoader';

function AlmostDone(props: GenericNavigation) {
  const result = props?.route?.params?.result;
  const { t } = useTranslation(['all']);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const onDone = async () => {
    setLoading(true);
    dispatch(setFirstTime(false));
    dispatch(setSession(result));
  };

  return (
    <View style={GLOBAL_STYLE.MAIN}>
      {loading && <AppLoader isVisible />}

      <FastImage
        source={ICONS.SUCCESS}
        style={styles.fastImage}
        resizeMode={FastImage.resizeMode.contain}
      />

      <AppText medium secondaryTitle semiBold style={styles.textStyle}>
        {t('We are Almost Done!', { ns: ['all'] })}
      </AppText>

      <View style={styles.flexStyle} />
      <PrimaryButton title={t('DONE', { ns: ['all'] })} onPress={onDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  fastImage: {
    marginVertical: THEME.MARGIN.HIGH,
    alignSelf: 'center',
    width: RF(150),
    flex: 1,
    height: RF(150),
  },
  textStyle: {
    alignSelf: 'center',
  },
  flexStyle: {
    flex: 1,
  },
});

export default AlmostDone;
