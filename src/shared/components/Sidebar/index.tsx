import { Portal } from '@gorhom/portal';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IMAGES } from 'assets/images';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import SecondaryButton from 'shared/components/SecondaryButton';
import { toast } from 'shared/services/helper.service';
import { RootState } from 'shared/store';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { t } from 'i18next';
import SidebarBottomSheet from './components/SidebarBottomSheet';
import { closeSession } from '../../store/slices/session/session.slice';
import { useAppDispatch } from '../../hooks/redux';

function Sidebar() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.session.user);
  const [open, setOpen] = useState(0);
  const dispatch = useAppDispatch();
  const profileName = `${user?.profile?.firstName} ${user?.profile?.lastName}`;

  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  useEffect(() => {
    const backAction = () => {
      if (bottomSheetOpen) {
        setBottomSheetOpen(false);
        setOpen(0);
      } else {
        backHandler.remove();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [bottomSheetOpen]);

  const onCancel = () => setOpen(0);

  const onLogout = async () => {
    dispatch(closeSession());
    toast('Successfully Logged out', '', 'success');
  };

  const onPressItem = ({ item }: any) => {
    // @ts-ignore
    navigation.navigate(item?.screen);
  };
  function SideBarItem({ item }: any) {
    return (
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onPressItem(item)}
      >
        <FastImage
          source={item.icon}
          tintColor={THEME.COLORS.textGrey}
          style={styles.itemIcon}
        />
        <AppText
          medium
          h5
          style={{
            flex: 1,
          }}
        >
          {item?.name}
        </AppText>
        <AnyIcon
          type={Icons.Feather}
          size={16}
          color={THEME.COLORS.textGrey}
          name="chevron-right"
        />
      </TouchableOpacity>
    );
  }
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <FastImage
            source={
              user?.profile?.photo
                ? { uri: user?.profile?.photo }
                : IMAGES.defaultImage
            }
            style={styles.profileIcon}
          />

          <AppText color={THEME.COLORS.white} style={{ marginBottom: RF(5) }}>
            {profileName}
          </AppText>
          <AppText h5 color={THEME.COLORS.textGrey}>
            {user?.email}
          </AppText>
        </View>
        <View style={styles.itemContainer}>
          {/* {sideBarItems.map((i: any, idx) => (
            <SideBarItem item={i} key={idx} />
          ))} */}
          <SecondaryButton
            title={t('Logout', { ns: ['all'] })}
            onPress={() => {
              setOpen(1), setBottomSheetOpen(true);
            }}
            buttonStyle={styles.logoutButton}
            textStyle={{ color: THEME.COLORS.secondaryYellow }}
          />
        </View>

        <View style={styles.footerItem}>
          <AppText h3 style={{ marginBottom: RF(5) }}>
            Business Shop
          </AppText>
          <AppText color={THEME.COLORS.textGrey}>App Version 1.0</AppText>
        </View>
      </View>

      <Portal>
        <SidebarBottomSheet
          sheetIndex={open}
          setSheetIndex={setOpen}
          handleLoading={handleLoading}
          onCancel={onCancel}
          onLogout={onLogout}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  logoutButton: {
    width: '80%',
    borderWidth: 1,
    borderColor: THEME.COLORS.secondaryYellow,
    backgroundColor: 'transparent',
    borderRadius: THEME.RADIUS.SMALLBOX,
    marginVertical: THEME.MARGIN.HIGH,
  },
  navItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topContainer: {
    paddingHorizontal: RF(15),
    paddingVertical: RF(20),
    alignItems: 'flex-start',
    backgroundColor: THEME.COLORS.secondaryBackground,
  },
  profileIcon: {
    height: RF(70),
    width: RF(70),
    marginBottom: RF(10),
    borderRadius: THEME.RADIUS.INTERMEDIATE,
  },
  itemContainer: { flex: 1, paddingVertical: 15 },
  itemIcon: {
    height: RF(20),
    width: RF(20),
    marginRight: 12,
  },
  footerItem: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

export default Sidebar;
