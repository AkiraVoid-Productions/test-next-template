import { Theme } from '@fluentui/react-components';

/** Represents the values of `ThemeProvider` context. */
export type ThemeProviderContextValues = {
  /** The key-value pair of available themes and their key. */
  theme: Record<'light' | 'dark' | 'highContrast', Theme>;
  /** The key of currently applied theme. */
  appliedTheme: 'light' | 'dark' | 'highContrast';
  /**
   * Change theme configuration.
   *
   * @param value The value of theme configuration to be changed to.
   */
  changeTheme: (value: 'light' | 'dark' | 'highContrast' | 'browser') => void;
};
