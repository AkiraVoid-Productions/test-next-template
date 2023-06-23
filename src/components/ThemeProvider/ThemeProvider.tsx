'use client';

import React from 'react';

import { useIsBrowserDarkMode } from '@/utilities/commonClient';
import {
  createDarkTheme,
  createHighContrastTheme,
  createLightTheme,
  FluentProvider,
} from '@fluentui/react-components';

import { useSiteConfiguration } from '../SiteConfigurationProvider';
import { useUserConfiguration } from '../UserConfigurationProvider';
import { ThemeProviderContext } from './ThemeProvider.context';

/**
 * Provides the functionalities to detect user's browser theme, change theme
 * configuration and get currently applied theme.
 */
export default function ThemeProvider({ children }: React.PropsWithChildren) {
  const { themeColors } = useSiteConfiguration();
  const { userConfiguration, setUserConfiguration } = useUserConfiguration();
  const isBrowserDarkMode = useIsBrowserDarkMode();

  const theme = React.useMemo(
    () => ({
      light: createLightTheme(themeColors),
      dark: createDarkTheme(themeColors),
      highContrast: createHighContrastTheme(),
    }),
    [themeColors]
  );

  const appliedTheme = React.useMemo(() => {
    const themeConfiguration = userConfiguration.theme;
    if (themeConfiguration === 'browser') {
      return isBrowserDarkMode ? 'dark' : 'light';
    }

    return themeConfiguration;
  }, [isBrowserDarkMode, userConfiguration.theme]);

  const changeTheme = React.useCallback(
    (name: 'light' | 'dark' | 'highContrast' | 'browser') => {
      setUserConfiguration('theme', name);
    },
    [setUserConfiguration]
  );

  return (
    <ThemeProviderContext.Provider value={{ theme, appliedTheme, changeTheme }}>
      <FluentProvider theme={theme[appliedTheme]}>{children}</FluentProvider>
    </ThemeProviderContext.Provider>
  );
}
