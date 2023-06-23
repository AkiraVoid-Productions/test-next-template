'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

import SiteConfigurationProvider from '@/components/SiteConfigurationProvider';
import StorageProvider from '@/components/StorageProvider';
import ThemeProvider from '@/components/ThemeProvider';
import UserConfigurationProvider from '@/components/UserConfigurationProvider';
import {
  createDOMRenderer,
  RendererProvider,
  renderToStyleElements,
  SSRProvider,
} from '@fluentui/react-components';

/**
 * Provides essential functionalities to the whole app. All UI elements and
 * other providers should be nested in this component.
 */
export default function AppProvider({ children }: React.PropsWithChildren) {
  const [renderer] = React.useState(() => createDOMRenderer());

  useServerInsertedHTML(() => {
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <SiteConfigurationProvider>
      <RendererProvider renderer={renderer}>
        <SSRProvider>
          <StorageProvider>
            <UserConfigurationProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </UserConfigurationProvider>
          </StorageProvider>
        </SSRProvider>
      </RendererProvider>
    </SiteConfigurationProvider>
  );
}
