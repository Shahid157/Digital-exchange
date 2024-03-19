import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { capitalFistStringLetter } from 'shared/services/helper.service';
import { RF } from '../../../../../shared/theme/responsive';
import { THEME } from '../../../../../shared/theme';
import AppText from '../../../../../shared/components/AppText';

export type Option = 'camera' | 'gallery' | 'file';

export interface EmptyAttachmentBoxProps {
  onPress: (option: Option) => void;
}

const options = [
  { name: 'camera', icon: 'camera' },
  { name: 'gallery', icon: 'image' },
  { name: 'file', icon: 'file-pdf-box' },
];

export default function EmptyAttachmentBox(props: EmptyAttachmentBoxProps) {
  const { onPress } = props;
  const { t } = useTranslation('all');

  return (
    <View style={styles.root}>
      {options.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => onPress(item.name as Option)}
        >
          <View style={styles.btnCircle}>
            <Icon
              disabled
              name={item.icon}
              size={30}
              color={THEME.COLORS.white}
            />
          </View>

          <AppText>{t(capitalFistStringLetter(item.name))}</AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: THEME.PADDING.MID_LOW,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: THEME.MARGIN.LOW,
  },
  btnCircle: {
    width: RF(52),
    height: RF(52),
    marginBottom: THEME.MARGIN.LOW,

    borderRadius: THEME.RADIUS.ROUND,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.primary,
  },
});
