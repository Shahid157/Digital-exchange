/* eslint-disable import/prefer-default-export */
export const numberRoundDown = (number: number, decimals: number) => {
  const factor = 10 ** decimals;
  const adjustedNumber = number * factor;
  const roundedNumber = Math.floor(adjustedNumber);
  return (roundedNumber / factor).toFixed(decimals);
};
