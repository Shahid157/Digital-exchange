import { ICONS } from 'assets/images/icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';

interface Props {
  iconName: string;
  title: string;
  onPress: () => void;
}
function TxButtons(props?: Props) {
  return (
    <TouchableOpacity onPress={props?.onPress} style={styles.container}>
      <View style={styles.iconView}>
        {props?.title == 'Withdraw' || props?.title == 'Retirar' ? (
          <FastImage
            source={require('../../../assets/images/icons/withdraw.png')}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
            tintColor="black"
          />
        ) : (
          <AnyIcon
            disabled
            type={
              props?.title === 'Swapping' || props?.title === 'Convertir'
                ? Icons.AntDesign
                : Icons.Feather
            }
            name={props?.iconName}
            size={30}
            color="black"
          />
        )}
      </View>
      <AppText
        h5
        medium
        color={THEME.COLORS.accentWhite}
        style={{ textTransform: 'capitalize' }}
      >
        {props?.title}
      </AppText>
    </TouchableOpacity>
  );
}
export default TxButtons;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: THEME.MARGIN.LOW,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: RF(22), height: RF(22), margin: RF(4) },
  iconView: {
    backgroundColor: THEME.COLORS.secondaryYellow,
    padding: RF(7),
    marginBottom: THEME.MARGIN.LOW,

    alignItems: 'center',
    borderRadius: THEME.RADIUS.OVAL,
  },
});
