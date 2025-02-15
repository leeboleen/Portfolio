import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleMatchMedia() {
      setIsMobile(matchMedia.matches);
    }

    const matchMedia = window.matchMedia('(max-width: 768px)');
    matchMedia.addEventListener('change', handleMatchMedia);
    handleMatchMedia();
  });

  return isMobile;
}
