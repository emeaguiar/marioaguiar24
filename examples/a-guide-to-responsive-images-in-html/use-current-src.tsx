/**
 * External dependencies
 */
import { useEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import useMediaQuery from '@/lib/hooks/useMediaQuery';

export const useCurrentSrc = (imageRef: React.RefObject<HTMLImageElement>) => {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const mediaQuery = useMediaQuery('(min-width: 700px)');

  useEffect(() => {
    if (imageRef.current) {
      setCurrentSrc(imageRef.current.currentSrc);
      console.log(imageRef.current.currentSrc);
    }
  }, [imageRef, mediaQuery]);

  return currentSrc;
};
