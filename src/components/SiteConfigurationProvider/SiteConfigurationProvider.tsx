import React from 'react';

import { getSiteConfiguration } from '@/utilities/configuration';

import { SiteConfigurationProviderContext } from './SiteConfigurationProvider.context';

export function SiteConfigurationProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <SiteConfigurationProviderContext.Provider value={getSiteConfiguration()}>
      {children}
    </SiteConfigurationProviderContext.Provider>
  );
}
