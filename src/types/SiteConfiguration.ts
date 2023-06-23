import { InitOptions } from 'i18next';

import { BrandVariants } from '@fluentui/react-components';

import { CustomizedIconSet } from './IconSet';
import LanguageCode from './LanguageCode';

/** Represents the configuration of this site. */
type SiteConfiguration = {
  /**
   * The default title of this site. Can be override by page.
   *
   * @default 'Website'
   */
  title?: string;
  /**
   * The default description of this site. Can be override by page.
   *
   * @default 'A website powered by AkiraVoid Next.js 13 appDir web template.'
   */
  description?: string;
  // prettier-ignore
  /**
   * The default keywords of this site. Can be override by page.
   *
   * @default "website", "Next.js", "appDir", "AkiraVoid", "react", "server-component"
   */
  keywords?: string[];
  /**
   * The title delimiter of this site, used to delimit page title and site
   * title.
   *
   * @default ' • '
   */
  titleDelimiter?: string;
  /**
   * The host of this site, should always be started with `https://`.
   *
   * @default 'https://localhost:3000'
   */
  host?: string;
  /**
   * The site's icons used in dark mode.
   *
   * @default { }
   */
  iconDark?: CustomizedIconSet;
  /**
   * The site's icons used in light mode.
   *
   * @default { }
   */
  iconLight?: CustomizedIconSet;
  /**
   * The supported locales of this site.
   *
   * @default ['en']
   */
  locales?: LanguageCode[];
  /**
   * The default locale of this site, will be used if user has a language
   * setting that is not supported by the site.
   *
   * @default locales[0]
   */
  defaultLocale?: LanguageCode;
  /**
   * The brand theme colors of this site.
   *
   * @default { 10: '#020305',
   *   20: '#111723',
   *   30: '#16263D',
   *   40: '#193253',
   *   50: '#1B3F6A',
   *   60: '#1B4C82',
   *   70: '#18599B',
   *   80: '#1267B4',
   *   90: '#3174C2',
   *   100: '#4F82C8',
   *   110: '#6790CF',
   *   120: '#7D9ED5',
   *   130: '#92ACDC',
   *   140: '#A6BAE2',
   *   150: '#BAC9E9',
   *   160: '#CDD8EF',
   * }
   */
  themeColors?: BrandVariants;
  /**
   * The i18next options.
   *
   * `supportedLngs` will be replaced by `locales`, `fallbackLng` will be
   * replaced by `defaultLocale`, `lng` and `ns` will be replaced by the given
   * parameters when calling `useTranslationAsync`.
   *
   * @default { }
   */
  i18next?: InitOptions;
};

export default SiteConfiguration;
