import { useCallback, useRef, useState } from 'react';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

export const useScrollAnim = () => {
  const scrollY = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      scrollY.current = y;
      if (y > 20 && !isScrolled) {
        setIsScrolled(true);
      } else if (y <= 20 && isScrolled) {
        setIsScrolled(false);
      }
    },
    [isScrolled],
  );

  return { scrollY, isScrolled, handleScroll };
};
