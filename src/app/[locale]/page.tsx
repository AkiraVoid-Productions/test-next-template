import React from 'react';

import LocaleSelector from '@/components/LocaleSelector';
import ThemeSelector from '@/components/ThemeSelector';
import { getTranslatorAsync } from '@/i18n/server';
import PageProps from '@/types/PageProps';

export default async function Home({ params }: PageProps) {
  const { t } = await getTranslatorAsync(params.locale);

  return (
    <div>
      <ThemeSelector
        strings={{
          light: `${t('themeSelector.light')}`,
          dark: `${t('themeSelector.dark')}`,
          browser: `${t('themeSelector.browser')}`,
          highContrast: `${t('themeSelector.highContrast')}`,
          selectTheme: `${t('themeSelector.selectTheme')}`,
        }}
      />
      {/**
       * LocaleSelector hooks to search parameters internally, which means we need to
       * wrap it in Suspense component to make other parts of this page be able to
       * render on server-side.
       */}
      <React.Suspense fallback={null}>
        <LocaleSelector
          strings={{
            en: {
              translation: `${t('localeSelector.language.en_translation')}`,
              english: `${t('localeSelector.language.en_english')}`,
              local: `${t('localeSelector.language.en_local')}`,
            },
            'zh-CN': {
              translation: `${t('localeSelector.language.zh-CN_translation')}`,
              english: `${t('localeSelector.language.zh-CN_english')}`,
              local: `${t('localeSelector.language.zh-CN_local')}`,
            },
            selectLocale: {
              english: `${t('localeSelector.selectLocale_english')}`,
              translation: `${t('localeSelector.selectLocale_translation')}`,
            },
          }}
          isLanguageTranslatedNameHidden
        />
      </React.Suspense>
    </div>
  );
}
