import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { THEME } from 'shared/theme';
import { ICONS } from 'assets/images/icons';
import { RF } from 'shared/theme/responsive';
import AnyIcon, { Icons } from '../AnyIcon';
import AppText from '../AppText';

interface AttachmentViewProps {
  attachment: { uri: string; name?: string } | string | undefined;
  onClose: () => void;
}

const AttachmentView: React.FC<AttachmentViewProps> = ({
  attachment,
  onClose,
}) => {
  if (!attachment) {
    return null; // Handle the case where attachment is undefined
  }

  const isPdf = attachment?.name?.includes('.pdf');

  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: THEME.RADIUS.BOX,
        padding: RF(10),
        borderColor: THEME.COLORS.textGrey,
      }}
    >
      {isPdf ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FastImage
            source={ICONS.PDF_VIEW}
            style={{ height: RF(30), width: RF(30) }}
          />
          <View style={{ marginLeft: RF(10) }}>
            {attachment?.name && <AppText>{attachment.name}</AppText>}
            <AppText>PDF</AppText>
          </View>
        </View>
      ) : (
        <FastImage
          source={
            typeof attachment === 'string'
              ? { uri: attachment }
              : attachment.uri
              ? { uri: attachment.uri }
              : null
          }
          style={{ height: RF(100), width: RF(100), alignSelf: 'center' }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
      <TouchableOpacity
        onPress={onClose}
        style={{ position: 'absolute', right: 10, top: 10 }}
      >
        <AnyIcon
          disabled
          type={Icons.AntDesign}
          name="closecircle"
          size={20}
          color={THEME.COLORS.textGrey}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AttachmentView;
