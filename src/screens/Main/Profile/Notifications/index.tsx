import React, { useEffect, useMemo, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks';
import ROUTE_NAMES from 'routes/RouteNames';
import AnimatedTabGroup from 'shared/components/AnimatedTabGroup';
import { Icons } from 'shared/components/AnyIcon';
import AppHeader from 'shared/components/AppHeader';
import AppText from 'shared/components/AppText';
import NotificationItem from 'shared/components/NotificationItem';
import PrimaryButton from 'shared/components/PrimaryButton';
import SecondaryButton from 'shared/components/SecondaryButton';
import { GenericNavigation } from 'shared/models/types';
import { toast } from 'shared/services/helper.service';
import { mapIndexToNotificationTag } from 'shared/services/notifications.services';
import { GLOBAL_STYLE, THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import {
  useNotificationsQuery,
  useUpdateNotificationsStatusMutation,
} from 'shared/store/slices/notifications/notification.api';
import {
  Notification,
  NotificationStatus,
} from '../../../../shared/store/slices/notifications/notification.types';

function Notifications(props: GenericNavigation) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  const { t } = useTranslation(['all']);
  const [updateNotificationsStatus, updateNotificationsStatusResponse] =
    useUpdateNotificationsStatusMutation();
  const notificationsQuery = useNotificationsQuery('');
  const notifications = notificationsQuery.data || [];
  const selectedTag = useMemo(
    () => mapIndexToNotificationTag(selectedTabIndex),
    [selectedTabIndex]
  );

  const notificationsByTag = useMemo(() => {
    if (!selectedTag) return notifications;
    return notifications.filter((it) => it.tag === selectedTag);
  }, [notifications, selectedTag]);

  const onChangeSelectedTabIndex = (val: number) => {
    setSelectedTabIndex(val);
  };

  const onReadNotification = async (notif: Notification) => {
    updateNotificationsStatus({
      ids: [notif._id],
      status: NotificationStatus.Readed,
    });
  };

  const onPressNotification = (item: Notification) => {
    onReadNotification(item);
    props?.navigation?.navigate(ROUTE_NAMES.NOTIFICATIONS_DETAILS, { item });
  };

  const handleAllDelete = async () => {
    updateNotificationsStatus({
      status: NotificationStatus.Deleted,
      ids: notificationsByTag
        .filter((it) => it.status !== NotificationStatus.Deleted)
        .map((it) => it._id),
    });
  };

  const handleAllRead = async () => {
    updateNotificationsStatus({
      status: NotificationStatus.Readed,
      ids: notificationsByTag
        .filter(
          (it) =>
            it.status !== NotificationStatus.Readed &&
            it.status !== NotificationStatus.Deleted
        )
        .map((it) => it._id),
    });
  };

  const handleOnRefresh = () => {
    notificationsQuery.refetch();
  };

  useEffect(() => {
    const { error } = notificationsQuery;
    if (error) {
      toast(t('Failed'), t('unable_to_peform_this_operation'), 'error');
    }
  }, [updateNotificationsStatusResponse]);

  useBackHandler(() => {
    if (edit) {
      setEdit(false);
      return true;
    }
    return false;
  });

  return (
    <View style={GLOBAL_STYLE.MAIN}>
      <AppHeader
        title={t('Notifications')}
        leftIcon="back"
        onPressRightIcon={toggleEdit}
        rightIcon="edit-3"
        rightIconType={Icons.Feather}
      />
      <AnimatedTabGroup
        activeTabBackground={THEME.COLORS.secondaryYellow}
        onPress={(val, index) => {
          onChangeSelectedTabIndex(index);
        }}
        buttons={[t('System'), t('Announcements'), t('Campaign')]}
        selectedIndex={selectedTabIndex}
        indicatoritems={notifications}
      />

      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={() => (
            <View>
              <AppText
                medium
                style={{ alignSelf: 'center', marginVertical: RF(10) }}
              >
                {t('No Notifications')}
              </AppText>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={
                notificationsQuery.isLoading ||
                updateNotificationsStatusResponse.isLoading
              }
              tintColor={THEME.COLORS.secondaryYellow}
              onRefresh={handleOnRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          data={notificationsByTag}
          renderItem={({ item }) => (
            <NotificationItem
              item={item}
              onPress={() => onPressNotification(item)}
            />
          )}
        />
        {edit && (
          <Animatable.View animation="slideInUp" duration={100}>
            <View style={styles.buttons}>
              <SecondaryButton
                onPress={handleAllRead}
                buttonStyle={styles.footerButton1}
                small
                title={t('Mark All Read')}
              />
              <PrimaryButton
                onPress={handleAllDelete}
                buttonStyle={{ width: '90%', borderWidth: 1 }}
                title={t('Clear all')}
              />
            </View>
          </Animatable.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.98,
  },
  buttons: {
    paddingTop: RF(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButton1: {
    backgroundColor: THEME.COLORS.secondaryBackground,
    width: '45%',
    borderRadius: THEME.RADIUS.BOX,
    marginLeft: THEME.MARGIN.NORMAL,
  },
});

export default Notifications;
