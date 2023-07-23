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
    .map(path => removeLeadingSlashes(removeTrailingSlashes(path)))
    .join('/');
  if (paths[0].startsWith('/')) {
    combinedPath = `/${combinedPath}`;
  }

  return combinedPath;
}

/**
 * Remove trailing slashes from given string.
 *
 * @param str The string whose trailing slashes to be removed.
 * @returns The given string with trailing slashes removed.
 */
export function removeTrailingSlashes(str: string): string {
  if (str.endsWith('/')) {
    const removed = str.substring(0, str.length - 1);
    return removed.endsWith('/') ? removeTrailingSlashes(removed) : removed;
  }

  return str;
}

/**
 * Remove leading slashes from given string.
 *
 * @param str The string whose leading slashes to be removed.
 * @returns The given string with leading slashes removed.
 */
export function removeLeadingSlashes(str: string): string {
  if (str.startsWith('/')) {
    const removed = str.substring(1);
    return removed.startsWith('/') ? removeLeadingSlashes(removed) : removed;
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
