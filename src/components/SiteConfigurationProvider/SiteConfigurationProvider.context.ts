'use client';

import { createContext, useContext } from 'react';

import { defaultSiteConfiguration } from '@/utilities/configuration';

/**
 * The context of `SiteConfigurationProvider`.
 *
 * @access client
 */
export const SiteConfigurationProviderContext = createContext(
  defaultSiteConfiguration
);

/**
 * Hook to `SiteConfigurationProvider` and read the site configuration.
 *
 * @returns The site configuration.
 * @access client
 */
export function useSiteConfiguration() {
  const configuration = useContext(SiteConfigurationProviderContext);

  return configuration;
}
