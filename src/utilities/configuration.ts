import SiteConfiguration from '@/types/SiteConfiguration';
import UserConfiguration from '@/types/UserConfiguration';

import config from '../../web.config';

/** The default site configuration. */
export const defaultSiteConfiguration: Required<SiteConfiguration> = {
  defaultLocale: 'en',
  host: 'http://localhost:3000',
  iconDark: {},
  iconLight: {},
  locales: ['en'],
  themeColors: {
    10: '#020305',
    20: '#111723',
    30: '#16263D',
    40: '#193253',
    50: '#1B3F6A',
    60: '#1B4C82',
    70: '#18599B',
    80: '#1267B4',
    90: '#3174C2',
    100: '#4F82C8',
    110: '#6790CF',
    120: '#7D9ED5',
    130: '#92ACDC',
    140: '#A6BAE2',
    150: '#BAC9E9',
    160: '#CDD8EF',
  },
  title: 'Website',
  description: 'A website powered by AkiraVoid Next.js 13 appDir web template.',
  keywords: [
    'website',
    'Next.js',
    'appDir',
    'AkiraVoid',
    'react',
    'server-component',
  ],
  titleDelimiter: ' • ',
  i18next: {},
};

/** The default user configuration. */
export const defaultUserConfiguration: Required<UserConfiguration> = {
  theme: 'browser',
};

/**
 * Get configuration of this site.
 *
 * @returns {Required<SiteConfiguration>} The configuration of this site.
 * @export
 */
export function getSiteConfiguration(): Required<SiteConfiguration> {
  const defaultLocale = config.defaultLocale
    ? config.defaultLocale
    : config.locales && config.locales.length > 0
    ? config.locales[0]
    : defaultSiteConfiguration.defaultLocale;

  return {
    ...defaultSiteConfiguration,
    ...config,
    defaultLocale,
  };
}
