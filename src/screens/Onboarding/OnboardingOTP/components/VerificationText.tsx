import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppText from '../../../../shared/components/AppText';
import { THEME } from '../../../../shared/theme';
import { RF } from '../../../../shared/theme/responsive';

export type Props = {
  expiresIn: string | null;
  handleOnResendCode: () => void;
};

export default function VerificationText(props: Props) {
  const { expiresIn, handleOnResendCode } = props;

  const { t } = useTranslation();

  return (
    <>
      <View style={styles.textContainer}>
        {expiresIn ? (
          <AppText>{`${t('This code will expire in')} ${expiresIn}`}</AppText>
        ) : (
          <AppText>{t('Code expired')} </AppText>
        )}

        <TouchableOpacity onPress={handleOnResendCode} disabled={!!expiresIn}>
          <AppText
            semiBold
            color={expiresIn ? '#191C1B' : THEME.COLORS.primary}
          >
            {t('Resend')}
          </AppText>
        </TouchableOpacity>
      </View>

      <AppText style={styles.textStyle}>{t("Can't find the code?")}</AppText>

      <AppText style={styles.text}>
        {t("Don't forget to check your spam folder")}
      </AppText>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textStyle: {
    alignSelf: 'center',
    marginTop: RF(40),
    color: THEME.COLORS.textGrey,
  },
  text: {
    alignSelf: 'center',
    color: THEME.COLORS.textGrey,
  },
});
