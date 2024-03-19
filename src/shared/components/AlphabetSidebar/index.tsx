import React from 'react';

import { TouchableOpacity, View } from 'react-native';

import AppText from 'shared/components/AppText';
import { THEME } from 'shared/theme';

interface Props {
  selectedLetter: string;
  onLetterPress: (val: string) => void;
}
function AlphabetSidebar(props?: Props) {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <View style={{ marginRight: 0 }}>
      {alphabets.map((letter: string) => (
        <TouchableOpacity
          style={{ flex: 1 }}
          key={letter}
          onPress={() => props?.onLetterPress(letter)}
        >
          <AppText
            h5
            bold={props?.selectedLetter === letter}
            color={
              props?.selectedLetter === letter
                ? THEME.COLORS.secondaryYellow
                : THEME.COLORS.textGrey
            }
          >
            {letter}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default AlphabetSidebar;
