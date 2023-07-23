import React from 'react';

import GenerateMetadata from '@/types/GenerateMetadata';
import LayoutProps from '@/types/LayoutProps';
import { combinePaths, getPageAlternates } from '@/utilities/common';
import { getSiteConfiguration } from '@/utilities/configuration';

import AppProvider from './components/AppProvider';

const config = getSiteConfiguration();

export const generateMetadata: GenerateMetadata<LayoutProps> = ({ params }) => {
  return {
    title: config.title,
    alternates: getPageAlternates(params.locale),
    appleWebApp: {
      title: config.title,
      capable: true,
      statusBarStyle: 'black-translucent',
    },
    applicationName: config.title,
    authors: {
      name: 'AkiraVoid',
      url: 'https://akiravoid.com',
    },
    colorScheme: 'light dark',
    creator: 'AkiraVoid',
    description: config.description,
    generator: 'AkiraVoid web template for Next.js 13 appDir',
    icons: config.iconLight.svg,
    keywords: config.keywords,
    metadataBase: new URL(combinePaths(config.host, params.locale)),
    publisher: 'AkiraVoid Productions',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: config.themeColors[80] },
      { media: '(prefers-color-scheme: dark)', color: config.themeColors[110] },
    ],
  };
};

export function generateStaticParams() {
  return config.locales.map(locale => ({ locale }));
}

export default function Root({ children, params }: LayoutProps) {
  return (
    <html lang={params.locale}>
      <head />
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
