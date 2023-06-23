import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';

import LanguageCode from '@/types/LanguageCode';

import { getSiteConfiguration } from './configuration';

const config = getSiteConfiguration();

/**
 * Detect if the component is currently running on server.
 *
 * @returns {boolean} `true` if the component is currently running on server,
 *   otherwise `false`.
 * @export
 */
export function useIsServer() {
  return typeof window === 'undefined';
}

/**
 * Combine given path-like strings into a path.
 *
 * @param {...string[]} paths Path-like strings to be combined.
 * @returns {string} A path combined by given strings.
 * @export
 */
export function combinePaths(...paths: string[]) {
  let combinedPath = paths
    .map(path => removeLeadingSlash(removeTrailingSlash(path)))
    .join('/');
  if (paths[0].startsWith('/')) {
    combinedPath = `/${combinedPath}`;
  }

  return combinedPath;
}

/**
 * Remove trailing slash from given string.
 *
 * @param str The string whose trailing slash to be removed.
 * @returns The given string with trailing slash removed.
 */
export function removeTrailingSlash(str: string) {
  if (str.endsWith('/')) {
    return str.substring(0, str.length - 1);
  }

  return str;
}

/**
 * Remove leading slash from given string.
 *
 * @param str The string whose leading slash to be removed.
 * @returns The given string with leading slash removed.
 */
export function removeLeadingSlash(str: string) {
  if (str.startsWith('/')) {
    return str.substring(1);
  }

  return str;
}

/**
 * Get alternate and canonical URLs metadata of a page.
 *
 * @param currentLocale The user current requested locale.
 * @param pageRoute The route of requested page. Default to `/`.
 * @returns The alternate URLs metadata.
 */
export function getPageAlternates(
  currentLocale: LanguageCode,
  pageRoute = '/'
): AlternateURLs {
  const languages: Exclude<AlternateURLs['languages'], undefined> = {};

  for (const locale of config.locales) {
    if (locale !== currentLocale) {
      languages[locale] = combinePaths(config.host, locale, pageRoute);
    }
  }

  return {
    canonical: combinePaths(config.host, currentLocale, pageRoute),
    languages,
  };
}
