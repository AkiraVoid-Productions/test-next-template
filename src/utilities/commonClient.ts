'use client';

import { useParams } from 'next/navigation';
import { useCallback, useSyncExternalStore } from 'react';

import LanguageCode from '@/types/LanguageCode';

/**
 * Hook to media query API to check if given query matches.
 *
 * @param {string} query The media query string to check.
 * @param {boolean} [serverDefault] A value returns on server by default.
 *   Default is `false`.
 * @returns {boolean} `true` if media query matches, otherwise `false`.
 * @export
 */
export function useMediaQuery(query: string, serverDefault: boolean = false) {
  const subscribe = useCallback(
    (callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);
      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => serverDefault;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Detect whether if user's browser is set to prefer dark mode.
 *
 * @returns `true` if user's browser is set to prefer dark mode while running in
 *   client, otherwise `false`.
 */
export function useIsBrowserDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

/**
 * Get the current locale which is requested by user.
 *
 * @returns {LanguageCode} A language tag indicates the current locale.
 * @export
 */
export function useLocale(): LanguageCode {
  const { locale } = useParams();

  return locale as LanguageCode;
}
