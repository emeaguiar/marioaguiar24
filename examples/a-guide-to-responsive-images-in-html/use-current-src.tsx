/**
 * External dependencies
 */
import { useEffect, useState } from 'react';

export const useCurrentSrc = (imageRef: React.RefObject<HTMLImageElement>) => {
  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    if (imageRef.current) {
      setCurrentSrc(imageRef.current.currentSrc);
    }
  }, [imageRef]);

  return currentSrc;
};
