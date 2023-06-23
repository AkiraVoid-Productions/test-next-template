import { MetadataRoute } from 'next';

import { combinePaths } from '@/utilities/common';
import { getSiteConfiguration } from '@/utilities/configuration';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfiguration();

  return config.locales.map(locale => ({
    url: combinePaths(config.host, locale, '/'),
    lastModified: new Date(),
  }));
}
