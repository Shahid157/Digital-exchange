/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
export type Notification = {
  _id: string;
  title: string;
  content: string;
  type: NotificationType;
  tag: NotificationTag;
  status: NotificationStatus;
  payload: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

export enum NotificationType {
  NewIpDetected = 'NewIpDetected',
  NewIpAdded = 'NewIpAdded',
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
  Payment = 'Payment',
}

export enum NotificationTag {
  System = 'Created',
  Announcement = 'Readed',
  User = 'Deleted',
}

export enum NotificationStatus {
  Created = 'Created',
  Readed = 'Readed',
  Deleted = 'Deleted',
}

export type UpdateNotificationsStatus = {
  ids: string[];
  status: NotificationStatus;
};
