import { Portal } from '@gorhom/portal';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import Divider from 'shared/components/Dividers';
import ProfileItem from 'shared/components/ProfileItem';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { IMAGES } from 'assets/images';
import Toast from 'react-native-toast-message';
import ROUTE_NAMES from 'routes/RouteNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import KycButton from 'shared/components/KycButton';
import VerificationStatus from 'shared/components/VerificationStatus';
import { meApi, uploadPhotoApi } from 'shared/services/auth';
import {
  getNormalizedError,
  handleImageUpload,
  toast,
} from 'shared/services/helper.service';
import { RootState } from 'shared/store';
import AppLoader from 'shared/components/AppLoader';
import { ICONS } from 'assets/images/icons';
import { GenericNavigation } from './types';
import styles from './styles';
import ProfileBottomSheet from './components/ProfileBottomSheet';
import LogoutBottomSheet from './components/LogoutBottomSheet';
import LanguageBottomSheet from './components/LanguageBottomSheet';
import ProfileViewBottomSheet from './components/ProfileViewBottomSheet';
import {
  closeSession,
  setUser,
} from '../../../shared/store/slices/session/session.slice';
import { useAppDispatch } from '../../../shared/hooks/redux';
import packageJson from '../../../../package.json';

interface imageType {
  name: string;
  size: string;
  type: string;
  uri: string;
}

function Profile(props: GenericNavigation) {
  const { user } = useSelector((state: RootState) => state.session);

  const { t, i18n } = useTranslation(['all']);
  const [open, setOpen] = useState(0);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [profileViewIndex, setProfileViewIndex] = useState(0);
  const [openImagePickerSheet, setOpenImagePickerSheet] = useState(0);
  const Languages = ['English', 'Spanish'];
  const ImagePickerOptions = [
    { label: t('Take a Picture', { ns: ['all'] }), value: 'camera' },
    { label: t('Upload from Gallery', { ns: ['all'] }), value: 'gallery' },
    { label: t('View Profile Picture', { ns: ['all'] }), value: 'profile' },
  ];
  const profileName = `${user?.profile?.firstName} ${user?.profile?.lastName}`;

  const [language, setLanguage] = useState(Languages[0]);

  const [loading, setLoading] = useState(false);
  const [handleLoading, setHandleLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          if (storedLanguage === 'es') {
            setLanguage('Spanish');
          } else {
            setLanguage('English');
          }
        }
      } catch (error) {
        // do nothing
      }
    };
    getLanguage();
  }, []);

  const uploadProfilePhoto = async (image: imageType) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', image);
      const response = await uploadPhotoApi(formData);
      if (response?.status === 201) {
        const meResponse = await meApi();
        if (meResponse.status === 200 || meResponse.status === 201) {
          dispatch(setUser(meResponse.data));
          Toast.show({
            text1: t('Successful', { ns: ['all'] }),
            text2: t('Photo updated successfully', { ns: ['all'] }),
            type: 'success',
          });
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      const err = getNormalizedError(error);
      Toast.show({
        text1: t('Failed', { ns: ['all'] }),
        text2: err,
        type: 'error',
      });
      setLoading(false);
    }
  };

  const onCancel = () => setSheetIndex(0);

  const onLogout = async () => {
    dispatch(closeSession());
    toast(t('Successfully Logged out'), '', 'success');
  };

  const navToScreen = (screen: string) => props?.navigation?.navigate(screen);

  const onPressLanguage = () => setOpen(1);

  const onSelectLanguage = (item: string) => {
    setLanguage(item);
  };

  const switchLanguage = async () => {
    if (language === 'English') {
      i18n.changeLanguage('en');
      AsyncStorage.setItem('language', 'en');
      setOpen(0);
    } else {
      i18n.changeLanguage('es');
      AsyncStorage.setItem('language', 'es');
      setOpen(0);
    }
  };

  const onPressKycButton = () =>
    props?.navigation?.navigate(ROUTE_NAMES.COMPLETE_KYC);

  const selectImage = async (type: 'camera' | 'gallery' | 'profile') => {
    if (type === 'profile') {
      setProfileViewIndex(1);
      setOpenImagePickerSheet(0);
    } else {
      handleImageUpload(type, uploadProfilePhoto);
      setOpenImagePickerSheet(0);
    }
  };
  const onPressProfile = () => {
    setOpenImagePickerSheet(1);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && <AppLoader isVisible />}
      <ScrollView scrollEnabled style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.sheetBtn}
          onPress={() => setSheetIndex(1)}
        >
          <AnyIcon
            disabled
            type={Icons.Feather}
            size={23}
            color={THEME.COLORS.secondaryYellow}
            name="log-out"
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          onPress={onPressProfile}
          activeOpacity={0.9}
          style={{
            alignSelf: 'flex-start',
          }}
        >
          <FastImage
            source={
              user?.profile?.photo
                ? { uri: user?.profile?.photo }
                : IMAGES.defaultImage
            }
            resizeMode={
              !user?.profile?.photo ? FastImage.resizeMode.cover : undefined
            }
            style={styles.profilePic}
          />
          <View style={styles.editIcon}>
            <FastImage
              source={ICONS.PENCIL_WHITE}
              resizeMode={FastImage.resizeMode.contain}
              style={{ width: RF(13), height: RF(13) }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.profileName}>
            <AppText
              secondaryTitle
              color={THEME.COLORS.secondaryYellow}
              semiBold
            >
              {profileName}
            </AppText>
          </View>
          <VerificationStatus
            status={user?.kycVerification?.status || 'nonVerified'}
          />
        </View>
        <View
          style={{
            marginBottom: RF(10),
          }}
        >
          <AppText color={THEME.COLORS.white} medium>
            {user?.email}
          </AppText>

          <AppText color={THEME.COLORS.white} medium>
            @{user?.username}
          </AppText>
        </View>
        <KycButton
          status={user?.kycVerification?.status || 'nonVerified'}
          onPress={onPressKycButton}
        />
        <Divider dividerStyle={{ marginVertical: RF(25) }} />
        <AppText
          semiBold
          h3
          color={THEME.COLORS.textGrey}
          style={{ marginBottom: RF(5) }}
        >
          {t('Settings', { ns: ['all'] })}
        </AppText>

        <ProfileItem
          profileIcon
          title={t('Account', { ns: ['all'] })}
          onPress={() => navToScreen(ROUTE_NAMES.ACCOUNTS)}
        />

        <ProfileItem
          icon="lock"
          iconType={Icons.SimpleLineIcons}
          title={t('Security', { ns: ['all'] })}
          onPress={() => navToScreen(ROUTE_NAMES.SECURITY)}
        />
        <AppText
          semiBold
          h3
          color={THEME.COLORS.textGrey}
          style={{ marginVertical: RF(5) }}
        >
          {t('General', { ns: ['all'] })}
        </AppText>

        <ProfileItem
          icon="notifications-outline"
          iconType={Icons.Ionicons}
          title={t('Notifications', { ns: ['all'] })}
          onPress={() => navToScreen(ROUTE_NAMES.NOTIFICATIONS)}
        />
        <ProfileItem
          icon="globe-outline"
          iconType={Icons.Ionicons}
          title={t('Language', { ns: ['all'] })}
          rightText={language}
          onPress={onPressLanguage}
          rightIcon
        />
        <AppText
          semiBold
          h3
          color={THEME.COLORS.textGrey}
          style={{ marginVertical: RF(5) }}
        >
          {t('Others', { ns: ['all'] })}
        </AppText>

        <ProfileItem
          icon="info-outline"
          iconType={Icons.MaterialIcons}
          title={t('Legal Information', { ns: ['all'] })}
          onPress={() => navToScreen(ROUTE_NAMES.LEGAL_INFORMATION)}
        />
        {/* //Version Display Text// */}
        <AppText
          semiBold
          h5
          color={THEME.COLORS.textGrey}
          style={{
            marginTop: THEME.MARGIN.NORMAL,
            marginBottom: THEME.MARGIN.HIGH,
            textAlign: 'center',
          }}
        >
          {Platform.OS === 'ios'
            ? t('ios_version_text', { ns: ['all'] }) + packageJson.version
            : t('android_version_text', { ns: ['all'] }) + packageJson.version}
        </AppText>
      </ScrollView>

      {/* ///// Bottom Sheet Components for Profile Screen ///// */}

      <Portal>
        <ProfileViewBottomSheet
          sheetIndex={profileViewIndex}
          setSheetIndex={setProfileViewIndex}
          userInfo={user}
        />
        <ProfileBottomSheet
          sheetIndex={openImagePickerSheet}
          setSheetIndex={setOpenImagePickerSheet}
          ImagePickerOptions={ImagePickerOptions}
          selectImage={selectImage}
        />
        <LogoutBottomSheet
          sheetIndex={sheetIndex}
          setSheetIndex={setSheetIndex}
          handleLoading={handleLoading}
          onPress={onLogout}
          onCancelPress={onCancel}
        />
        <LanguageBottomSheet
          sheetIndex={open}
          setSheetIndex={setOpen}
          handleLoading={handleLoading}
          onLanguageSheetClose={() => setOpen(0)}
          switchLanguagePress={switchLanguage}
          onSelectLanguage={onSelectLanguage}
          LanguagesData={Languages}
          language={language}
        />
      </Portal>
    </SafeAreaView>
  );
}

export default Profile;
