/* eslint-disable import/prefer-default-export */
import { numberRoundDown } from './numberRoundDown';

export const limitedDecimalInputs = (
  text: string,
  setAmountStr: (value: string) => void
) => {
  const decimalIndex = text.indexOf('.');
  if (decimalIndex !== -1 && text?.length - decimalIndex > 7) {
    const truncatedText = numberRoundDown(Number(text), 6);
    setAmountStr(truncatedText);
  } else {
    setAmountStr(text);
  }
};
