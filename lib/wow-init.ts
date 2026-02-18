'use client';

import { useEffect } from 'react';

export function useWOW() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('wowjs').then(({ default: WOW }) => {
      const wow = new WOW.WOW({ live: false });
      wow.init();
    });
  }, []);
}
