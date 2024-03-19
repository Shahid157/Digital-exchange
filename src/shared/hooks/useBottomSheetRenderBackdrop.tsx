/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const useBottomSheetRenderBackdrop = useCallback(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />
  ),
  []
);

export default useBottomSheetRenderBackdrop;
