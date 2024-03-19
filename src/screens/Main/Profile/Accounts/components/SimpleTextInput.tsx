import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { copyToClipboard } from 'shared/services/helper.service';
import styles from '../styles';
import { SimpleTextInputProps } from '../../types';

function SimpleTextInput(props: SimpleTextInputProps) {
  const { value, icon, title, copyable = false } = props;

  const handleCopyable = () => {
    if (copyable) {
      copyToClipboard(value);
    }
  };
  const renderPencil = title === 'Date of Birth';
  return (
    <Pressable style={styles.inputArea} onPress={handleCopyable}>
      <View pointerEvents="none">
        <Text style={styles.labelText}>{title}</Text>
        <TextInput style={styles.profileInputText} value={value} />
      </View>
      <View>{renderPencil ? null : icon}</View>
    </Pressable>
  );
}

export default SimpleTextInput;
