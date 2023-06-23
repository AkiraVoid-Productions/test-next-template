'use client';

import { createContext, useContext } from 'react';

import {
  createHighContrastTheme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';

import { ThemeProviderContextValues } from './ThemeProvider.types';

/**
 * The context of `ThemeProvider`.
 *
 * @access client
 */
export const ThemeProviderContext = createContext<ThemeProviderContextValues>({
  theme: {
    light: webLightTheme,
    dark: webDarkTheme,
    highContrast: createHighContrastTheme(),
  },
  appliedTheme: 'light',
  changeTheme: () => {},
});

/**
 * Hook to `ThemeProvider` and get a function to change theme.
 *
 * @returns A function to change theme.
 */
export function useThemeSwitch() {
  const { changeTheme } = useContext(ThemeProviderContext);

  return changeTheme;
}

/**
 * Hook to `ThemeProvider` and get currently applied theme.
 *
 * @returns Currently applied theme.
 */
export function useAppliedTheme() {
  const { appliedTheme } = useContext(ThemeProviderContext);

  return appliedTheme;
}
