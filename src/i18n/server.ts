import { createInstance, InitOptions, KeyPrefix, Namespace } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { getSiteConfiguration } from '../utilities/configuration';

const config = getSiteConfiguration();

const initializeI18nextAsync = async (
  lng: string = config.defaultLocale,
  ns: Namespace<string> = 'translation'
) => {
  const i18nConfig: InitOptions = {
    defaultNS: 'translation',
    fallbackNS: 'translation',
    ...config.i18next,
    supportedLngs: config.locales,
    fallbackLng: config.defaultLocale,
    lng,
    ns,
  };

  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(i18nConfig);
  return i18nInstance;
};

/**
 * Enable i18n support for the caller component asynchronously, can only be used
 * in server components.
 *
 * @param {string | string[]} [languages] The language(s) need to be translated
 *   to. Provide an array means target language and all languages to fallback to
 *   in order. Default to `SiteConfiguration.defaultLocale`.
 * @param {Namespace<string> | null} [namespaces] The namespace(s) of
 *   translations used in the component. Provide an array means target namespace
 *   and all namespaces to fallback to in order. Default to
 *   `SiteConfiguration.i18next.defaultNS` or `"translation"`.
 * @param {KeyPrefix<Namespace<string>>} [keyPrefix] The prefix of i18next
 *   resource key.
 * @returns A function used to translate text and an i18next instance related to
 *   this function.
 * @export
 */
export async function useTranslationAsync(
  languages?: string | string[],
  namespaces?: Namespace<string> | null,
  keyPrefix?: KeyPrefix<Namespace<string>>
) {
  const i18nextInstance = await initializeI18nextAsync(
    Array.isArray(languages) ? languages[0] : languages,
    namespaces ?? 'translation'
  );

  return {
    t: i18nextInstance.getFixedT(
      languages ?? config.defaultLocale,
      namespaces,
      keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
