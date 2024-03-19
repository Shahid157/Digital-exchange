import React from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { THEME } from 'shared/theme';

interface Props {
  isVisible: boolean;
}

function AppLoader(props: Props) {
  return (
    <Modal isVisible={props.isVisible} backdropOpacity={0.5}>
      <ActivityIndicator color={THEME.COLORS.primary} size="large" />
    </Modal>
  );
}

export default AppLoader;
