'use client';

import i18next, { InitOptions, KeyPrefix, Namespace } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  initReactI18next,
  useTranslation as useReactTranslation,
  UseTranslationOptions,
} from 'react-i18next';

import LanguageCode from '@/types/LanguageCode';
import { useLocale } from '@/utilities/commonClient';
import { getSiteConfiguration } from '@/utilities/configuration';

const config = getSiteConfiguration();

const i18nConfig: InitOptions = {
  defaultNS: 'translation',
  fallbackNS: 'translation',
  ...config.i18next,
  supportedLngs: config.locales,
  fallbackLng: config.defaultLocale,
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...i18nConfig,
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  });

/**
 * Enable i18n support for the caller component, can only be used in client
 * components.
 *
 * @template TNamespace The type of i18next namespace.
 * @template TKeyPrefix The type of the prefix of i18next resource key.
 * @param {TNamespace | Readonly<TNamespace>} [ns] The namespace(s) of
 *   translations used in the component. Provide an array means target namespace
 *   and all namespaces to fallback to in order. Default to
 *   `SiteConfiguration.i18next.defaultNS` or `"translation"`.
 * @param {UseTranslationOptions<TKeyPrefix>} [options] The options to
 *   initialize the `useTranslation` hook of react-i18next library. Default to
 *   `undefined`.
 * @returns {UseTranslationResponse<TNamespace, TKeyPrefix>} A function used to
 *   translate text, the instance of i18next related to translating function and
 *   a value indicates whether the translating function is ready to use or not.
 * @export
 */
export function useTranslation<
  TNamespace extends Namespace = 'translation',
  TKeyPrefix extends KeyPrefix<TNamespace> = undefined
>(
  ns?: TNamespace | Readonly<TNamespace>,
  options?: UseTranslationOptions<TKeyPrefix>
) {
  const currentLocale = useLocale();
  const translation = useReactTranslation(ns, {
    lng: currentLocale,
    ...options,
  });

  useMemo(() => {
    translation.i18n.resolvedLanguage !== currentLocale &&
      translation.i18n.changeLanguage(currentLocale);
  }, [currentLocale, translation.i18n]);

  return translation;
}

/**
 * Hook to app and get a function used to change locale.
 *
 * @returns A function used to change locale without changing current path and
 *   search parameters.
 */
export function useChangeLocale() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeLocale = useCallback(
    (locale: LanguageCode) => {
      if (locale !== currentLocale) {
        const newPathname = pathname.replace(currentLocale, locale);
        router.push(`${newPathname}?${searchParams.toString()}`);
      }
    },
    [currentLocale, pathname, router, searchParams]
  );

  return changeLocale;
}
