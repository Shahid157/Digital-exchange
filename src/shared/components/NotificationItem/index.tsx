import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import moment from 'moment';
import AnyIcon, { Icons } from 'shared/components/AnyIcon';
import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import {
  Notification,
  NotificationStatus,
} from '../../store/slices/notifications/notification.types';

interface Props {
  item: Notification;
  onPress: () => void;
}
function NotificationItem(props: Props) {
  const { item } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {item.status === NotificationStatus.Created && (
        <AnyIcon
          type={Icons.Octicons}
          name="dot-fill"
          size={20}
          color={THEME.COLORS.secondaryYellow}
        />
      )}
      <TouchableOpacity onPress={props?.onPress} style={styles.container}>
        <View style={styles.iconContainer}>
          <AnyIcon
            type={Icons.AntDesign}
            name="notification"
            size={15}
            color={THEME.COLORS.secondaryYellow}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <AppText
            color={THEME.COLORS.white}
            h5
            medium
            style={{
              marginBottom: THEME.MARGIN.SUPERLOW,
            }}
          >
            {item.title}
          </AppText>
          <AppText color={THEME.COLORS.textGrey} h5 medium>
            {item.content}
          </AppText>
          <AppText
            style={styles.time}
            color={THEME.COLORS.textExtraLight}
            h5
            medium
          >
            {moment(item?.createdAt).format('YYYY-MM-DD HH:MM')}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default NotificationItem;
const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    padding: RF(10),

    backgroundColor: THEME.COLORS.secondaryBackground,
    borderRadius: THEME.RADIUS.BOX,
    marginVertical: THEME.MARGIN.LOW,
    marginLeft: THEME.MARGIN.LOW,
  },
  iconContainer: {
    alignSelf: 'flex-start',
    height: RF(25),
    width: RF(25),
    borderRadius: THEME.RADIUS.SMALLBOX,
    backgroundColor: THEME.COLORS.iconGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  time: {
    alignSelf: 'flex-end',
    marginTop: THEME.MARGIN.LOW,
  },
});
