/* eslint-disable import/prefer-default-export */
export const handleNumericInputChange = (
  text: string,
  setValue: (val: string) => void
): boolean => {
  const isNotAValidNumber = Number.isNaN(Number(text));
  if (isNotAValidNumber) return false;

  const [decimal] = text.split('.');

  if (decimal?.length > 6) return false;
  setValue(text);
  return true;
};
