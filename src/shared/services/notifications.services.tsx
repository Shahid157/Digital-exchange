/* eslint-disable consistent-return */
import { NotificationTag } from '../store/slices/notifications/notification.types';

export const mapIndexToNotificationTag = (
  index: number
): NotificationTag | undefined => {
  if (index === 0) {
    return undefined;
  }
  if (index === 1) {
    return NotificationTag.Announcement;
  }
  if (index === 2) {
    return NotificationTag.System;
  }
};
export const selectedStatus = (index: number) => {
  if (index === 0) {
    return 'All';
  }
  if (index === 1) {
    return 'Readed';
  }
  if (index === 2) {
    return 'Created';
  }
};
