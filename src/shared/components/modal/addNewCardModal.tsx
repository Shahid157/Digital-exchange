import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GlobalStyleSheet } from 'shared/constants/styleSheet';
import { COLORS, FONTS } from 'shared/constants/theme';
import PrimaryButton from '../PrimaryButton';

function AddNewCard() {
  const { colors } = useTheme();

  const date1 = new Date(); // return today

  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <>
      <DatePicker
        title="Expiration Date"
        modal
        mode="date"
        open={open}
        date={date1}
        // eslint-disable-next-line no-shadow
        onConfirm={(date) => {
          setOpen(false);
          setDate(date.toDateString().slice(4));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <View style={{ ...GlobalStyleSheet.modalHeader, paddingBottom: 5 }}>
        <Text style={{ ...FONTS.h6, color: colors.text }}>Add New Card</Text>
      </View>
      <View style={{ ...GlobalStyleSheet.modalBody, flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.card,
            ...GlobalStyleSheet.formControl,
            ...GlobalStyleSheet.shadow,
          }}
        >
          <TextInput
            style={{ ...GlobalStyleSheet.Input, color: colors.text }}
            placeholder="Card Number"
            placeholderTextColor={colors.text}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.card,
            ...GlobalStyleSheet.formControl,
            ...GlobalStyleSheet.shadow,
          }}
        >
          <TextInput
            style={{ ...GlobalStyleSheet.Input, color: colors.text }}
            placeholder="First Name"
            placeholderTextColor={colors.text}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.card,
            ...GlobalStyleSheet.formControl,
            ...GlobalStyleSheet.shadow,
          }}
        >
          <TextInput
            style={{ ...GlobalStyleSheet.Input, color: colors.text }}
            placeholder="Last Name"
            placeholderTextColor={colors.text}
          />
        </View>
        <View style={{ ...GlobalStyleSheet.row }}>
          <View style={{ ...GlobalStyleSheet.col60 }}>
            <View style={{ position: 'relative' }}>
              <View
                style={{
                  backgroundColor: colors.card,
                  ...GlobalStyleSheet.formControl,
                  ...GlobalStyleSheet.shadow,
                }}
              >
                <TextInput
                  style={{ ...GlobalStyleSheet.Input, color: colors.text }}
                  placeholder="Expiration Date"
                  value={`${date}`}
                  placeholderTextColor={colors.text}
                />
              </View>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  height: 47,
                  position: 'absolute',
                  alignItems: 'center',
                  top: 0,
                  right: 0,
                  width: 50,
                  justifyContent: 'center',
                }}
              >
                <FeatherIcon name="calendar" size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ ...GlobalStyleSheet.col40 }}>
            <View
              style={{
                backgroundColor: colors.card,
                ...GlobalStyleSheet.formControl,
                ...GlobalStyleSheet.shadow,
              }}
            >
              <TextInput
                style={{ ...GlobalStyleSheet.Input, color: colors.text }}
                placeholder="CVV"
                placeholderTextColor={colors.text}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            ...GlobalStyleSheet.formControl,
            ...GlobalStyleSheet.shadow,
          }}
        >
          <TextInput
            style={{ ...GlobalStyleSheet.Input, color: colors.text }}
            placeholder="Address"
            placeholderTextColor={colors.text}
          />
        </View>
        <View style={{ ...GlobalStyleSheet.row }}>
          <View style={{ ...GlobalStyleSheet.col50 }}>
            <View
              style={{
                backgroundColor: colors.card,
                ...GlobalStyleSheet.formControl,
                ...GlobalStyleSheet.shadow,
              }}
            >
              <TextInput
                style={{ ...GlobalStyleSheet.Input, color: colors.text }}
                placeholder="Country"
                placeholderTextColor={colors.text}
              />
            </View>
          </View>
          <View style={{ ...GlobalStyleSheet.col50 }}>
            <View
              style={{
                backgroundColor: colors.card,
                ...GlobalStyleSheet.formControl,
                ...GlobalStyleSheet.shadow,
              }}
            >
              <TextInput
                style={{ ...GlobalStyleSheet.Input, color: colors.text }}
                placeholder="Postal Code"
                placeholderTextColor={colors.text}
              />
            </View>
          </View>
        </View>
        <PrimaryButton title="Save Account" />
      </View>
    </>
  );
}

export default AddNewCard;
