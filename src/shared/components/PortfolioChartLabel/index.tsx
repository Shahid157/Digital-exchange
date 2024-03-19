import React from 'react';
import { View } from 'react-native';
import { RF } from 'shared/theme/responsive';
import { THEME } from 'shared/theme';
import { formatObject } from 'shared/services/helper.service';
import { useTranslation } from 'react-i18next';
import AppText from '../AppText';

interface Props {
  x: number;
  y: number;
  text: string;
}
function PortfolioChartLabel({ x, y, text }: Props) {
  const extractedObject: any = formatObject(text);
  const thresholdPercentage = '2%';
  const { t } = useTranslation(['all']);

  return (
    <>
      {extractedObject?.percentageStr < thresholdPercentage &&
      extractedObject?.name !== `${t('Others')}` ? null : (
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            left: x - 20,
            top: y - 20,
          }}
        >
          <AppText h5 bold color={extractedObject?.color} style={{}}>
            {extractedObject?.name}
          </AppText>
          <View
            style={{
              borderRadius: THEME.RADIUS.SMALLBOX,
              padding: RF(5),
              backgroundColor: THEME.COLORS.iconGrey,
            }}
          >
            <AppText h6 semiBold color={extractedObject?.color}>
              {extractedObject?.percentageStr}
            </AppText>
          </View>
        </View>
      )}
    </>
  );
}

export default PortfolioChartLabel;
