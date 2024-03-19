import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { RF } from 'shared/theme/responsive';
import AppHeader from 'shared/components/AppHeader';
import { RootState } from 'shared/store';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { THEME } from 'shared/theme';
import { IMAGES } from 'assets/images';
import { meApi, uploadPhotoApi } from 'shared/services/auth';
import Toast from 'react-native-toast-message';
import {
  getNormalizedError,
  handleImageUpload,
  toast,
} from 'shared/services/helper.service';
import AppLoader from 'shared/components/AppLoader';
import { Portal } from '@gorhom/portal';
import AppText from 'shared/components/AppText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { ICONS } from 'assets/images/icons';
import SimpleTextInput from './components/SimpleTextInput';
import styles from './styles';
import { GenericNavigation } from '../types';
import ProfileBottomSheet from '../components/ProfileBottomSheet';
import LogoutBottomSheet from '../components/LogoutBottomSheet';
import ProfileViewBottomSheet from '../components/ProfileViewBottomSheet';
import {
  closeSession,
  setUser,
} from '../../../../shared/store/slices/session/session.slice';
import { useAppDispatch } from '../../../../shared/hooks/redux';

function Accounts(props: GenericNavigation) {
  const [sheetIndex, setSheetIndex] = useState(0);
  const [profileViewIndex, setProfileViewIndex] = useState(0);
  const { user } = useSelector((state: RootState) => state.session);

  const [openImagePickerSheet, setOpenImagePickerSheet] = useState(0);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['all']);
  const [loading, setLoading] = useState(false);

  const phoneNumber = useMemo(() => {
    const sms2faMethod = user?.twoFactorAuthenticationMethods?.find(
      (item: any) => item.type === 'sms'
    );
    return sms2faMethod?.payload?.phone ?? '-';
  }, [user]);

  const ImagePickerOptions = [
    { label: t('Take a Picture'), value: 'camera' },
    { label: t('Upload from Gallery'), value: 'gallery' },
    { label: t('View Profile Picture'), value: 'profile' },
  ];

  const profileName = `${user?.profile?.firstName} ${user?.profile?.lastName}`;

  const uploadProfilePhoto = async (image: any) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('photo', image);

      const response = await uploadPhotoApi(formData);

      if (response?.status == 201) {
        const meResponse = await meApi();
        if (meResponse.status == 200 || meResponse.status == 201) {
          dispatch(setUser(meResponse.data));
          Toast.show({
            text1: t('Successful'),
            text2: t('Photo updated successfully'),
            type: 'success',
          });
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      const err = getNormalizedError(error);
      Toast.show({
        text1: t('Failed'),
        text2: err,
        type: 'error',
      });
      setLoading(false);
    }
  };

  const handleOnLogout = async () => {
    dispatch(closeSession());
    toast(t('Successfully Logged out'), '', 'success');
  };

  const handleOnSelectImage = async (
    type: 'camera' | 'gallery' | 'profile'
  ) => {
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
      <AppHeader
        leftIcon="back"
        title={t('Account')}
        hideDivider
        titleStyle={{ color: THEME.COLORS.secondaryYellow }}
      />
      {loading && <AppLoader isVisible />}
      <ScrollView scrollEnabled style={styles.mainContainer}>
        <View style={styles.profilePicContainer}>
          <TouchableOpacity
            disabled={loading}
            onPress={onPressProfile}
            activeOpacity={0.9}
            style={{ alignSelf: 'center' }}
          >
            <FastImage
              source={
                user?.profile?.photo
                  ? { uri: user?.profile?.photo }
                  : IMAGES.defaultImage
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
        </View>

        <AppText
          medium
          children={t('Account Details Profile')}
          h2
          color={THEME.COLORS.textGrey}
        />
        <SimpleTextInput
          title={t('Name')}
          value={profileName}
          copyable
          icon={<Icon name="content-copy" color="gray" size={RF(16)} />}
        />

        <SimpleTextInput
          title={t('Username')}
          copyable
          value={`@${user?.username}`}
          icon={<Icon name="content-copy" color="gray" size={RF(16)} />}
        />

        <SimpleTextInput
          title={t('Registration Info')}
          value={user?.email || ''}
        />

        <SimpleTextInput
          title={t('Phone Number')}
          value={phoneNumber || 'XXX XXXX XXX'}
        />

        <SimpleTextInput
          title={t('Date of Birth')}
          value={
            user?.profile?.dateOfBirth
              ? moment(user?.profile?.dateOfBirth).format('MM/DD/YYYY')
              : '-'
          }
        />

        <TouchableOpacity
          style={styles.profileLogoutButton}
          onPress={() => setSheetIndex(1)}
        >
          <FeatherIcon name="log-out" color="#FFC128" size={30} />
          <Text style={{ color: '#DCDCDC', fontSize: RF(15) }}>
            {t('Logout')}
          </Text>
        </TouchableOpacity>
        <View style={{ height: RF(20) }} />

        <Portal>
          <ProfileViewBottomSheet
            sheetIndex={profileViewIndex}
            setSheetIndex={setProfileViewIndex}
            userInfo={user}
          />
          <LogoutBottomSheet
            sheetIndex={sheetIndex}
            setSheetIndex={setSheetIndex}
            handleLoading={false}
            onPress={handleOnLogout}
            onCancelPress={() => setSheetIndex(0)}
          />
          <ProfileBottomSheet
            sheetIndex={openImagePickerSheet}
            setSheetIndex={setOpenImagePickerSheet}
            ImagePickerOptions={ImagePickerOptions}
            selectImage={handleOnSelectImage}
          />
        </Portal>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Accounts;
